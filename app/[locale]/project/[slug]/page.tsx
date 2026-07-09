import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProject, getProjects } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  const locales = ["vi", "en"];
  return projects.flatMap((p) =>
    locales.map((locale) => ({ slug: p.slug, locale }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const { title, location, excerpt } = project.frontmatter;
  const description = `${title} tại ${location}. ${excerpt}`.slice(0, 160);
  return { title, description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const isEn = locale === "en";

  const { frontmatter, content } = project;
  const title = isEn ? frontmatter.titleEn || frontmatter.title : frontmatter.title;
  const excerpt = isEn ? frontmatter.excerptEn || frontmatter.excerpt : frontmatter.excerpt;
  const categoryLabel = t(frontmatter.category);
  const allProjects = getProjects();
  const related = allProjects
    .filter((p) => p.slug !== slug && p.frontmatter.category === frontmatter.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative h-96 bg-[#0d1b2a]">
        {frontmatter.images?.[0] && (
          <Image
            src={frontmatter.images[0]}
            alt={title}
            fill
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded mb-3 inline-block">
              {categoryLabel}
            </span>
            <h1 className="text-3xl lg:text-4xl font-black text-white">{title}</h1>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2">
              <ProjectCarousel images={frontmatter.images ?? []} title={title} />

              {excerpt && (
                <blockquote className="border-l-4 border-orange-500 bg-orange-50 rounded-r-xl px-5 py-4 mb-8 text-gray-700 italic leading-relaxed">
                  {excerpt}
                </blockquote>
              )}

              <div className="mb-3 flex items-center gap-3">
                <h2 className="text-xl font-black text-gray-900">{t("descriptionTitle")}</h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <p className="text-gray-600 leading-8 whitespace-pre-line">{content}</p>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                <div className="bg-[#0d1b2a] px-6 py-4">
                  <h3 className="font-bold text-white text-lg">{t("infoTitle")}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="flex items-start gap-4 px-6 py-4">
                    <span className="text-orange-500 text-xl mt-0.5">👤</span>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("client")}</p>
                      <p className="font-semibold text-gray-800">{frontmatter.client}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 px-6 py-4">
                    <span className="text-orange-500 text-xl mt-0.5">📅</span>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("year")}</p>
                      <p className="font-semibold text-gray-800">{frontmatter.year}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 px-6 py-4">
                    <span className="text-orange-500 text-xl mt-0.5">📍</span>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("location")}</p>
                      <p className="font-semibold text-gray-800">{frontmatter.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 px-6 py-4">
                    <span className="text-orange-500 text-xl mt-0.5">🏗️</span>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("category")}</p>
                      <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-5 bg-gray-50">
                  <Link
                    href="/lien-he"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-3 rounded-lg transition-colors"
                  >
                    {t("contactCta")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-900 mb-8">{t("relatedProjects")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProjectCard key={p.slug} slug={p.slug} frontmatter={p.frontmatter} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
