import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { ServiceFrontmatter } from "@/lib/content";

interface Props {
  slug: string;
  frontmatter: ServiceFrontmatter;
}

const icons: Record<string, string> = {
  wrench: "🔧",
  home: "🏠",
  building: "🏗️",
  factory: "🏭",
  infrastructure: "⚙️",
};

export default function ServiceCard({ slug, frontmatter }: Props) {
  const locale = useLocale();
  const t = useTranslations("services");
  const title = locale === "en" ? frontmatter.titleEn || frontmatter.title : frontmatter.title;
  const excerpt = locale === "en" ? frontmatter.excerptEn || frontmatter.excerpt : frontmatter.excerpt;

  return (
    <div className="group bg-white border border-gray-100 rounded-xl p-6 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:bg-orange-100 transition-colors">
        {icons[frontmatter.icon] ?? "🏗️"}
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
      <Link
        href={`/dich-vu/${slug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
      >
        {t("learnMore")} →
      </Link>
    </div>
  );
}
