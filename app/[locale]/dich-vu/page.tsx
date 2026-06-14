import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dịch Vụ" };

const defaultServices = [
  {
    slug: "sua-chua-bao-tri",
    title: "Nâng Cấp & Sửa Chữa Công Trình", titleEn: "Maintenance & Repairs",
    icon: "🔧",
    pricing: null,
    excerpt: "Bảo trì, sửa chữa công trình công nghiệp và dân dụng theo quy trình 8 bước chuyên nghiệp. Kinh nghiệm xử lý thấm dột, rò rỉ và hư hỏng kết cấu.",
    excerptEn: "Professional 8-step industrial and civil building maintenance. Experts in water leaks, structural repairs, and system upgrades.",
  },
  {
    slug: "xay-dung-biet-thu-mini-nha-cap-4-tron-goi",
    title: "Xây Dựng Nhà Phố & Biệt Thự Trọn Gói", titleEn: "Townhouse & Villa Construction",
    icon: "🏠",
    pricing: "Từ 6.000.000 đ/m²",
    excerpt: "Xây dựng trọn gói từ móng đến hoàn thiện. Bảo hành kết cấu 12 tháng, hệ thống điện nước 5 năm. Diện tích càng lớn, chi phí càng tối ưu.",
    excerptEn: "Complete build from foundation to finishing. 12-month structural warranty, 5-year electrical/plumbing. Larger area = lower cost per m².",
  },
  {
    slug: "xay-dung-co-so-ha-tang-ky-thuat",
    title: "Cơ Sở Hạ Tầng Kỹ Thuật", titleEn: "Technical Infrastructure",
    icon: "⚙️",
    pricing: null,
    excerpt: "Thi công hệ thống cấp thoát nước, xử lý nước thải, bể chứa công nghiệp, hầm bê tông, mương thoát nước cho nhà máy và khu công nghiệp.",
    excerptEn: "Water supply, drainage, wastewater treatment, industrial tanks, concrete pits, and drainage channels for factories and industrial zones.",
  },
  {
    slug: "xay-dung-nha-xuong",
    title: "Thiết Kế & Thi Công Nhà Xưởng", titleEn: "Factory & Industrial Construction",
    icon: "🏭",
    pricing: null,
    excerpt: "Thiết kế và thi công nhà xưởng, nhà thép tiền chế, kho công nghiệp và hạ tầng phụ trợ tại các khu công nghiệp Bà Rịa - Vũng Tàu.",
    excerptEn: "Design and build factories, prefabricated steel structures, industrial warehouses, and support infrastructure in Ba Ria - Vung Tau industrial zones.",
  },
];

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = useLocale();
  const services = getServices();
  const items = services.length > 0
    ? services.map((s) => ({ ...s.frontmatter, slug: s.slug, icon: s.frontmatter.icon }))
    : defaultServices.map((s) => ({ ...s, icon: undefined, category: "industrial" as const }));

  return (
    <>
      <section className="pt-32 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">{t("subtitle")}</h1>
            <p className="text-gray-500">{t("title")}</p>
            <div className="w-12 h-1 bg-orange-500 mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultServices.map((svc) => (
              <div key={svc.slug} className="group flex flex-col bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all overflow-hidden">
                <div className="flex items-start gap-4 p-6 pb-4">
                  <div className="text-4xl shrink-0">{svc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors leading-snug">
                        {locale === "en" ? svc.titleEn : svc.title}
                      </h2>
                      {svc.pricing && (
                        <span className="shrink-0 text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded whitespace-nowrap">
                          {svc.pricing}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {locale === "en" ? svc.excerptEn : svc.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-5 mt-auto">
                  <Link
                    href={`/dich-vu/${svc.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    {t("learnMore")} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            {locale === "vi" ? "Cần tư vấn dịch vụ?" : "Need service consultation?"}
          </h2>
          <p className="text-gray-500 mb-6">
            {locale === "vi" ? "Liên hệ ngay để nhận báo giá miễn phí" : "Contact us now for a free quote"}
          </p>
          <Link
            href="/lien-he"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            {t("requestQuote")}
          </Link>
        </div>
      </section>
    </>
  );
}
