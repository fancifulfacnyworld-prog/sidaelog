import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleLayout } from "@/components/ArticleLayout";
import * as mdxComponents from "@/components/mdx";

const KERNEL_DIR = path.join(process.cwd(), "content", "kernel");

type KernelParams = {
  slug: string;
};

type KernelPageProps = {
  params: Promise<KernelParams>;
};

export async function generateMetadata({ params }: KernelPageProps) {
  const { slug } = await params;
  const fullPath = path.join(KERNEL_DIR, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return {
      title: "알맹이",
      description: "짧지만 핵심만 남긴 생각들",
    };
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);

  const title = String(data.title ?? slug);
  const description = String(data.subtitle ?? "짧지만 핵심만 남긴 생각들");
  const cover = data.cover ? String(data.cover) : "/og/default.jpg";

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

export default async function KernelArticlePage({ params }: KernelPageProps) {
  const { slug } = await params;
  const fullPath = path.join(KERNEL_DIR, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return (
    <ArticleLayout
      title={String(data.title ?? slug)}
      subtitle={data.subtitle ? String(data.subtitle) : undefined}
      date={data.date ? String(data.date) : undefined}
      tags={Array.isArray(data.tags) ? data.tags.map(String) : []}
    >
      <MDXRemote source={content} components={mdxComponents} />
    </ArticleLayout>
  );
}