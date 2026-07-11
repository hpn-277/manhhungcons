"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ProjectCard from "./ProjectCard";
import type { ContentItem, ProjectFrontmatter } from "@/lib/content";

const CATEGORIES = ["all", "industrial", "residential", "infrastructure", "maintenance"] as const;
const PAGE_SIZE = 9;

interface Props {
  projects: ContentItem<ProjectFrontmatter>[];
}

export default function ProjectsFilter({ projects }: Props) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

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

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const handleCategory = (cat: string) => { setCategory(cat); setPage(0); };
  const handleSearch = (val: string) => { setSearch(val); setPage(0); };

  const catLabels: Record<string, string> = {
    all: t("all"),
    industrial: t("industrial"),
    residential: t("residential"),
    infrastructure: t("infrastructure"),
    maintenance: t("maintenance"),
  };

  const catCounts: Record<string, number> = {
    all: projects.length,
    industrial: projects.filter((p) => p.frontmatter.category === "industrial").length,
    residential: projects.filter((p) => p.frontmatter.category === "residential").length,
    infrastructure: projects.filter((p) => p.frontmatter.category === "infrastructure").length,
    maintenance: projects.filter((p) => p.frontmatter.category === "maintenance").length,
  };

  const start = page * PAGE_SIZE + 1;
  const end = Math.min((page + 1) * PAGE_SIZE, filtered.length);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${category === cat
                ? "bg-orange-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {catLabels[cat]}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-normal ${category === cat ? "bg-white/25 text-white" : "bg-gray-200 text-gray-500"}`}>
                {catCounts[cat]}
              </span>
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="sm:ml-auto border border-gray-200 rounded-full px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:border-orange-400"
        />
      </div>

      <p className="text-sm text-gray-400 mb-6">
        {filtered.length > 0
          ? `Hiển thị ${start}–${end} của ${filtered.length} công trình`
          : ""}
      </p>

      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((p) => (
              <ProjectCard
                key={p.slug}
                slug={p.slug}
                frontmatter={p.frontmatter}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous"
              >
                ←
              </button>
              <span className="text-sm text-gray-500">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next"
              >
                →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Không tìm thấy dự án phù hợp</p>
        </div>
      )}
    </>
  );
}
