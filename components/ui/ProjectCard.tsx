import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import type { ProjectFrontmatter } from "@/lib/content";

interface Props {
  slug: string;
  frontmatter: ProjectFrontmatter;
}

const categoryLabels: Record<string, { vi: string; en: string }> = {
  industrial: { vi: "Công Nghiệp", en: "Industrial" },
  residential: { vi: "Dân Dụng", en: "Residential" },
  infrastructure: { vi: "Hạ Tầng", en: "Infrastructure" },
  maintenance: { vi: "Bảo Trì", en: "Maintenance" },
};

export default function ProjectCard({ slug, frontmatter }: Props) {
  const locale = useLocale();
  const title = locale === "en" ? frontmatter.titleEn || frontmatter.title : frontmatter.title;
  const excerpt = locale === "en" ? frontmatter.excerptEn || frontmatter.excerpt : frontmatter.excerpt;
  const catLabel = categoryLabels[frontmatter.category]?.[locale as "vi" | "en"] ?? frontmatter.category;
  const heroImage = frontmatter.images?.[0];

  return (
    <Link href={`/project/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-gray-700 flex items-center justify-center">
            <span className="text-white/30 text-4xl font-black">MH</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {catLabel}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm line-clamp-2">{excerpt}</p>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {frontmatter.client} · {frontmatter.year}
        </p>
      </div>
    </Link>
  );
}
