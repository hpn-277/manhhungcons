import { useTranslations } from "next-intl";

const testimonials = [
  {
    quote:
      "Mạnh Hùng rất chuyên nghiệp, tiến độ đúng hẹn và chất lượng công trình rất tốt. Chúng tôi rất hài lòng với dịch vụ này.",
    quoteEn:
      "Manh Hung is very professional, on schedule and the quality of the work is excellent. We are very satisfied.",
    name: "Nguyễn Văn A",
    role: "Giám đốc dự án / Project Manager",
  },
  {
    quote:
      "Thiết kế sáng tạo và thi công cẩn thận. Nhà xưởng hoàn thành đúng yêu cầu kỹ thuật và thẩm mỹ.",
    quoteEn:
      "Creative design and careful construction. The factory was completed to exact technical and aesthetic requirements.",
    name: "Trần Thị B",
    role: "Chủ đầu tư / Investor",
  },
  {
    quote:
      "Đội ngũ nhiệt tình, tư vấn chu đáo. Công trình hoàn thành đúng tiến độ với chi phí hợp lý.",
    quoteEn:
      "Enthusiastic team, thorough consultation. Project completed on schedule with reasonable costs.",
    name: "Lê Văn C",
    role: "Giám đốc nhà máy / Factory Director",
  },
  {
    quote:
      "Hệ thống xử lý nước thải hoạt động ổn định, đúng tiêu chuẩn môi trường. Rất tin tưởng vào tay nghề của Mạnh Hùng.",
    quoteEn:
      "The wastewater treatment system operates stably, meeting environmental standards. Very confident in Manh Hung's craftsmanship.",
    name: "Phạm Thị D",
    role: "Quản lý môi trường / Environmental Manager",
  },
];

export default function Testimonials() {
  const t = useTranslations("home");

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
              <p className="text-gray-700 leading-relaxed mb-4">{item.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                  {item.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  <div className="text-gray-400 text-xs">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
