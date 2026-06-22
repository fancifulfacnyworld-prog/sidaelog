import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lang } from "./i18n";

const ARTICLES_DIR = path.join(process.cwd(), "content", "cases");

export type ArticleMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  series: string;
  order?: number;
  case?: number;
  parent: string;
  isRoot: boolean;
  cover?: string;
  excerpt?: string;
};

// 본문 첫 문단을 발췌로 추출 (MDX 컴포넌트·heading·import 제외)
function extractExcerpt(content: string): string {
  const lines = content.split("\n");
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) continue;
    if (t.startsWith("import ") || t.startsWith("export ")) continue;
    if (t.startsWith("#") || t.startsWith("---")) continue;
    if (t.startsWith("<") && /^<[A-Z]/.test(t)) continue; // JSX 컴포넌트
    const clean = t
      .replace(/<[^>]+>/g, " ") // html/jsx 태그
      .replace(/[*_`>]/g, "") // 마크다운 기호
      .replace(/\s+/g, " ")
      .trim();
    if (clean.length > 8) return clean.slice(0, 120);
  }
  return "";
}

export function getAllArticles(lang: Lang = "ko"): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.endsWith(".en.mdx"));

  const items = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(ARTICLES_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const en = lang === "en";

    return {
      slug,
      title: String((en && data.title_en) || data.title || slug),
      subtitle: en && data.subtitle_en
        ? String(data.subtitle_en)
        : data.subtitle
          ? String(data.subtitle)
          : undefined,
      date: String(data.date ?? "1970-01-01"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      series: data.series ? String(data.series) : "",
      parent: data.parent ? String(data.parent) : "",
      isRoot: Boolean(data.isRoot),
      order: data.order ? Number(data.order) : undefined,
      case: data.case ? Number(data.case) : undefined,
      cover: data.cover ? String(data.cover) : undefined,
      excerpt: en && data.excerpt_en
        ? String(data.excerpt_en)
        : extractExcerpt(content),
    } satisfies ArticleMeta;
  });

  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  return items;
}

export function getArticlePath(slug: string) {
  return path.join(ARTICLES_DIR, `${slug}.mdx`);
}