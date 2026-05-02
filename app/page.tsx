import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  
  const rootArticles = articles.filter((article) => article.isRoot);
  
  const newestArticle = articles[0];
  
  const featured =
  newestArticle?.parent
    ? articles.find((article) => article.slug === newestArticle.parent)
    : newestArticle;
    
  const latest = featured
  ? articles.filter((article) => article.slug !== featured.slug)
  : articles;

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <div className="mx-auto max-w-[920px]">
        {/* Hero */}
        <header className="mb-12">
          <div className="text-[12px] tracking-[0.22em] uppercase text-black/40">
            SIDAELOG · ISSUE 001
          </div>
          
          <h1 className="logo-serif mt-3 text-[48px] leading-[1.02] tracking-[-0.05em]">
            시대로그
            </h1>

          <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.46] text-black/65">
            시대를 읽고 기록하는 디지털 매거진
          </p>

          <p className="mt-2.5 text-[10px] uppercase tracking-[0.2em] text-black/40">
            READING THE TIMES THROUGH DESIGN AND RECORDS
          </p>
        </header>

        {/* Featured */}
        {featured ? (
          <section className="mb-14">
            <div className="mb-4 text-[12px] tracking-[0.18em] uppercase text-black/45">
              Featured
            </div>

            <Link
              href={`/articles/${featured.slug}`}
              className="block rounded-2xl border border-black/10 bg-white px-6 py-6 transition hover:bg-white/70"
            >
              <div className="text-[12px] tracking-[0.14em] uppercase text-black/40">
                {featured.date}
              </div>

              <h2 className="mt-3 text-[28px] font-normal text-black/75 leading-[1.25] tracking-[-0.02em]">
                {featured.title}
              </h2>

              {featured.subtitle ? (
                <p className="mt-3 text-[15px] leading-[1.8] text-black/60">
                  {featured.subtitle}
                </p>
              ) : null}

              {featured.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {featured.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/10 px-3 py-1 text-[12px] text-black/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          </section>
        ) : null}

        {/* Latest */}
        <section className="mt-6">
          <div className="mb-4 text-[12px] tracking-[0.18em] uppercase text-black/45">
            Latest
          </div>

          <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/40">
            {latest.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="block px-5 py-5 transition hover:bg-white/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {a.parent ? (
                      <div className="mb-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.14em] text-black/35">
                        <span className="rounded-full border border-black/10 px-2 py-0.5">
                          Thread
                        </span>
                        {a.series ? (
                          <span className="rounded-full border border-black/10 px-2 py-0.5">
                            From {a.series}
                          </span>
                        ) : null}
                        <span className="rounded-full border border-black/10 px-2 py-0.5">
                          Spin-off
                        </span>
                      </div>
                    ) : null}

                    <div className="text-[17px] font-normal text-black/80 leading-[1.5] tracking-[-0.01em]">
                      {a.parent ? "↳ " : ""}
                      {a.title}
                    </div>
                  </div>

                  {a.date ? (
                    <div className="shrink-0 pt-1 text-[12px] tracking-[0.14em] uppercase text-black/45">
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
                    {a.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 px-3 py-1 text-[12px] text-black/60"
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

        {/* Threads */}
        <section className="mt-14">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <div className="text-[12px] tracking-[0.18em] uppercase text-black/45">
              Threads
            </div>

            <div className="text-[12px] text-black/35">
              원글에서 이어지는 생각들
            </div>
          </div>

          <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/40">
            {rootArticles.map((root) => {
              const children = articles.filter(
                (article) => article.parent === root.slug
              );

              return (
                <div key={root.slug} className="px-5 py-5">
                  <Link
                    href={`/articles/${root.slug}`}
                    className="block transition hover:opacity-70"
                  >
                    <div className="text-[12px] tracking-[0.14em] uppercase text-black/40">
                      {root.series || "Thread"}
                    </div>

                    <div className="mt-2 text-[17px] font-normal text-black/80 leading-[1.5] tracking-[-0.01em]">
                      {root.title}
                    </div>

                    {root.subtitle ? (
                      <div className="mt-2 text-[14px] leading-[1.8] text-black/55">
                        {root.subtitle}
                      </div>
                    ) : null}
                  </Link>

                  {children.length ? (
                    <div className="mt-4 space-y-2 border-l border-black/10 pl-4">
                      {children.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/articles/${child.slug}`}
                          className="block text-[14px] leading-[1.7] text-black/60 transition hover:text-black hover:underline hover:underline-offset-4"
                        >
                          ↳ {child.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 text-[13px] text-black/35">
                      아직 이어지는 글이 없습니다.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-black/10 pt-8 pb-10">
          <p className="max-w-[42ch] text-[15px] leading-[1.9] tracking-[-0.01em] text-black/55">
            © 2026 시대log
            <br />
            Notes on design, culture and time.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-black/40">
            <a
              href="mailto:dnjtcl@naver.com"
              className="transition hover:text-black"
            >
              Email
            </a>

            <a
              href="https://www.linkedin.com/in/혜수-김-4210602b5/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-black"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/fancifulfacnyworld-prog/sidaelog"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-black"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}