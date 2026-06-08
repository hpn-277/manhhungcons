import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const locales = ["vi", "en"];
  return posts.flatMap((p) => locales.map((locale) => ({ slug: p.slug, locale })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.frontmatter.title };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
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
        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">{frontmatter.title}</h1>
        <p className="text-gray-400 text-sm">{frontmatter.date}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2 prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
          </article>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Bài Viết Gần Đây</h3>
              <ul className="space-y-4">
                {recent.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-sm text-gray-700 hover:text-orange-500 transition-colors leading-snug block"
                    >
                      {p.frontmatter.title}
                    </Link>
                    <span className="text-xs text-gray-400">{p.frontmatter.date}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Cần tư vấn?</h4>
                <Link
                  href="/lien-he"
                  className="block text-center bg-orange-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Liên Hệ Ngay
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
