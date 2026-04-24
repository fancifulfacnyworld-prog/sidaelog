import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();

  const featured = articles[0];
  const latest = articles.slice(1);
  const rootArticles = articles.filter((article) => article.isRoot);

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <div className="mx-auto max-w-[920px]">
        {/* Hero */}
        <header className="mb-12">
          <div className="text-[12px] tracking-[0.22em] uppercase text-black/40">
            SIDAELOG · ISSUE 001
          </div>

          <h1 className="mt-3 text-[48px] leading-[1.02] tracking-[-0.05em]">
            시대log
          </h1>

          <p className="mt-8 max-w-[60ch] text-[15px] leading-[1.46] text-black/65">
            시대를 읽고 기록하자
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

              <h2 className="mt-3 text-[28px] leading-[1.2] tracking-[-0.03em]">
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
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-[18px] leading-[1.35] tracking-[-0.02em]">
                    {a.parent ? "↳ " : ""}
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

                    <div className="mt-2 text-[18px] leading-[1.35] tracking-[-0.02em]">
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
            시대log는 지나가는 시간을 기록합니다.
            <br />
            나다움과 결을 찾아
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-black/40">
            <a
              href="mailto:dnjtcl@naver.com"
              className="transition hover:text-black"
            >
              Email
            </a>

            <a
              href="https://www.linkedin.com/in/"
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