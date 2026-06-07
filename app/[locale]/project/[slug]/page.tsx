import { notFound } from "next/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getProject, getProjects } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/components/ui/ProjectCard";
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
  return { title: project.frontmatter.title };
}

const categoryLabels: Record<string, { vi: string; en: string }> = {
  industrial: { vi: "Công Nghiệp", en: "Industrial" },
  residential: { vi: "Dân Dụng", en: "Residential" },
  infrastructure: { vi: "Hạ Tầng", en: "Infrastructure" },
  maintenance: { vi: "Bảo Trì", en: "Maintenance" },
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { frontmatter, content } = project;
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
            alt={frontmatter.title}
            fill
            className="object-cover opacity-50"
            unoptimized
          />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded mb-3 inline-block">
              {categoryLabels[frontmatter.category]?.vi ?? frontmatter.category}
            </span>
            <h1 className="text-3xl lg:text-4xl font-black text-white">{frontmatter.title}</h1>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2">
              {/* Photo gallery */}
              {frontmatter.images?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                  {frontmatter.images.map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={src}
                        alt={`${frontmatter.title} ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Thông Tin Dự Án</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs text-gray-400 uppercase tracking-wider">Chủ Đầu Tư</dt>
                    <dd className="font-semibold text-gray-800 mt-1">{frontmatter.client}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 uppercase tracking-wider">Năm Hoàn Thành</dt>
                    <dd className="font-semibold text-gray-800 mt-1">{frontmatter.year}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 uppercase tracking-wider">Địa Điểm</dt>
                    <dd className="font-semibold text-gray-800 mt-1">{frontmatter.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400 uppercase tracking-wider">Hạng Mục</dt>
                    <dd className="mt-1">
                      <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
                        {categoryLabels[frontmatter.category]?.vi ?? frontmatter.category}
                      </span>
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href="/lien-he"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-3 rounded-lg transition-colors"
                  >
                    Liên Hệ Tư Vấn
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
            <h2 className="text-2xl font-black text-gray-900 mb-8">Dự Án Liên Quan</h2>
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
