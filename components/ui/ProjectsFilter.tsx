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

  const counts: Record<string, number> = { all: projects.length };
  for (const p of projects) {
    counts[p.frontmatter.category] = (counts[p.frontmatter.category] ?? 0) + 1;
  }

  const filtered = projects.filter((p) =>
    category === "all" || p.frontmatter.category === category
  );

  const catLabels: Record<string, string> = {
    all: t("all"),
    industrial: t("industrial"),
    residential: t("residential"),
    infrastructure: t("infrastructure"),
    maintenance: t("maintenance"),
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              category === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {catLabels[cat]}
            {counts[cat] != null && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                category === cat
                  ? "bg-white/25 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}>
                {counts[cat]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard
            key={p.slug}
            slug={p.slug}
            frontmatter={p.frontmatter}
          />
        ))}
      </div>
    </>
  );
}
