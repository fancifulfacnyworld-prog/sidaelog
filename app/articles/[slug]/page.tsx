import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleLayout } from "@/components/ArticleLayout";
import { getAllArticles } from "@/lib/articles";
import * as mdxComponents from "@/components/mdx";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

type ArticleParams = {
  slug: string;
};

type ArticlePageProps = {
  params: Promise<ArticleParams>;
};

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
        <div className="mb-8 rounded-2xl border border-black/10 bg-white/50 px-5 py-4">
          <p className="text-[13px] leading-[1.8] text-black/55">
            이 글은 ‘{parentArticle.title}’에서 이어집니다.
          </p>

          <Link
            href={`/articles/${parentArticle.slug}`}
            className="mt-2 inline-block text-[12px] uppercase tracking-[0.16em] text-black/45 hover:text-black hover:underline hover:underline-offset-4"
          >
            원글 보기
          </Link>
        </div>
      ) : null}

      <div className="text-[15px] leading-[1.9] tracking-[-0.01em]">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </ArticleLayout>
  );
}