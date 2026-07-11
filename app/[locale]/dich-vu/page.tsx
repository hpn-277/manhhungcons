import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { services as defaultServices } from "@/lib/services";
import { localizedMetadata } from "@/lib/site";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return localizedMetadata(locale, "/dich-vu", {
    title: isEn ? "Services" : "Dịch Vụ",
    description: isEn
      ? "Factory construction, residential building, technical infrastructure, and maintenance/repair services in Ba Ria - Vung Tau."
      : "Dịch vụ thi công, xây dựng nhà ở, nhà xưởng công nghiệp, hạ tầng kỹ thuật, sửa chữa bảo trì công trình tại Bà Rịa - Vũng Tàu.",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");

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
                    className="inline-flex items-center gap-1 text-sm font-semibold text-orange-700 hover:text-orange-800 transition-colors"
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
            className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            {t("requestQuote")}
          </Link>
        </div>
      </section>
    </>
  );
}
