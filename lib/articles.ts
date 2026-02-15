import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
};

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));

  const items = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(ARTICLES_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: String(data.title ?? slug),
      subtitle: data.subtitle ? String(data.subtitle) : undefined,
      date: String(data.date ?? "1970-01-01"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    } satisfies ArticleMeta;
  });

  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  return items;
}

export function getArticlePath(slug: string) {
  return path.join(ARTICLES_DIR, `${slug}.mdx`);
}