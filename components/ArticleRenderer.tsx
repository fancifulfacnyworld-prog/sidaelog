import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleLayout } from "@/components/ArticleLayout";
import { getAllArticles } from "@/lib/articles";
import { getDict, type Lang } from "@/lib/i18n";
import * as mdxComponents from "@/components/mdx";

const DIR = path.join(process.cwd(), "content", "cases");

// 메타(frontmatter)는 항상 원본 slug.mdx에서, 본문은 영어면 slug.en.mdx 우선
function readArticle(slug: string, lang: Lang) {
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

export function buildArticleMeta(slug: string, lang: Lang): Metadata {
  const r = readArticle(slug, lang);
  if (!r) {
    return { title: "시대로그", description: "시대를 읽고 기록하는 매거진" };
  }
  const { data } = r;
  const en = lang === "en";
  const title = String((en && data.title_en) || data.title || slug);
  const description = String(
    (en && data.subtitle_en) || data.subtitle || "시대를 읽고 기록하는 매거진"
  );
  const cover = data.cover ? String(data.cover) : "/og/default.jpg";

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: cover, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [cover] },
  };
}

export async function ArticleRenderer({ slug, lang }: { slug: string; lang: Lang }) {
  const dict = getDict(lang);
  const r = readArticle(slug, lang);
  if (!r) notFound();

  const { data, content, translated } = r;

  const articles = getAllArticles(lang);
  const children = articles
    .filter((a) => a.parent === slug)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const parentSlug = data.parent ? String(data.parent) : "";
  const parentArticle = parentSlug
    ? articles.find((a) => a.slug === parentSlug)
    : undefined;

  const en = lang === "en";
  const title = String((en && data.title_en) || data.title || slug);
  const subtitle = en && data.subtitle_en
    ? String(data.subtitle_en)
    : data.subtitle
      ? String(data.subtitle)
      : undefined;
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const date = data.date ? String(data.date) : undefined;

  const artHref = (s: string) => `${en ? "/en" : ""}/articles/${s}`;

  return (
    <ArticleLayout lang={lang} title={title} subtitle={subtitle} date={date} tags={tags}>
      {en && !translated ? (
        <div className="mb-8 rounded-lg border-[1.5px] border-[#c2552e] bg-[#c2552e]/[0.06] px-4 py-3 text-[13px] leading-[1.7] text-[#16140f]/75">
          {dict.article.untranslated}
        </div>
      ) : null}

      {parentArticle ? (
        <div className="mb-8 rounded-lg border-[1.5px] border-[#16140f] bg-[#16140f]/[0.03] px-5 py-4">
          <p className="text-[13px] leading-[1.8] text-[#16140f]/65">
            {dict.article.continues(parentArticle.title)}
          </p>
          <Link
            href={artHref(parentArticle.slug)}
            className="mt-2 inline-block text-[12px] uppercase tracking-[0.16em] text-[#c2552e] hover:underline hover:underline-offset-4"
          >
            {dict.article.original}
          </Link>
        </div>
      ) : null}

      {data.cover ? (
        <div className="mb-10">
          <div className="overflow-hidden rounded-lg border-[1.5px] border-[#16140f]">
            <Image
              src={String(data.cover)}
              alt={title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          {data.coverCredit ? (
            <p className="mt-3 text-right text-[11px] tracking-[0.04em] text-[#16140f]/35">
              {String(data.coverCredit)}
            </p>
          ) : null}
        </div>
      ) : null}

      <MDXRemote source={content} components={mdxComponents} />

      {children.length ? (
        <div className="mt-16 border-t-2 border-[#16140f] pt-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c2552e]">
            {dict.article.further}
          </div>
          <div className="mt-4 space-y-3">
            {children.map((child, index) => (
              <Link
                key={child.slug}
                href={artHref(child.slug)}
                className="block text-[16px] font-medium leading-[1.7] text-[#16140f]/70 transition hover:text-[#c2552e]"
              >
                {String(index + 1).padStart(2, "0")} · {child.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </ArticleLayout>
  );
}
