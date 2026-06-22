import Link from "next/link";
import { getDict, translateTag, type Lang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export function ArticleLayout({
  lang,
  title,
  subtitle,
  date,
  tags,
  children,
}: {
  lang: Lang;
  title: string;
  subtitle?: string;
  date?: string;
  tags?: string[];
  children: React.ReactNode;
}) {
  const dict = getDict(lang);
  const home = lang === "en" ? "/en" : "/";

  return (
    <main className="flex min-h-screen flex-col bg-[#fdfcfa] md:flex-row">
      {/* ─── 좌측 메타 패널 ─── */}
      <aside className="flex shrink-0 flex-col border-b-2 border-[#16140f] px-6 py-7 md:sticky md:top-0 md:h-screen md:w-[260px] md:border-b-0 md:border-r-2">
        <Link
          href={home}
          className="text-[22px] font-extrabold tracking-[-0.05em] text-[#16140f]"
        >
          시대<span className="logo-serif font-normal">log</span>
        </Link>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Link
            href={home}
            className="text-[11px] uppercase tracking-[0.16em] text-[#16140f]/45 transition hover:text-[#c2552e]"
          >
            {dict.article.back}
          </Link>
          <LangToggle lang={lang} />
        </div>

        <div className="mt-10 space-y-5 md:mt-auto md:pt-10">
          {subtitle ? (
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#16140f]/35">
                {dict.article.game}
              </div>
              <div className="mt-1 text-[13px] font-bold tracking-[-0.01em] text-[#16140f]">
                {subtitle}
              </div>
            </div>
          ) : null}

          {date ? (
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#16140f]/35">
                {dict.article.date}
              </div>
              <div className="mt-1 text-[12px] tracking-[0.04em] text-[#16140f]/60">
                {date}
              </div>
            </div>
          ) : null}

          {tags?.length ? (
            <div>
              <div className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#16140f]/35">
                {dict.article.tags}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#16140f]/25 px-2.5 py-1 text-[10px] text-[#16140f]/60"
                  >
                    {translateTag(t, lang)}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </aside>

      {/* ─── 우측 본문 ─── */}
      <article className="flex-1 px-6 py-12 md:px-14 md:py-16">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#16140f]/35">
            {dict.article.notes}
          </div>

          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#16140f] md:text-[46px]">
            {title}
          </h1>

          <div className="prose-mag mt-10">{children}</div>

          <div className="mt-16 flex items-center justify-between border-t-2 border-[#16140f] pt-5 text-[10px] uppercase tracking-[0.12em] text-[#16140f]/45">
            <span>{dict.article.footer}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </article>
    </main>
  );
}
