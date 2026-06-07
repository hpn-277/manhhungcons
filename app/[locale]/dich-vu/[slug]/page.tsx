import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getService, getServices, getProjects } from "@/lib/content";
import ProjectCard from "@/components/ui/ProjectCard";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getServices();
  const locales = ["vi", "en"];
  const slugs = ["sua-chua-bao-tri", "xay-dung-biet-thu-mini-nha-cap-4-tron-goi", "xay-dung-co-so-ha-tang-ky-thuat", "xay-dung-nha-tho", "xay-dung-nha-xuong"];
  const allSlugs = services.length > 0 ? services.map((s) => s.slug) : slugs;
  return allSlugs.flatMap((slug) => locales.map((locale) => ({ slug, locale })));
}

const serviceData: Record<string, { title: string; titleEn: string; icon: string; content: string; contentEn: string; category: string }> = {
  "sua-chua-bao-tri": {
    title: "Sửa Chữa & Bảo Trì", titleEn: "Maintenance & Repairs", icon: "🔧", category: "maintenance",
    content: "Dịch vụ sửa chữa và bảo trì công trình công nghiệp và dân dụng theo quy trình 8 bước chuyên nghiệp. Chúng tôi có kinh nghiệm xử lý các sự cố thấm nước, nứt kết cấu, và nâng cấp hệ thống điện nước.",
    contentEn: "Professional 8-step maintenance and repair of industrial and civil structures. We have experience handling water leaks, structural cracks, and electrical/plumbing upgrades.",
  },
  "xay-dung-biet-thu-mini-nha-cap-4-tron-goi": {
    title: "Biệt Thự & Nhà Ở Trọn Gói", titleEn: "Residential Construction", icon: "🏠", category: "residential",
    content: "Xây dựng biệt thự mini, nhà cấp 4 trọn gói từ 4-5 triệu/m². Bao gồm nền móng, hệ thống điện, hệ thống nước, và hoàn thiện. Bảo hành công trình 12 tháng, hệ thống điện nước 5 năm.",
    contentEn: "Complete villa and house construction from 4-5M VND/m². Includes foundation, electrical, plumbing, and finishing. 12-month general warranty, 5-year electrical/plumbing warranty.",
  },
  "xay-dung-co-so-ha-tang-ky-thuat": {
    title: "Cơ Sở Hạ Tầng Kỹ Thuật", titleEn: "Technical Infrastructure", icon: "⚙️", category: "infrastructure",
    content: "Xây dựng hệ thống cấp thoát nước, hệ thống xử lý nước thải, bể chứa nước, hồ bơi, mương công nghiệp. Đáp ứng tiêu chuẩn môi trường và kỹ thuật hiện hành.",
    contentEn: "Construction of water supply/drainage systems, wastewater treatment, storage tanks, swimming pools, and industrial channels. Meeting current environmental and technical standards.",
  },
  "xay-dung-nha-tho": {
    title: "Xây Dựng Nhà Thô", titleEn: "Shell Construction", icon: "🏗️", category: "residential",
    content: "Thi công phần thô nhà ở dân dụng từ 3.5 triệu/m². Bao gồm nền móng, kết cấu bê tông, tường gạch, mái. Tính diện tích: tầng trệt 100%, ban công 70%, mái che 50%.",
    contentEn: "Residential shell construction from 3.5M VND/m². Includes foundation, concrete structure, masonry walls, roof. Area calculation: ground floor 100%, balcony 70%, covered area 50%.",
  },
  "xay-dung-nha-xuong": {
    title: "Xây Dựng Nhà Xưởng", titleEn: "Factory Construction", icon: "🏭", category: "industrial",
    content: "Thiết kế, thi công nhà xưởng công nghiệp, nhà thép tiền chế. Kinh nghiệm với dự án nhịp lớn 50m, nền đất yếu, và công trình trong khu công nghiệp Bà Rịa - Vũng Tàu.",
    contentEn: "Design and construction of industrial factories and prefabricated steel structures. Experience with large 50m span projects, soft ground foundations, and Ba Ria - Vung Tau industrial zone projects.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = serviceData[slug];
  return { title: data?.title ?? slug };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  const data = serviceData[slug];
  if (!data) notFound();

  const locale = "vi"; // server component default; client locale via useLocale not available here
  const allProjects = getProjects();
  const related = allProjects
    .filter((p) => p.frontmatter.category === data.category)
    .slice(0, 3);

  return (
    <>
      <div className="bg-[#0d1b2a] pt-32 pb-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4">{data.icon}</div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{data.title}</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-gray max-w-none text-lg leading-relaxed">
            <p>{service?.content ?? data.content}</p>
          </div>

          <div className="mt-10 p-6 bg-orange-50 rounded-xl border border-orange-100">
            <h3 className="font-bold text-gray-900 mb-3">Yêu Cầu Báo Giá</h3>
            <p className="text-gray-600 text-sm mb-4">Liên hệ với chúng tôi để nhận báo giá chi tiết và miễn phí cho dự án của bạn.</p>
            <Link
              href="/lien-he"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Liên Hệ Ngay →
            </Link>
          </div>
        </div>
      </section>

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
