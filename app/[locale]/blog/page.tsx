import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tin Tức" };

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const posts = getBlogPosts();

  return (
    <>
      <section className="pt-32 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">{t("title")}</h1>
            <p className="text-gray-500">{t("subtitle")}</p>
            <div className="w-12 h-1 bg-orange-500 mt-3" />
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const title = locale === "en" ? post.frontmatter.titleEn || post.frontmatter.title : post.frontmatter.title;
                const excerpt = locale === "en" ? post.frontmatter.excerptEn || post.frontmatter.excerpt : post.frontmatter.excerpt;
                return (
                  <article key={post.slug} className="group">
                    <div className="bg-gray-100 aspect-[16/9] rounded-xl mb-4 overflow-hidden">
                      {post.frontmatter.image && (
                        <img src={post.frontmatter.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs text-gray-400">{post.frontmatter.date}</span>
                    </div>
                    <h2 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-3">{excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      {t("readMore")} →
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl">Chưa có bài viết</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
