import { useTranslations, useLocale } from "next-intl";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "Tôi rất hài lòng về thi công và bàn giao đúng tiến độ của công ty. Đội ngũ xây dựng nhà xưởng chuyên nghiệp, có tay nghề cao.",
    quoteEn:
      "I am very satisfied with the construction and on-time handover. The factory construction team is professional and highly skilled.",
    name: "Anh Vận",
    role: "Sử dụng gói dịch vụ Xây dựng nhà xưởng",
    stars: 5,
  },
  {
    quote:
      "Có chuyên môn trong việc xây dựng Hệ thống xử lý chất thải. Bàn giao đúng thời hạn, giá cả thi công hợp lý.",
    quoteEn:
      "Expertise in waste treatment system construction. Delivered on time with reasonable pricing.",
    name: "Anh Quốc",
    role: "Sử dụng gói dịch vụ Xây dựng Hệ thống xử lý chất thải",
    stars: 5,
  },
  {
    quote:
      "Công ty Mạnh Hùng tuy không phải là một công ty lớn, nhưng phong cách làm việc rất chuyên nghiệp; an toàn, đúng tiến độ và đảm bảo chất lượng trong việc thi công sửa chữa nhà xưởng.",
    quoteEn:
      "Manh Hung may not be a large company, but their working style is very professional — safe, on schedule and quality-assured in factory repair and maintenance.",
    name: "Anh Thành",
    role: "Sử dụng gói dịch vụ Sửa chữa nhà xưởng",
    stars: 5,
  },
  {
    quote:
      "Thái độ phục vụ của công ty rất tốt. Thiết kế đẹp và phối cảnh nhà phố chân thực. Quá trình xây dựng chuyên nghiệp, đúng tiến độ.",
    quoteEn:
      "The company's service attitude is excellent. Beautiful design with realistic townhouse renderings. Professional construction process, on schedule.",
    name: "Chị Hiền",
    role: "Sử dụng gói dịch vụ Xây dựng nhà phố",
    stars: 5,
  },
];

export default function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
            {t("testimonialsTitle")}
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors"
            >
              <div className="text-orange-500 text-3xl mb-3">"</div>
              <p className="text-gray-700 leading-relaxed mb-5 italic">
                {locale === "en" ? item.quoteEn : item.quote}
              </p>
              <div>
                <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                <div className="text-gray-500 text-xs mt-0.5">{item.role}</div>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <FaStar
                      key={s}
                      size={14}
                      className={s < item.stars ? "text-yellow-400" : "text-gray-200"}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
