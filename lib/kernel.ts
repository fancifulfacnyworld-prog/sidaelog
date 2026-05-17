import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const KERNEL_DIR = path.join(process.cwd(), "content", "kernel");

export type KernelMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  tags?: string[];
  cover?: string;
};

export function getAllKernelArticles(): KernelMeta[] {
  if (!fs.existsSync(KERNEL_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(KERNEL_DIR)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(KERNEL_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        subtitle: data.subtitle ? String(data.subtitle) : undefined,
        date: String(data.date ?? "1970-01-01"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: data.cover ? String(data.cover) : undefined,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}