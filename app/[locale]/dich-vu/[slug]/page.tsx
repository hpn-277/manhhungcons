import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
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

type Section = { heading: string; headingEn: string; items: string[]; itemsEn: string[] };
type ProcessStep = { step: string; title: string; titleEn: string };
type AreaRow = { label: string; labelEn: string; value: string };
type Highlight = { icon: string; title: string; titleEn: string; desc: string; descEn: string };

interface ServiceContent {
  title: string;
  titleEn: string;
  icon: string;
  category: string;
  intro: string;
  introEn: string;
  pricing?: string;
  pricingNote?: string;
  pricingNoteEn?: string;
  sections: Section[];
  process?: ProcessStep[];
  highlights?: Highlight[];
  areaCalc?: AreaRow[];
  warranty?: Section;
  standards?: string;
}

const serviceData: Record<string, ServiceContent> = {
  "sua-chua-bao-tri": {
    title: "Nâng Cấp & Sửa Chữa Công Trình",
    titleEn: "Maintenance & Repairs",
    icon: "🔧",
    category: "maintenance",
    intro: "Bảo trì công trình là tập hợp các công việc nhằm bảo đảm và duy trì sự làm việc bình thường, an toàn của công trình theo quy định của pháp luật. Mạnh Hùng có nhiều kinh nghiệm xử lý các sự cố thấm dột, rò rỉ và hư hỏng hệ thống kỹ thuật tại các công trình công nghiệp và dân dụng.",
    introEn: "Building maintenance encompasses all work to ensure normal, safe operation throughout a structure's lifespan. Manh Hung has extensive experience handling water leaks, structural damage, and technical system failures in both industrial and civil buildings.",
    sections: [
      {
        heading: "Phạm Vi Dịch Vụ",
        headingEn: "Service Scope",
        items: [
          "Kiểm tra và quan trắc công trình định kỳ",
          "Đánh giá chất lượng kết cấu và hệ thống kỹ thuật",
          "Bảo dưỡng thiết bị và hệ thống cơ điện",
          "Sửa chữa thấm dột mái, tường, sàn",
          "Gia cố và phục hồi kết cấu bê tông",
          "Nâng cấp hệ thống điện, cấp thoát nước",
        ],
        itemsEn: [
          "Periodic structural inspection and monitoring",
          "Quality assessment of structures and technical systems",
          "Equipment and MEP system maintenance",
          "Roof, wall, and floor waterproofing repairs",
          "Concrete structure reinforcement and restoration",
          "Electrical and plumbing system upgrades",
        ],
      },
      {
        heading: "Lợi Ích",
        headingEn: "Key Benefits",
        items: [
          "Kéo dài tuổi thọ công trình, bảo vệ tài sản lâu dài",
          "Cải thiện thẩm mỹ và nâng cao chất lượng sử dụng",
          "Tiết kiệm chi phí nhờ bảo trì phòng ngừa",
          "Đảm bảo an toàn cho người sử dụng công trình",
        ],
        itemsEn: [
          "Extended facility lifespan and long-term asset protection",
          "Improved aesthetics and quality of use",
          "Cost savings through preventive maintenance",
          "Safety assurance for building occupants",
        ],
      },
    ],
    process: [
      { step: "01", title: "Lập và phê duyệt quy trình bảo trì", titleEn: "Establish & approve maintenance procedures" },
      { step: "02", title: "Lập kế hoạch và dự toán kinh phí", titleEn: "Create plans and budget estimates" },
      { step: "03", title: "Kiểm tra định kỳ, đột xuất và bất thường", titleEn: "Conduct regular, scheduled, and emergency inspections" },
      { step: "04", title: "Quan trắc công trình có yêu cầu đặc biệt", titleEn: "Monitor projects requiring specialized oversight" },
      { step: "05", title: "Bảo dưỡng thiết bị công trình", titleEn: "Maintain facility equipment" },
      { step: "06", title: "Đánh giá an toàn chịu lực khi cần", titleEn: "Assess structural safety when necessary" },
      { step: "07", title: "Sửa chữa định kỳ và đột xuất", titleEn: "Execute scheduled and emergency repairs" },
      { step: "08", title: "Lưu trữ hồ sơ bảo trì", titleEn: "Document and archive maintenance records" },
    ],
    standards: "Nghị định 114/2010/NĐ-CP và Thông tư 11/2012/TT-BXD",
  },

  "xay-dung-biet-thu-mini-nha-cap-4-tron-goi": {
    title: "Xây Dựng Nhà Phố & Biệt Thự Trọn Gói",
    titleEn: "Townhouse & Villa Construction",
    icon: "🏠",
    category: "residential",
    intro: "Chúng tôi cung cấp dịch vụ xây dựng nhà phố, biệt thự trọn gói với mức giá cạnh tranh, bao gồm toàn bộ từ nền móng đến hoàn thiện nội thất cơ bản. Diện tích xây dựng càng lớn, thiết kế càng đơn giản thì chi phí trên mỗi m² càng thấp.",
    introEn: "We provide complete townhouse and villa construction services at competitive prices, covering everything from foundation to basic interior finishing. Larger areas with simpler designs result in lower cost per m².",
    pricing: "4.000.000 – 5.000.000 đ/m²",
    pricingNote: "Giá thay đổi theo diện tích, loại nhà và thỏa thuận cụ thể.",
    pricingNoteEn: "Price varies based on construction area, house type, and mutual agreement.",
    sections: [
      {
        heading: "Nền Móng & Kết Cấu",
        headingEn: "Foundation & Structure",
        items: [
          "Đào đất và thi công nền móng",
          "Dầm, cột bê tông cốt thép theo thiết kế",
          "San lấp và đổ bê tông nền",
        ],
        itemsEn: [
          "Excavation and foundation work",
          "Reinforced concrete beams and columns",
          "Ground leveling and concrete base",
        ],
      },
      {
        heading: "Tường & Hoàn Thiện",
        headingEn: "Walls & Finishing",
        items: [
          "Xây tường, vách ngăn nội thất",
          "Hệ thống điện, điện thoại, cáp ngầm trong tường",
          "Hệ thống cấp thoát nước trong tường",
          "Xây dựng hầm tự hoại",
          "Lát gạch sàn, ốp gạch tường",
          "Sơn nước hoàn thiện (xử lý matic, bả, sơn 2 nước)",
        ],
        itemsEn: [
          "Wall construction and internal partitioning",
          "In-wall electrical, telephone, and cable systems",
          "In-wall water supply and drainage systems",
          "Septic tank construction",
          "Floor tiling and wall cladding",
          "Water-based paint finishing (matic treatment, leveling, 2 coats)",
        ],
      },
      {
        heading: "Thiết Bị & Hệ Thống",
        headingEn: "Fixtures & Systems",
        items: [
          "Thiết bị vệ sinh (chậu rửa, bồn cầu, gương)",
          "Hệ thống điện và chiếu sáng hoàn chỉnh",
          "Dọn dẹp vệ sinh công trình trước bàn giao",
        ],
        itemsEn: [
          "Bathroom fixtures (sinks, toilets, mirrors)",
          "Complete electrical and lighting systems",
          "Site cleaning before handover",
        ],
      },
    ],
    areaCalc: [
      { label: "Tầng trệt, lửng, lầu", labelEn: "Ground, mezzanine, upper floors", value: "100%" },
      { label: "Ban công, sân thượng, mái ngói", labelEn: "Balconies, rooftop terraces, tile roofs", value: "70%" },
      { label: "Sân ngoài trời", labelEn: "Outdoor yards", value: "30%" },
      { label: "Giếng trời, mái bê tông", labelEn: "Skylights, concrete roofs", value: "70%" },
      { label: "Mái tôn", labelEn: "Metal roofing", value: "25%" },
    ],
    warranty: {
      heading: "Bảo Hành",
      headingEn: "Warranty",
      items: [
        "Kết cấu công trình: 12 tháng kể từ ngày bàn giao",
        "Hệ thống điện & cấp thoát nước: 5 năm",
        "Hỗ trợ khắc phục trong vòng 24 giờ sau khi nhận thông báo",
        "Tư vấn kỹ thuật miễn phí trong suốt thời gian bảo hành",
      ],
      itemsEn: [
        "General structure: 12 months from handover",
        "Electrical and water systems: 5 years",
        "Remediation support within 24 hours of notification",
        "Free technical consultation throughout the warranty period",
      ],
    },
    standards: "TCXDVN 371:2006, TCVN 4453:1995",
  },

  "xay-dung-co-so-ha-tang-ky-thuat": {
    title: "Xây Dựng Cơ Sở Hạ Tầng Kỹ Thuật",
    titleEn: "Technical Infrastructure Construction",
    icon: "⚙️",
    category: "infrastructure",
    intro: "Mạnh Hùng chuyên thi công các công trình cơ sở hạ tầng kỹ thuật phục vụ khu công nghiệp, nhà máy và khu dân cư tại Bà Rịa - Vũng Tàu và các tỉnh lân cận. Mọi công trình đều đáp ứng tiêu chuẩn môi trường và kỹ thuật hiện hành.",
    introEn: "Manh Hung specializes in technical infrastructure works for industrial zones, factories, and residential areas in Ba Ria - Vung Tau and neighboring provinces. All projects meet current environmental and technical standards.",
    sections: [
      {
        heading: "Hệ Thống Cấp Thoát Nước",
        headingEn: "Water Supply & Drainage",
        items: [
          "Thi công hệ thống cấp nước sạch",
          "Hệ thống thoát nước mưa và nước thải",
          "Mương thoát nước công nghiệp",
          "Hệ thống đường ống ngầm",
        ],
        itemsEn: [
          "Clean water supply system construction",
          "Rainwater and wastewater drainage systems",
          "Industrial drainage channels",
          "Underground pipeline systems",
        ],
      },
      {
        heading: "Hệ Thống Xử Lý & Chứa",
        headingEn: "Treatment & Storage Systems",
        items: [
          "Hầm xử lý nước thải sinh hoạt và công nghiệp",
          "Bể khuấy bùn công nghiệp",
          "Bể chứa nước cứu hỏa",
          "Bể chứa nước ngầm",
          "Hồ bơi và bể chứa nước",
          "Chống thấm và cải tạo bể chứa",
        ],
        itemsEn: [
          "Domestic and industrial wastewater treatment pits",
          "Industrial mud agitation tanks",
          "Fire-fighting water tanks",
          "Underground water tanks",
          "Swimming pools and water reservoirs",
          "Waterproofing and renovation of storage tanks",
        ],
      },
      {
        heading: "Công Trình Đặc Biệt",
        headingEn: "Specialized Works",
        items: [
          "Hầm bê tông cốt thép chịu lực cao",
          "Bể xử lý chất thải nguy hại",
          "Tháp lọc và hệ thống xử lý nước công nghiệp",
          "Hệ thống đường ray xe goòng công nghiệp",
        ],
        itemsEn: [
          "High-strength reinforced concrete pits",
          "Hazardous waste treatment tanks",
          "Industrial water filtration towers and treatment systems",
          "Industrial rail (goong) systems",
        ],
      },
    ],
    highlights: [
      { icon: "🏭", title: "Kinh nghiệm khu công nghiệp", titleEn: "Industrial zone experience", desc: "Thi công tại KCN Phú Mỹ 3 và các khu công nghiệp BR-VT", descEn: "Projects at Phu My 3 and Ba Ria-Vung Tau industrial zones" },
      { icon: "🌿", title: "Tiêu chuẩn môi trường", titleEn: "Environmental standards", desc: "Đáp ứng đầy đủ quy chuẩn kỹ thuật quốc gia về môi trường", descEn: "Fully compliant with national environmental technical standards" },
      { icon: "🔩", title: "Kết cấu bền vững", titleEn: "Durable structures", desc: "Sử dụng vật liệu chất lượng cao, thi công đúng quy trình", descEn: "High-quality materials with proper construction procedures" },
    ],
  },

  "xay-dung-nha-tho": {
    title: "Xây Dựng Nhà Thô",
    titleEn: "Shell Construction",
    icon: "🏗️",
    category: "residential",
    intro: "Thi công phần thô (phần thô) là giai đoạn đầu tiên của xây dựng, bao gồm nền móng, hệ thống khung (cột, dầm, sàn bê tông), mái, cầu thang và tường gạch trát. Mạnh Hùng cung cấp dịch vụ thi công nhà thô với mức giá từ 3.500.000 đ/m² đảm bảo chất lượng kết cấu.",
    introEn: "Shell construction is the first phase of building, covering foundation, structural system (columns, beams, concrete floors), roof, stairs, and plastered masonry walls. Manh Hung delivers quality shell construction from 3,500,000 VND/m².",
    pricing: "3.500.000 đ/m²",
    pricingNote: "Giá thay đổi theo diện tích và loại công trình. Liên hệ để nhận báo giá chính xác.",
    pricingNoteEn: "Price varies by area and project type. Contact us for an accurate quote.",
    sections: [
      {
        heading: "Phần Thô (Hạng Mục Bắt Buộc)",
        headingEn: "Shell Works (Included)",
        items: [
          "Đào đất và thi công nền móng",
          "Kết cấu bê tông toàn bộ các tầng (cột, dầm, sàn, mái)",
          "San lấp và đổ bê tông nền tầng trệt",
          "Xây tường và trát tường",
          "Thi công cầu thang",
          "Hệ thống điện, viễn thông, cáp TV ngầm",
          "Hệ thống cấp thoát nước",
          "Xây dựng hầm tự hoại",
        ],
        itemsEn: [
          "Excavation and foundation installation",
          "Structural concrete across all floors (columns, beams, slabs, roof)",
          "Earth leveling and concrete base for ground floor",
          "Wall construction and plastering",
          "Stair construction",
          "Embedded electrical, telecom, and cable systems",
          "Water supply and drainage systems",
          "Septic tank installation",
        ],
      },
      {
        heading: "Phần Hoàn Thiện (Tuỳ Chọn)",
        headingEn: "Finishing Works (Optional)",
        items: [
          "Lát gạch sàn, ốp gạch tường",
          "Ốp đá trang trí (không bao gồm đá granite/marble)",
          "Sơn nước và hoàn thiện tường",
          "Lắp đặt thiết bị vệ sinh",
          "Hệ thống điện và chiếu sáng hoàn chỉnh",
          "Vệ sinh công trình trước bàn giao",
        ],
        itemsEn: [
          "Floor and wall tiling",
          "Decorative stone work (excluding granite/marble)",
          "Painting and wall finishing",
          "Plumbing fixture installation",
          "Complete electrical and lighting systems",
          "Site cleanup before handover",
        ],
      },
    ],
    areaCalc: [
      { label: "Tầng trệt, lửng, lầu", labelEn: "Ground, mezzanine, upper floors", value: "100%" },
      { label: "Ban công, sân thượng, mái ngói", labelEn: "Balconies, rooftop terraces, tile roofs", value: "70%" },
      { label: "Sân ngoài trời", labelEn: "Outdoor yards", value: "30%" },
      { label: "Giếng trời, mái bê tông", labelEn: "Skylights, concrete roofs", value: "70%" },
      { label: "Mái tôn", labelEn: "Metal roofing", value: "25%" },
    ],
  },

  "xay-dung-nha-xuong": {
    title: "Thiết Kế & Thi Công Nhà Xưởng",
    titleEn: "Factory & Industrial Construction",
    icon: "🏭",
    category: "industrial",
    intro: "Mạnh Hùng chuyên thiết kế và thi công nhà xưởng công nghiệp, nhà thép tiền chế và các công trình phụ trợ trong khu công nghiệp tại Bà Rịa - Vũng Tàu. Chúng tôi đồng hành cùng chính sách công nghiệp hoá, hiện đại hoá đất nước với phương châm \"Dân giàu - Nước mạnh\".",
    introEn: "Manh Hung specializes in designing and building industrial factories, prefabricated steel structures, and supporting facilities in Ba Ria - Vung Tau industrial zones. We support Vietnam's industrialization with the motto \"Prosperous people – Strong nation\".",
    sections: [
      {
        heading: "Nhà Xưởng Công Nghiệp",
        headingEn: "Industrial Factory Buildings",
        items: [
          "Thiết kế và thi công nhà xưởng sản xuất",
          "Nhà thép tiền chế (kết cấu nhẹ và nặng)",
          "Nhà kho, nhà lưu trữ công nghiệp",
          "Nền móng nhà xưởng trên nền đất yếu",
          "Hệ thống mái tôn, cửa sổ mái lấy sáng",
          "Hệ thống cầu trục, ray cầu trục",
        ],
        itemsEn: [
          "Industrial production facility design and construction",
          "Prefabricated steel structures (light and heavy frame)",
          "Industrial warehouses and storage buildings",
          "Factory foundations on soft ground",
          "Metal roofing and skylight systems",
          "Overhead crane rail systems",
        ],
      },
      {
        heading: "Hạ Tầng & Công Trình Phụ Trợ",
        headingEn: "Infrastructure & Support Works",
        items: [
          "Hệ thống cấp thoát nước nhà máy",
          "Hệ thống xử lý nước thải công nghiệp",
          "Đường nội bộ và sân bãi trong khu xưởng",
          "Tường rào bảo quanh nhà máy",
          "Nhà văn phòng và nhà bảo vệ",
        ],
        itemsEn: [
          "Factory water supply and drainage systems",
          "Industrial wastewater treatment systems",
          "Internal roads and yard areas",
          "Perimeter boundary walls",
          "Office buildings and security posts",
        ],
      },
    ],
    highlights: [
      { icon: "🔩", title: "Nhà thép tiền chế", titleEn: "Prefabricated steel", desc: "Thi công lắp dựng nhà thép tiền chế cho siêu thị, trung tâm thương mại, nhà kho", descEn: "Steel structure assembly for supermarkets, commercial centers, and warehouses" },
      { icon: "🏭", title: "KCN Bà Rịa - Vũng Tàu", titleEn: "BR-VT industrial zones", desc: "Kinh nghiệm thi công tại KCN Phú Mỹ 3 và các khu công nghiệp trong tỉnh", descEn: "Experience in Phu My 3 and other industrial zones in the province" },
      { icon: "📐", title: "Khẩu độ lớn", titleEn: "Large span structures", desc: "Năng lực thi công công trình nhịp lớn, đáp ứng yêu cầu nhà xưởng hiện đại", descEn: "Capable of large-span construction meeting modern factory requirements" },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = serviceData[slug];
  return { title: data?.title ?? slug };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = serviceData[slug];
  if (!data) notFound();

  const locale = await getLocale();
  const allProjects = getProjects();
  const related = allProjects
    .filter((p) => p.frontmatter.category === data.category)
    .slice(0, 3);

  const isEn = locale === "en";

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{data.icon}</span>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900">
                {isEn ? data.titleEn : data.title}
              </h1>
              <div className="w-12 h-1 bg-orange-500 mt-2" />
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            {isEn ? data.introEn : data.intro}
          </p>
        </div>
      </section>

      {/* Pricing badge */}
      {data.pricing && (
        <div className="bg-orange-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="text-white">
              <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
                {isEn ? "Starting from" : "Giá chỉ từ"}
              </span>
              <div className="text-3xl font-black">{data.pricing}</div>
            </div>
            {data.pricingNote && (
              <p className="sm:ml-auto text-orange-100 text-sm max-w-xs">
                {isEn ? data.pricingNoteEn : data.pricingNote}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Content sections */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          {data.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-black text-gray-900 mb-4">
                {isEn ? section.headingEn : section.heading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(isEn ? section.itemsEn : section.items).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-orange-500 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process steps */}
      {data.process && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {isEn ? "8-Step Process" : "Quy Trình 8 Bước"}
            </h2>
            <div className="w-10 h-1 bg-orange-500 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.process.map((step) => (
                <div key={step.step} className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100">
                  <div className="text-2xl font-black text-orange-200 shrink-0 w-10 text-right leading-none">
                    {step.step}
                  </div>
                  <p className="text-gray-700 text-sm leading-snug pt-0.5">
                    {isEn ? step.titleEn : step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      {data.highlights && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {isEn ? "Why Choose Us" : "Thế Mạnh Của Chúng Tôi"}
            </h2>
            <div className="w-10 h-1 bg-orange-500 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.highlights.map((h) => (
                <div key={h.title} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                  <div className="text-4xl mb-3">{h.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">
                    {isEn ? h.titleEn : h.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {isEn ? h.descEn : h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Area calculation */}
      {data.areaCalc && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {isEn ? "Area Calculation Method" : "Cách Tính Diện Tích Xây Dựng"}
            </h2>
            <div className="w-10 h-1 bg-orange-500 mb-6" />
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">
                      {isEn ? "Area Type" : "Loại Diện Tích"}
                    </th>
                    <th className="text-right px-4 py-3 font-semibold">
                      {isEn ? "Calculation Rate" : "Hệ Số Tính"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.areaCalc.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-700">{isEn ? row.labelEn : row.label}</td>
                      <td className="px-4 py-3 text-right font-bold text-orange-600">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Warranty */}
      {data.warranty && (
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {isEn ? data.warranty.headingEn : data.warranty.heading}
            </h2>
            <div className="w-10 h-1 bg-orange-500 mb-6" />
            <ul className="space-y-3">
              {(isEn ? data.warranty.itemsEn : data.warranty.items).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-orange-500 shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Standards */}
      {data.standards && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-4">
          <p className="text-xs text-gray-400">
            {isEn ? "Standards:" : "Tiêu chuẩn áp dụng:"} {data.standards}
          </p>
        </div>
      )}

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
            <h3 className="font-bold text-gray-900 mb-2">
              {isEn ? "Request a Free Quote" : "Yêu Cầu Báo Giá Miễn Phí"}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {isEn
                ? "Contact us for a detailed quote tailored to your project."
                : "Liên hệ với chúng tôi để nhận báo giá chi tiết và miễn phí cho dự án của bạn."}
            </p>
            <Link
              href="/lien-he"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              {isEn ? "Contact Us →" : "Liên Hệ Ngay →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-gray-900 mb-8">
              {isEn ? "Related Projects" : "Dự Án Liên Quan"}
            </h2>
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
