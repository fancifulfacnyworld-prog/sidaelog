// app/articles/[slug]/page.tsx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

// Next 16: params 가 Promise 라는 룰 반영
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

  // mdx 파일을 "마크다운 텍스트"로 읽기
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return (
    <ArticleLayout
      title={data.title ?? slug}
      subtitle={data.subtitle}
      date={data.date}
      tags={data.tags}
    >
      {/* 우선은 그냥 텍스트/마크다운으로 보여주기 */}
      <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
        {content}
      </div>
    </ArticleLayout>
  );
}