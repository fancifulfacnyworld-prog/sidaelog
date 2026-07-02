import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import * as mdxComponents from "@/components/mdx";

const DIR = path.join(process.cwd(), "content", "texture-collector");

export function buildTextureMeta(slug: string): Metadata {
  const p = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(p)) return { title: "결 수집가" };
  const { data } = matter(fs.readFileSync(p, "utf8"));
  const title = String(data.title ?? slug);
  const description = data.quote
    ? String(data.quote)
    : data.source
      ? String(data.source)
      : "결 수집가";
  const cover = data.cover ? String(data.cover) : "/og/default.jpg";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: cover, width: 1200, height: 630 }],
    },
  };
}

export async function TextureRenderer({ slug }: { slug: string }) {
  const p = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(p)) notFound();

  const { data, content } = matter(fs.readFileSync(p, "utf8"));
  const source = data.source ? String(data.source) : "";
  const author = data.author ? String(data.author) : "";
  const category = data.category ? String(data.category) : "";
  const cover = data.cover ? String(data.cover) : undefined;

  return (
    <main className="flex min-h-screen flex-col bg-[#fdfcfa] md:flex-row">
      {/* 좌측 메타 패널 */}
      <aside className="flex shrink-0 flex-col border-b-2 border-[#16140f] px-6 py-7 md:sticky md:top-0 md:h-screen md:w-[260px] md:border-b-0 md:border-r-2">
        <Link href="/" className="text-[22px] font-extrabold tracking-[-0.05em] text-[#16140f]">
          시대<span className="logo-serif font-normal">log</span>
        </Link>
        <Link
          href="/texture-collector"
          className="mt-5 text-[11px] uppercase tracking-[0.16em] text-[#16140f]/45 transition hover:text-[#c2552e]"
        >
          ← 결 수집가
        </Link>

        <div className="mt-10 space-y-5 md:mt-auto md:pt-10">
          {category ? (
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#16140f]/35">
                결
              </div>
              <div className="mt-1 text-[13px] font-bold tracking-[-0.01em] text-[#c2552e]">
                {category}
              </div>
            </div>
          ) : null}
          {source ? (
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#16140f]/35">
                출처
              </div>
              <div className="mt-1 text-[13px] font-bold tracking-[-0.01em] text-[#16140f]">
                {source}
                {author ? (
                  <span className="font-normal text-[#16140f]/55"> · {author}</span>
                ) : null}
              </div>
            </div>
          ) : null}
          {data.date ? (
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#16140f]/35">
                Date
              </div>
              <div className="mt-1 text-[12px] tracking-[0.04em] text-[#16140f]/60">
                {String(data.date)}
              </div>
            </div>
          ) : null}
        </div>
      </aside>

      {/* 본문 */}
      <article className="flex-1 px-6 py-12 md:px-14 md:py-16">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#16140f]/35">
            Sidaelog · Texture Collector
          </div>

          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#16140f] md:text-[46px]">
            {String(data.title ?? slug)}
          </h1>

          {cover ? (
            <div className="mt-8 overflow-hidden rounded-lg border-[1.5px] border-[#16140f]">
              <Image
                src={cover}
                alt={String(data.title ?? "")}
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="prose-mag mt-10">
            <MDXRemote source={content} components={mdxComponents} />
          </div>

          <div className="mt-16 flex items-center justify-between border-t-2 border-[#16140f] pt-5 text-[10px] uppercase tracking-[0.12em] text-[#16140f]/45">
            <span>시대log · Texture Collector</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </article>
    </main>
  );
}
