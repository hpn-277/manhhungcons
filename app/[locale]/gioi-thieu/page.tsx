import { useTranslations } from "next-intl";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu",
};

const timeline = [
  { year: "2009", event: "Thành lập Công Ty TNHH Xây Dựng Mạnh Hùng tại Bà Rịa - Vũng Tàu", eventEn: "Founded Manh Hung Construction Co., Ltd. in Ba Ria - Vung Tau" },
  { year: "2012", event: "Mở rộng sang lĩnh vực xây dựng nhà xưởng công nghiệp", eventEn: "Expanded into industrial factory construction" },
  { year: "2015", event: "Hoàn thành hơn 50 dự án lớn nhỏ trong tỉnh", eventEn: "Completed over 50 projects across the province" },
  { year: "2018", event: "Đầu tư máy móc thiết bị hiện đại, nâng cao năng lực thi công", eventEn: "Invested in modern equipment to enhance construction capacity" },
  { year: "2023", event: "Tiếp tục phát triển với đội ngũ kỹ sư và công nhân lành nghề", eventEn: "Continued growth with a team of skilled engineers and workers" },
];

const workflow = [
  { step: "01", title: "Tư vấn thiết kế", titleEn: "Design Consultation", desc: "Lắng nghe yêu cầu và đề xuất giải pháp phù hợp", descEn: "Listen to requirements and propose suitable solutions" },
  { step: "02", title: "Lập dự toán", titleEn: "Cost Estimation", desc: "Báo giá chi tiết, minh bạch và cạnh tranh", descEn: "Detailed, transparent and competitive quotation" },
  { step: "03", title: "Ký hợp đồng", titleEn: "Contract Signing", desc: "Ký kết hợp đồng rõ ràng, bảo vệ quyền lợi đôi bên", descEn: "Clear contract protecting both parties' interests" },
  { step: "04", title: "Thi công", titleEn: "Construction", desc: "Triển khai thi công theo đúng thiết kế và tiến độ", descEn: "Execute construction according to design and schedule" },
  { step: "05", title: "Nghiệm thu", titleEn: "Inspection & Handover", desc: "Kiểm tra chất lượng và bàn giao công trình", descEn: "Quality check and project handover" },
  { step: "06", title: "Bảo hành", titleEn: "Warranty", desc: "Hỗ trợ bảo hành và bảo trì sau khi bàn giao", descEn: "Post-handover warranty and maintenance support" },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* Hero */}
      <div className="bg-[#0d1b2a] pt-32 pb-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{t("title")}</h1>
          <p className="text-gray-300 text-lg">{t("subtitle")}</p>
        </div>
      </div>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: t("missionTitle"), desc: "Đóng góp vào sự phát triển đất nước thông qua sự nghiệp xây dựng, thực hiện công nghiệp hóa và hiện đại hóa." },
              { icon: "👁️", title: t("visionTitle"), desc: "Trở thành doanh nghiệp Việt Nam hàng đầu trong lĩnh vực xây dựng và phát triển cơ sở hạ tầng." },
              { icon: "💎", title: t("valuesTitle"), desc: "Tri thức - Sáng tạo - Tận tâm. Ba giá trị cốt lõi định hướng mọi hoạt động của chúng tôi." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">{t("historyTitle")}</h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mb-12" />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-orange-200" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 z-10">
                    {item.year}
                  </div>
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">{t("workflowTitle")}</h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((step) => (
              <div key={step.step} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl font-black text-orange-200 shrink-0 leading-none">{step.step}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
