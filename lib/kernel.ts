import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lang } from "./i18n";

const KERNEL_DIR = path.join(process.cwd(), "content", "kernel");

export type KernelMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  tags?: string[];
  cover?: string;
};

export function getAllKernelArticles(lang: Lang = "ko"): KernelMeta[] {
  if (!fs.existsSync(KERNEL_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(KERNEL_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.endsWith(".en.mdx"));

  const en = lang === "en";

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(KERNEL_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);

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
        cover: data.cover ? String(data.cover) : undefined,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}