import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleLayout } from "@/components/ArticleLayout";
import { getAllArticles } from "@/lib/articles";
import * as mdxComponents from "@/components/mdx";

const ARTICLES_DIR = path.join(process.cwd(), "content", "cases");

type ArticleParams = {
  slug: string;
};

type ArticlePageProps = {
  params: Promise<ArticleParams>;
};

/* OG Metadata */
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;

  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return {
      title: "시대로그",
      description: "시대를 읽고 기록하는 매거진",
    };
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);

  const title = String(data.title ?? slug);

  const description = String(
    data.subtitle ?? "시대를 읽고 기록하는 매거진"
  );

  const cover = data.cover
    ? String(data.cover)
    : "/og/default.jpg";

  return {
    title,
    description,

    openGraph: {
      title,
      description,

      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const fileName = `${slug}.mdx`;
  const fullPath = path.join(ARTICLES_DIR, fileName);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const articles = getAllArticles();

  const children = articles
    .filter((article) => article.parent === slug)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const parentSlug = data.parent ? String(data.parent) : "";

  const parentArticle = parentSlug
    ? articles.find((article) => article.slug === parentSlug)
    : undefined;

  return (
    <ArticleLayout
      title={String(data.title ?? slug)}
      subtitle={data.subtitle ? String(data.subtitle) : undefined}
      date={data.date ? String(data.date) : undefined}
      tags={Array.isArray(data.tags) ? data.tags.map(String) : []}
    >
      {parentArticle ? (
        <div className="mb-8 rounded-lg border-[1.5px] border-[#16140f] bg-[#16140f]/[0.03] px-5 py-4">
          <p className="text-[13px] leading-[1.8] text-[#16140f]/65">
            이 글은 ‘{parentArticle.title}’에서 이어집니다.
          </p>

          <Link
            href={`/articles/${parentArticle.slug}`}
            className="mt-2 inline-block text-[12px] uppercase tracking-[0.16em] text-[#c2552e] hover:underline hover:underline-offset-4"
          >
            원글 보기 →
          </Link>
        </div>
      ) : null}

      {data.cover ? (
        <div className="mb-10">
          <div className="overflow-hidden rounded-lg border-[1.5px] border-[#16140f]">
            <Image
              src={String(data.cover)}
              alt={String(data.title ?? "")}
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
            Further Questions
          </div>

          <div className="mt-4 space-y-3">
            {children.map((child, index) => (
              <Link
                key={child.slug}
                href={`/articles/${child.slug}`}
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