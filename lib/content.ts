import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ProjectFrontmatter {
  title: string;
  titleEn: string;
  client: string;
  year: number;
  location: string;
  category: "industrial" | "residential" | "infrastructure" | "maintenance";
  excerpt: string;
  excerptEn: string;
  images: string[];
  featured?: boolean;
}

export interface BlogFrontmatter {
  title: string;
  titleEn: string;
  date: string;
  excerpt: string;
  excerptEn: string;
  tags: string[];
  image?: string;
}

export interface ServiceFrontmatter {
  title: string;
  titleEn: string;
  icon: string;
  excerpt: string;
  excerptEn: string;
  category: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

function readDir<T>(dir: string): ContentItem<T>[] {
  const dirPath = path.join(contentDir, dir);
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data, content } = matter(raw);
    return { slug, frontmatter: data as T, content };
  });
}

export function getProjects(): ContentItem<ProjectFrontmatter>[] {
  return readDir<ProjectFrontmatter>("projects").sort(
    (a, b) => b.frontmatter.year - a.frontmatter.year
  );
}

export function getProject(slug: string): ContentItem<ProjectFrontmatter> | null {
  const all = getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export function getBlogPosts(): ContentItem<BlogFrontmatter>[] {
  return readDir<BlogFrontmatter>("blog").sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getBlogPost(slug: string): ContentItem<BlogFrontmatter> | null {
  const all = getBlogPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export function getServices(): ContentItem<ServiceFrontmatter>[] {
  return readDir<ServiceFrontmatter>("services");
}

export function getService(slug: string): ContentItem<ServiceFrontmatter> | null {
  const all = getServices();
  return all.find((s) => s.slug === slug) ?? null;
}
