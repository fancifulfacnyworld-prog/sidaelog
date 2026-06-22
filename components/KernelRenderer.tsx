import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleLayout } from "@/components/ArticleLayout";
import { getDict, type Lang } from "@/lib/i18n";
import * as mdxComponents from "@/components/mdx";

const DIR = path.join(process.cwd(), "content", "kernel");

function readKernel(slug: string, lang: Lang) {
  const koPath = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(koPath)) return null;
  const ko = matter(fs.readFileSync(koPath, "utf8"));

  let content = ko.content;
  let translated = true;
  if (lang === "en") {
    const enPath = path.join(DIR, `${slug}.en.mdx`);
    if (fs.existsSync(enPath)) {
      content = matter(fs.readFileSync(enPath, "utf8")).content;
    } else {
      translated = false;
    }
  }
  return { data: ko.data, content, translated };
}

export function buildKernelMeta(slug: string, lang: Lang): Metadata {
  const r = readKernel(slug, lang);
  if (!r) {
    return { title: "알맹이", description: "짧지만 핵심만 남긴 생각들" };
  }
  const { data } = r;
  const en = lang === "en";
  const title = String((en && data.title_en) || data.title || slug);
  const description = String(
    (en && data.subtitle_en) || data.subtitle || "짧지만 핵심만 남긴 생각들"
  );
  const cover = data.cover ? String(data.cover) : "/og/default.jpg";

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: cover, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [cover] },
  };
}

export async function KernelRenderer({ slug, lang }: { slug: string; lang: Lang }) {
  const dict = getDict(lang);
  const r = readKernel(slug, lang);
  if (!r) notFound();

  const { data, content, translated } = r;

  const en = lang === "en";
  const title = String((en && data.title_en) || data.title || slug);
  const subtitle = en && data.subtitle_en
    ? String(data.subtitle_en)
    : data.subtitle
      ? String(data.subtitle)
      : undefined;
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const date = data.date ? String(data.date) : undefined;

  return (
    <ArticleLayout lang={lang} title={title} subtitle={subtitle} date={date} tags={tags}>
      {en && !translated ? (
        <div className="mb-8 rounded-lg border-[1.5px] border-[#c2552e] bg-[#c2552e]/[0.06] px-4 py-3 text-[13px] leading-[1.7] text-[#16140f]/75">
          {dict.article.untranslated}
        </div>
      ) : null}

      <MDXRemote source={content} components={mdxComponents} />
    </ArticleLayout>
  );
}
