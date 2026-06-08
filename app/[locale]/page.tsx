import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroCarousel from "@/components/sections/HeroCarousel";
import StatCounter from "@/components/sections/StatCounter";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import Clients from "@/components/sections/Clients";
import ProjectCard from "@/components/ui/ProjectCard";
import ServiceCard from "@/components/ui/ServiceCard";
import { getProjects, getServices } from "@/lib/content";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const allProjects = getProjects();
  const featuredProjects = allProjects.slice(0, 6);
  const services = getServices();

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
          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCard key={s.slug} slug={s.slug} frontmatter={s.frontmatter} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { slug: "sua-chua-bao-tri", title: "Sửa Chữa & Bảo Trì", titleEn: "Maintenance & Repairs", icon: "wrench", excerpt: "Sửa chữa và bảo trì công trình công nghiệp và dân dụng", excerptEn: "Maintenance and repair of industrial and civil structures", category: "maintenance" },
                { slug: "xay-dung-biet-thu-mini-nha-cap-4-tron-goi", title: "Biệt Thự & Nhà Ở Trọn Gói", titleEn: "Residential Construction", icon: "home", excerpt: "Xây dựng biệt thự mini, nhà cấp 4 trọn gói", excerptEn: "Complete villa and house construction packages", category: "residential" },
                { slug: "xay-dung-co-so-ha-tang-ky-thuat", title: "Cơ Sở Hạ Tầng Kỹ Thuật", titleEn: "Technical Infrastructure", icon: "infrastructure", excerpt: "Xây dựng hệ thống cấp thoát nước, xử lý nước thải", excerptEn: "Water supply, drainage and waste treatment systems", category: "infrastructure" },
                { slug: "xay-dung-nha-tho", title: "Xây Dựng Nhà Thô", titleEn: "Shell Construction", icon: "building", excerpt: "Thi công phần thô nhà ở dân dụng", excerptEn: "Structural shell construction for residential buildings", category: "residential" },
                { slug: "xay-dung-nha-xuong", title: "Xây Dựng Nhà Xưởng", titleEn: "Factory Construction", icon: "factory", excerpt: "Thiết kế thi công nhà xưởng, nhà công nghiệp", excerptEn: "Design and construction of factories and industrial buildings", category: "industrial" },
              ].map((s) => (
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
          )}
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
              {locale === "vi" ? "Xem tất cả →" : "View all →"}
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
