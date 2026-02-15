import Link from "next/link";

export function ArticleLayout({
  title,
  subtitle,
  date,
  tags,
  children,
}: {
  title: string;
  subtitle?: string;
  date?: string;
  tags?: string[];
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <article className="mx-auto max-w-[760px]">
        {/* Top nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-block text-[12px] tracking-[0.18em] uppercase text-black/45 hover:text-black hover:underline hover:underline-offset-4"
          >
            ← Index
          </Link>

          <div className="text-[12px] tracking-[0.18em] uppercase text-black/35">
            SIDAELOG
          </div>
        </div>

        {/* Meta */}
        {date ? (
          <div className="text-[12px] tracking-[0.14em] uppercase text-black/50">
            {date}
          </div>
        ) : null}

        {/* Title */}
        <h1 className="mt-3 text-[38px] leading-[1.08] tracking-[-0.04em]">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle ? (
          <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.8] text-black/65">
            {subtitle}
          </p>
        ) : null}

        {/* Tags */}
        {tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/10 bg-white/40 px-3 py-1 text-[12px] text-black/65"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-black/10" />

        {/* Body */}
        <div className="mt-9 text-[16.5px] leading-[1.9] tracking-[-0.01em] text-black/90">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-14 h-px w-full bg-black/10" />
        <footer className="mt-6 flex items-center justify-between text-[12px] tracking-[0.12em] uppercase text-black/45">
          <span>시대로그 · Director Notes</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </article>
    </main>
  );
}