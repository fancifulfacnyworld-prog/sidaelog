import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();

  const rootArticles = articles.filter((article) => article.isRoot);

  const featured = rootArticles
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  const latest = articles.filter(
    (article) => !featured.some((item) => item.slug === article.slug)
  );

  const designTags = [
  {
    name: "감정 설계",
    description: "플레이어가 무엇을 느끼도록 설계됐는가",
    games: ["붕괴: 스타레일"],
    href: "/tags/emotion-design",
  },
  {
    name: "몰입 설계",
    description: "플레이어는 언제 게임에 빠져드는가",
    games: ["Alan Wake 2"],
    href: "/tags/immersion-design",
  },
  {
    name: "책임 설계",
    description: "플레이어는 언제 자신의 선택을 후회하는가",
    games: ["Dark Souls"],
    href: "/tags/responsibility-design",
  },
  {
    name: "선택 설계",
    description: "선택은 언제 의미를 가지는가",
    games: ["Baldur’s Gate 3"],
    href: "/tags/choice-design",
  },
  {
    name: "관찰 설계",
    description: "플레이어는 언제 스스로 답을 찾는가",
    games: ["오브라딘호의 귀환"],
    href: "/tags/observation-design",
  },
];

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-1">
      <div className="mx-auto max-w-[920px]">
        {/* Hero */}
        <header className="mb-12">
          <div className="flex w-full items-center justify-between">
            <div className="text-[15px] leading-[1.46] text-black/65">
            시대를 읽고 기록하는 매거진
            </div>
          <div className="text-[12px] tracking-[0.22em] uppercase text-black/40">
          SIDAELOG · ISSUE 001
          </div>
          </div>

          <p className="mt-2.5 text-[10px] uppercase tracking-[0.2em] text-black/40">
            READING THE TIMES THROUGH DESIGN AND RECORDS
          </p>
        </header>

        {/* Featured */}
        <section className="mb-14">
          <div className="mb-4 text-[12px] tracking-[0.18em] uppercase text-black/45">
            Featured Case
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((item, index) => (
              <Link
                key={item.slug}
                href={`/articles/${item.slug}`}
                className="block rounded-2xl border border-black/10 bg-white px-6 py-6 transition hover:bg-white/70"
              >
                <div className="text-[12px] tracking-[0.14em] uppercase text-black/40">
                  Case {String(index + 1).padStart(2, "0")}
                </div>

                <h2 className="mt-3 text-[24px] font-normal leading-[1.25] tracking-[-0.02em] text-black/85">
                  {item.title}
                </h2>

                {item.subtitle ? (
                  <p className="mt-3 text-[14px] leading-[1.8] text-black/60">
                    {item.subtitle}
                  </p>
                ) : null}

                {item.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 2).map((tag) => (
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
            ))}
          </div>
        </section>

        {/* Latest */}
        <section className="mt-6">
          <div className="mb-4 text-[12px] tracking-[0.18em] uppercase text-black/45">
            Latest
          </div>

          <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/40">
            {latest.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block px-5 py-5 transition hover:bg-white/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {article.parent ? (
                      <div className="mb-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.14em] text-black/35">
                        <span className="rounded-full border border-black/10 px-2 py-0.5">
                          Thought
                        </span>

                        {article.series ? (
                          <span className="rounded-full border border-black/10 px-2 py-0.5">
                            From {article.series}
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="text-[17px] font-normal leading-[1.5] tracking-[-0.01em] text-black/80">
                      {article.parent ? "↳ " : ""}
                      {article.title}
                    </div>
                  </div>

                  {article.date ? (
                    <div className="shrink-0 pt-1 text-[12px] tracking-[0.14em] uppercase text-black/45">
                      {article.date}
                    </div>
                  ) : null}
                </div>

                {article.subtitle ? (
                  <div className="mt-2 text-[14px] leading-[1.8] text-black/60">
                    {article.subtitle}
                  </div>
                ) : null}

                {article.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 px-3 py-1 text-[12px] text-black/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        </section>

<section className="mt-14 w-full overflow-hidden">
  <div className="mb-4 text-[12px] tracking-[0.18em] uppercase text-black/45">
    Design Tags
  </div>

  <div className="relative w-full max-w-full overflow-hidden">
    <div className="w-full max-w-full overflow-x-auto overscroll-x-contain pb-3">
      <div className="flex min-w-max gap-4">
        {designTags.map((tag) => (
          <div
            key={tag.name}
            className="w-[260px] shrink-0 rounded-2xl border border-black/10 bg-white/40 px-5 py-5"
          >
            <div className="text-[18px] leading-[1.4] tracking-[-0.02em] text-black/85">
              {tag.name}
            </div>

            <p className="mt-3 text-[14px] leading-[1.8] text-black/60">
              {tag.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tag.games.map((game) => (
                <span
                  key={game}
                  className="rounded-full border border-black/10 px-3 py-1 text-[12px] text-black/55"
                >
                  {game}
                </span>
              ))}
            </div>

            <Link
              href={tag.href}
              className="mt-5 inline-block text-[12px] uppercase tracking-[0.14em] text-black/45 transition hover:text-black"
            >
              모두보기 →
            </Link>
          </div>
        ))}
      </div>
    </div>

    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f6f6f4] to-transparent" />
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
              href="https://www.linkedin.com/in/dia21/"
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