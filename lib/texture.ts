import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const TEXTURE_DIR = path.join(process.cwd(), "content", "texture-collector");

export type TextureMeta = {
  slug: string;
  title: string;
  category: string; // "글의 결" · "영상의 결" · "음악의 결" · "마음의 결" · "도파민의 결"
  source?: string; // 출처 (책·영화 제목 등)
  author?: string; // 저자·감독 등
  quote?: string; // 대표 글귀
  date: string;
  cover?: string;
};

export function getAllTextures(): TextureMeta[] {
  if (!fs.existsSync(TEXTURE_DIR)) return [];

  const files = fs
    .readdirSync(TEXTURE_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.endsWith(".en.mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(TEXTURE_DIR, file), "utf8")
      );
      return {
        slug,
        title: String(data.title ?? slug),
        category: String(data.category ?? "글의 결"),
        source: data.source ? String(data.source) : undefined,
        author: data.author ? String(data.author) : undefined,
        quote: data.quote ? String(data.quote) : undefined,
        date: String(data.date ?? "1970-01-01"),
        cover: data.cover ? String(data.cover) : undefined,
      } satisfies TextureMeta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
