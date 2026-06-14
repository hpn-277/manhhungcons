"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ProjectCard from "./ProjectCard";
import type { ContentItem, ProjectFrontmatter } from "@/lib/content";

const CATEGORIES = ["all", "industrial", "residential", "infrastructure", "maintenance"] as const;

interface Props {
  projects: ContentItem<ProjectFrontmatter>[];
}

export default function ProjectsFilter({ projects }: Props) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const matchCat = category === "all" || p.frontmatter.category === category;
    const title =
      locale === "en"
        ? p.frontmatter.titleEn || p.frontmatter.title
        : p.frontmatter.title;
    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      p.frontmatter.client.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const catLabels: Record<string, string> = {
    all: t("all"),
    industrial: t("industrial"),
    residential: t("residential"),
    infrastructure: t("infrastructure"),
    maintenance: t("maintenance"),
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${category === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:ml-auto border border-gray-200 rounded-full px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:border-orange-400"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              frontmatter={p.frontmatter}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Không tìm thấy dự án phù hợp</p>
        </div>
      )}
    </>
  );
}
