import type { MetadataRoute } from "next";
import { getProjects, getBlogPosts } from "@/lib/content";
import { services } from "@/lib/services";
import { routing } from "@/i18n/routing";
import { SITE_URL, localePath } from "@/lib/site";

const LOCALES = routing.locales;

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function localizedEntry(
  path: string,
  opts: {
    priority: number;
    changeFrequency: ChangeFrequency;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_URL}${localePath(locale, path)}`])
  );
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}${localePath(locale, path)}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = [
    localizedEntry("", { priority: 1, changeFrequency: "weekly" }),
    localizedEntry("/gioi-thieu", { priority: 0.8, changeFrequency: "monthly" }),
    localizedEntry("/dich-vu", { priority: 0.9, changeFrequency: "monthly" }),
    localizedEntry("/danh-sach-du-an", { priority: 0.9, changeFrequency: "weekly" }),
    localizedEntry("/blog", { priority: 0.7, changeFrequency: "weekly" }),
    localizedEntry("/lien-he", { priority: 0.6, changeFrequency: "yearly" }),
  ].flat();

  const serviceEntries = services
    .map((s) =>
      localizedEntry(`/dich-vu/${s.slug}`, {
        priority: 0.8,
        changeFrequency: "monthly",
      })
    )
    .flat();

  const projectEntries = getProjects()
    .map((p) =>
      localizedEntry(`/project/${p.slug}`, {
        priority: 0.6,
        changeFrequency: "yearly",
        lastModified: new Date(`${p.frontmatter.year}-01-01`),
      })
    )
    .flat();

  const blogEntries = getBlogPosts()
    .map((p) =>
      localizedEntry(`/blog/${p.slug}`, {
        priority: 0.6,
        changeFrequency: "monthly",
        lastModified: new Date(p.frontmatter.date),
      })
    )
    .flat();

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...blogEntries];
}
