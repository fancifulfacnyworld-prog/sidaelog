import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles(); // 최신순 정렬은 lib에서 처리하거나 여기서 해도 됨

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <div className="mx-auto max-w-[920px]">
        {/* Cover */}
        <header className="mb-10">
          <div className="text-[12px] tracking-[0.22em] uppercase text-black/40">
            SIDAELOG · ISSUE 001
          </div>
          <h1 className="mt-3 text-[48px] leading-[1.02] tracking-[-0.05em]">
            시대log
          </h1>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.85] text-black/65">
            요즘을 버티는 기록
          </p>
          <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-black/40">
          월간 내 생활
          </p>
        </header>

        {/* Index */}
        <section className="mt-6">
          <div className="mb-4 text-[12px] tracking-[0.18em] uppercase text-black/45">
            Latest
          </div>

          <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/40">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="block px-5 py-5 hover:bg-white/60 transition"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-[18px] leading-[1.35] tracking-[-0.02em]">
                    {a.title}
                  </div>
                  {a.date ? (
                    <div className="shrink-0 text-[12px] tracking-[0.14em] uppercase text-black/45">
                      {a.date}
                    </div>
                  ) : null}
                </div>

                {a.subtitle ? (
                  <div className="mt-2 text-[14px] leading-[1.8] text-black/60">
                    {a.subtitle}
                  </div>
                ) : null}

                {a.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 bg-black/0 px-3 py-1 text-[12px] text-black/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}