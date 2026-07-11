import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeroCarousel from "@/components/sections/HeroCarousel";
import StatCounter from "@/components/sections/StatCounter";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import Clients from "@/components/sections/Clients";
import ProjectCard from "@/components/ui/ProjectCard";
import ServiceCard from "@/components/ui/ServiceCard";
import { getProjects } from "@/lib/content";
import { services } from "@/lib/services";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/site";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    ...localizedMetadata(locale, "", {
      title: isEn
        ? "Factory & Residential Construction in Ba Ria - Vung Tau"
        : "Xây Dựng Nhà Xưởng, Nhà Ở Trọn Gói Tại Bà Rịa - Vũng Tàu",
      description: isEn
        ? "Manh Hung Construction Co., Ltd. - Design and build factories, prefabricated steel structures, homes, and villas in Ba Ria - Vung Tau. 15+ years of experience."
        : "Công Ty TNHH Xây Dựng Mạnh Hùng - Thi công, thiết kế nhà xưởng công nghiệp, nhà thép tiền chế, nhà ở, biệt thự trọn gói tại Bà Rịa - Vũng Tàu. Hơn 15 năm kinh nghiệm.",
    }),
    title: {
      absolute: isEn
        ? "Factory & Residential Construction in Ba Ria - Vung Tau | Manh Hung Construction"
        : "Xây Dựng Nhà Xưởng, Nhà Ở Trọn Gói Tại Bà Rịa - Vũng Tàu | Xây Dựng Mạnh Hùng",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const allProjects = getProjects();
  const featuredProjects = allProjects.slice(0, 6);

  return (
    <>
      <HeroCarousel />
      <StatCounter />

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
              {t("servicesTitle")}
            </h2>
            <p className="text-gray-500">{t("servicesSubtitle")}</p>
            <div className="w-12 h-1 bg-orange-500 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                frontmatter={{
                  title: s.title,
                  titleEn: s.titleEn,
                  icon: s.icon,
                  excerpt: s.excerpt,
                  excerptEn: s.excerptEn,
                  category: s.category,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                {t("projectsTitle")}
              </h2>
              <p className="text-gray-500">{t("projectsSubtitle")}</p>
              <div className="w-12 h-1 bg-orange-500 mt-4" />
            </div>
            <Link
              href="/danh-sach-du-an"
              className="text-orange-500 hover:text-orange-600 font-semibold text-sm whitespace-nowrap"
            >
              {t("viewAll")}
            </Link>
          </div>
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((p) => (
                <ProjectCard key={p.slug} slug={p.slug} frontmatter={p.frontmatter} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">Projects loading...</p>
            </div>
          )}
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <Clients />

      {/* CTA Banner */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
            {t("ctaBanner")}
          </h2>
          <p className="text-orange-100 mb-8 text-lg">{t("ctaDesc")}</p>
          <Link
            href="/lien-he"
            className="inline-block bg-white text-orange-500 hover:bg-orange-50 font-bold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
