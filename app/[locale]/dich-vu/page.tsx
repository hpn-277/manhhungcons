import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dịch Vụ" };

const defaultServices = [
  { slug: "sua-chua-bao-tri", title: "Sửa Chữa & Bảo Trì", titleEn: "Maintenance & Repairs", icon: "🔧", excerpt: "Sửa chữa, bảo trì công trình công nghiệp và dân dụng theo quy trình 8 bước chuyên nghiệp.", excerptEn: "Professional 8-step maintenance and repair of industrial and civil structures." },
  { slug: "xay-dung-biet-thu-mini-nha-cap-4-tron-goi", title: "Biệt Thự & Nhà Ở Trọn Gói", titleEn: "Residential Construction", icon: "🏠", excerpt: "Xây dựng biệt thự mini, nhà cấp 4 trọn gói từ 4-5 triệu/m². Bảo hành 12 tháng.", excerptEn: "Complete villa and house construction packages from 4-5M VND/m². 12-month warranty." },
  { slug: "xay-dung-co-so-ha-tang-ky-thuat", title: "Cơ Sở Hạ Tầng Kỹ Thuật", titleEn: "Technical Infrastructure", icon: "⚙️", excerpt: "Xây dựng hệ thống cấp thoát nước, xử lý nước thải, bể chứa công nghiệp.", excerptEn: "Water supply, drainage, wastewater treatment and industrial tank systems." },
  { slug: "xay-dung-nha-tho", title: "Xây Dựng Nhà Thô", titleEn: "Shell Construction", icon: "🏗️", excerpt: "Thi công phần thô nhà ở dân dụng từ 3.5 triệu/m². Đảm bảo chất lượng kết cấu.", excerptEn: "Residential shell construction from 3.5M VND/m². Quality structural work." },
  { slug: "xay-dung-nha-xuong", title: "Xây Dựng Nhà Xưởng", titleEn: "Factory Construction", icon: "🏭", excerpt: "Thiết kế, thi công nhà xưởng công nghiệp, nhà thép tiền chế toàn diện.", excerptEn: "Design and build industrial factories and prefabricated steel structures." },
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
      <div className="bg-[#0d1b2a] pt-32 pb-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{t("subtitle")}</h1>
          <p className="text-gray-300 text-lg">{t("title")}</p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {defaultServices.map((svc) => (
              <div key={svc.slug} className="group flex gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="text-4xl shrink-0">{svc.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {locale === "en" ? svc.titleEn : svc.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {locale === "en" ? svc.excerptEn : svc.excerpt}
                  </p>
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
