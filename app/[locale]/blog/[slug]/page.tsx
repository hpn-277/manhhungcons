import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import { localizedMetadata } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const locales = ["vi", "en"];
  return posts.flatMap((p) => locales.map((locale) => ({ slug: p.slug, locale })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const isEn = locale === "en";
  const { title, titleEn, excerpt, excerptEn } = post.frontmatter;
  const resolvedTitle = isEn ? titleEn || title : title;
  const description = (isEn ? excerptEn || excerpt : excerpt)?.slice(0, 160);
  return localizedMetadata(locale, `/blog/${slug}`, {
    title: resolvedTitle,
    description,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const isEn = locale === "en";

  const { frontmatter, content } = post;
  const title = isEn ? frontmatter.titleEn || frontmatter.title : frontmatter.title;
  const htmlContent = await marked(content);
  const allPosts = getBlogPosts();
  const recent = allPosts.filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-8 border-b border-gray-100">
        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags?.map((tag) => (
            <span key={tag} className="text-xs bg-orange-100 text-orange-700 border border-orange-200 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-400 text-sm">{frontmatter.date}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2 blog-content max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </article>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">{t("recentPosts")}</h3>
              <ul className="space-y-4">
                {recent.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-sm text-gray-700 hover:text-orange-500 transition-colors leading-snug block"
                    >
                      {isEn ? p.frontmatter.titleEn || p.frontmatter.title : p.frontmatter.title}
                    </Link>
                    <span className="text-xs text-gray-400">{p.frontmatter.date}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">{t("consultTitle")}</h4>
                <Link
                  href="/lien-he"
                  className="block text-center bg-orange-700 text-white text-sm font-semibold py-2 rounded-lg hover:bg-orange-800 transition-colors"
                >
                  {t("contactButton")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
