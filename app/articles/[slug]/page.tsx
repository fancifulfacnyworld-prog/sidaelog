import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <div className="mx-auto max-w-[720px]">
        <div className="text-[12px] tracking-[0.12em] uppercase text-black/50">
          SIDAELOG · Issue 001
        </div>

        <h1 className="mt-3 text-4xl tracking-[-0.03em]">시대로그</h1>
        <p className="mt-3 text-black/60">
          Director Notes · 게임 UI 해부와 시대의 기록
        </p>

        <div className="mt-8 h-px bg-black/10" />

        <ul className="mt-8 space-y-6">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/articles/${a.slug}`}
                className="group block"
              >
                <div className="text-[12px] tracking-[0.12em] uppercase text-black/45">
                  {a.date}
                </div>
                <div className="mt-2 text-[20px] leading-[1.25] tracking-[-0.02em]">
                  <span className="group-hover:underline group-hover:underline-offset-4">
                    {a.title}
                  </span>
                </div>
                {a.subtitle ? (
                  <div className="mt-2 text-[14px] leading-[1.6] text-black/60">
                    {a.subtitle}
                  </div>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}