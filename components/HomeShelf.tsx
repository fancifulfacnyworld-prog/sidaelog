"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { getDict, type Lang } from "@/lib/i18n";
import { DesktopTopBar, MobileBottomNav } from "@/components/Nav";

export type CaseGroup = {
  root: ArticleMeta;
  subs: ArticleMeta[];
  allTags: string[];
  index: number;
};

export type SoloItem = {
  article: ArticleMeta;
  normTags: string[];
};

export type TagGroup = {
  key: "lens" | "approach";
  tags: string[];
};

const SOLO_COLORS = [
  "#c4a06a",
  "#7a8a5c",
  "#9a5c5c",
  "#c2552e",
  "#6b7a9a",
  "#8a7a9a",
];

export function HomeShelf({
  groups,
  solos,
  tagGroups,
  lang,
}: {
  groups: CaseGroup[];
  solos: SoloItem[];
  tagGroups: TagGroup[];
  lang: Lang;
}) {
  const dict = getDict(lang);
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false); // 모바일: 태그 펼침 여부
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  // 마우스 휠 → 가로 스크롤 (데스크탑만)
  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const q = query.trim().toLowerCase();
  const tagOk = (tags: string[]) => !active || tags.includes(active);
  const textOk = (parts: (string | undefined)[]) =>
    !q || parts.some((p) => (p ?? "").toLowerCase().includes(q));

  const groupVisible = (g: CaseGroup) =>
    tagOk(g.allTags) &&
    textOk([g.root.title, g.root.subtitle, ...g.subs.map((s) => s.title), ...g.allTags]);
  const soloVisible = (s: SoloItem) =>
    tagOk(s.normTags) && textOk([s.article.title, s.article.subtitle, ...s.normTags]);

  const total =
    groups.length + groups.reduce((n, g) => n + g.subs.length, 0) + solos.length;
  const filtering = !!active || !!q;
  const shown =
    groups.filter(groupVisible).reduce((n, g) => n + 1 + g.subs.length, 0) +
    solos.filter(soloVisible).length;

  const tagLabel = (key: string) => dict.tags[key]?.label ?? key;
  const repLabel = (tags: string[]) => tagLabel(representativeTag(tags));

  const toggle = (t: string) => setActive((cur) => (cur === t ? null : t));
  const clear = () => {
    setActive(null);
    setQuery("");
  };

  const statusText = filtering
    ? dict.filteredLabel(active ? tagLabel(active) : `"${query}"`, shown)
    : dict.totalLabel(total);

  // 태그 그룹 (데스크탑 패널 + 모바일 검색 펼침 공용)
  const tagBlock = (
    <div className="flex flex-col gap-3.5">
      {tagGroups.map((tg) => (
        <div key={tg.key}>
          <div className="mb-2 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#16140f]/40">
            <span className="text-[#c2552e]">›</span>
            {tg.key === "lens" ? dict.lens : dict.approach}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tg.tags.map((t) => (
              <button
                key={t}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHoveredTag(t)}
                onMouseLeave={() => setHoveredTag(null)}
                onClick={() => toggle(t)}
                className={`rounded-full border-[1.3px] px-2.5 py-[3px] text-[10px] font-medium transition ${
                  active === t
                    ? "border-[#16140f] bg-[#16140f] text-[#fdfcfa]"
                    : "border-[#16140f]/30 text-[#16140f]/70 hover:border-[#16140f] hover:text-[#16140f]"
                }`}
              >
                {tagLabel(t)}
              </button>
            ))}
          </div>

          {/* 설계(Lens) 태그 설명 — 설계 그룹 바로 아래 */}
          {tg.key === "lens" && (
            <div className="mt-3 min-h-[2.6rem] rounded-md border border-[#16140f]/15 bg-[#16140f]/[0.02] px-3 py-2 text-[10px] leading-[1.5]">
              {(() => {
                const t = hoveredTag ?? active;
                const d = t ? dict.tags[t]?.desc : "";
                return d ? (
                  <span className="text-[#16140f]/70">
                    <b className="font-bold text-[#16140f]">{tagLabel(t!)}</b> — {d}
                  </span>
                ) : (
                  <span className="text-[#16140f]/35">{dict.tagHint}</span>
                );
              })()}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const searchInput = (idSuffix: string) => (
    <div className="flex items-center gap-2 rounded-md border-[1.5px] border-[#16140f] px-3 py-2">
      <span className="text-[13px] text-[#16140f]/60">⌕</span>
      <input
        id={`search-${idSuffix}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setSearchOpen(true)}
        onBlur={() => setSearchOpen(false)}
        placeholder={dict.searchPlaceholder}
        className="w-full bg-transparent text-[16px] text-[#16140f] outline-none placeholder:text-[#16140f]/35 md:text-[12px]"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="text-[12px] text-[#16140f]/45 hover:text-[#16140f]"
          aria-label="clear"
        >
          ✕
        </button>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfa] md:h-screen md:flex-row md:overflow-hidden">
      {/* ═══ 데스크탑 좌측 패널 ═══ */}
      <aside className="hidden shrink-0 flex-col overflow-y-auto border-r-2 border-[#16140f] px-6 py-7 md:sticky md:top-0 md:flex md:h-screen md:w-[300px]">
        <Link href={lang === "en" ? "/en" : "/"} className="text-[24px] font-extrabold tracking-[-0.05em] text-[#16140f]">
          시대<span className="logo-serif font-normal">log</span>
        </Link>
        <p className="mt-2.5 text-[12px] leading-[1.6] text-[#16140f]/65">{dict.brandTagline}</p>
        <p className="mt-1.5 text-[9px] uppercase leading-[1.6] tracking-[0.18em] text-[#16140f]/35">
          {dict.brandEyebrow}
        </p>
        <div className="mt-3 border-t border-[#16140f]/15 pt-3 text-[9px] uppercase tracking-[0.2em] text-[#16140f]/35">
          {dict.issue}
        </div>
        <div className="mt-4">{searchInput("desk")}</div>
        <div className="mt-4">{tagBlock}</div>
        <div className="mt-auto flex gap-1.5 pt-6">
          <a href="mailto:dnjtcl@naver.com" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">Email</a>
          <a href="https://www.linkedin.com/in/dia21/" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">LinkedIn</a>
          <a href="https://github.com/fancifulfacnyworld-prog/sidaelog" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">GitHub</a>
        </div>
      </aside>

      {/* ═══ 모바일 상단 헤더 ═══ */}
      <header className="shrink-0 border-b-2 border-[#16140f] px-4 py-3 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href={lang === "en" ? "/en" : "/"} className="shrink-0 text-[20px] font-extrabold tracking-[-0.05em] text-[#16140f]">
            시대<span className="logo-serif font-normal">log</span>
          </Link>
          <div className="flex-1">{searchInput("mob")}</div>
        </div>
        {(searchOpen || query) && (
          <div className="mt-3 border-t border-[#16140f]/12 pt-3">{tagBlock}</div>
        )}
      </header>

      {/* ═══ 우측 영역 ═══ */}
      <div className="flex flex-1 flex-col md:overflow-hidden">
        <DesktopTopBar
          active="home"
          lang={lang}
          left={
            <>
              <span className="text-[11px] text-[#16140f]/60">{statusText}</span>
              {filtering && (
                <button
                  onClick={clear}
                  className="rounded-full border-[1.2px] border-[#16140f]/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#16140f]/60 hover:border-[#16140f] hover:text-[#16140f]"
                >
                  {dict.clear}
                </button>
              )}
            </>
          }
        />

        {/* ─── 데스크탑: 가로 책장 ─── */}
        <div
          ref={shelfRef}
          className="shelf-scroll hidden flex-1 overflow-x-auto overflow-y-hidden md:flex"
        >
          {groups.map((g) => (
            <div
              key={g.root.slug}
              className="flex shrink-0 border-r-2 border-[#16140f] transition-opacity duration-300"
              style={{ opacity: groupVisible(g) ? 1 : 0.18 }}
            >
              <div className="flex h-full w-[290px] shrink-0 flex-col overflow-hidden border-r border-[#16140f]/20">
                <Link
                  href={`${lang === "en" ? "/en" : ""}/articles/${g.root.slug}`}
                  className="group flex min-h-0 flex-1 flex-col"
                >
                  <div className="flex items-baseline gap-2 px-5 pt-5">
                    <span className="text-[34px] font-extrabold leading-none tracking-[-0.04em] text-[#16140f]">
                      {String(g.index).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#16140f]/45">
                      {g.root.subtitle}
                    </span>
                  </div>
                  <h2 className="mt-3 px-5 text-[23px] font-bold leading-[1.18] tracking-[-0.04em] text-[#16140f]">
                    {g.root.title}
                  </h2>
                  <div className="relative mx-5 mt-4 min-h-0 flex-1 overflow-hidden border-[1.5px] border-[#16140f]">
                    {g.root.cover && (
                      <Image
                        src={g.root.cover}
                        alt={g.root.title}
                        fill
                        sizes="290px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  {g.root.excerpt && (
                    <p className="mt-4 px-5 text-[12px] leading-[1.7] text-[#16140f]/55 line-clamp-2">
                      {g.root.excerpt}
                    </p>
                  )}
                  <div className="mt-3 mb-4 px-5">
                    <span className="inline-block rounded-full border border-[#16140f] px-3 py-1 text-[10px] font-bold text-[#16140f]">
                      {repLabel(g.allTags)}
                    </span>
                  </div>
                </Link>

                {/* 영어판: 이어지는 글을 카드 안 가로 링크로 */}
                {lang === "en" && g.subs.length > 0 && (
                  <div className="shrink-0 border-t-2 border-[#16140f]">
                    {g.subs.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/en/articles/${s.slug}`}
                        className="flex items-center gap-1.5 border-b border-[#16140f]/10 px-5 py-2 text-[11px] leading-tight text-[#16140f]/70 transition last:border-b-0 hover:bg-[#16140f]/[0.03] hover:text-[#c2552e]"
                      >
                        <span className="shrink-0 text-[#16140f]/35">↳</span>
                        <span className="line-clamp-1">{s.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 한글판: 이어지는 글을 세로 책등으로 */}
              {lang !== "en" &&
                g.subs.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/articles/${s.slug}`}
                    className="flex h-full w-[40px] shrink-0 flex-col items-center border-r border-[#16140f]/15 py-5 transition hover:bg-[#16140f]/[0.03]"
                  >
                    <span className="mb-3 text-[10px] text-[#16140f]/40">↳</span>
                    <span className="vertical-kr text-[11px] font-medium leading-[1.1] text-[#16140f]/70">
                      {s.title}
                    </span>
                  </Link>
                ))}
            </div>
          ))}

          <div className="flex h-full w-[42px] shrink-0 items-center justify-center border-r-2 border-[#16140f] bg-[#16140f]">
            <span className="vertical-kr text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#fdfcfa]">
              {dict.articles}
            </span>
          </div>

          {solos.map((s, i) => (
            <Link
              key={s.article.slug}
              href={`${lang === "en" ? "/en" : ""}/articles/${s.article.slug}`}
              className="flex h-full w-[52px] shrink-0 flex-col items-center border-r border-[#16140f]/18 py-5 transition hover:bg-[#16140f]/[0.03]"
              style={{ opacity: soloVisible(s) ? 1 : 0.18 }}
            >
              <span
                className="mb-4 h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-[#16140f]"
                style={{ background: SOLO_COLORS[i % SOLO_COLORS.length] }}
              />
              <span className="vertical-kr text-[12px] font-bold leading-[1.12] text-[#16140f]">
                {s.article.title}
              </span>
              <span className="vertical-kr mt-3 text-[8px] uppercase tracking-[0.05em] text-[#16140f]/40">
                {repLabel(s.normTags)}
              </span>
            </Link>
          ))}
          <div className="w-8 shrink-0" />
        </div>

        {/* ─── 모바일: 세로 카드 ─── */}
        <div className="flex flex-col gap-4 px-4 pb-28 pt-4 md:hidden">
          {groups.filter(groupVisible).map((g) => (
            <div
              key={g.root.slug}
              className="overflow-hidden rounded-lg border-[1.5px] border-[#16140f]"
            >
              <Link href={`${lang === "en" ? "/en" : ""}/articles/${g.root.slug}`} className="block">
                <div className="relative aspect-[16/10] border-b-[1.5px] border-[#16140f]">
                  {g.root.cover && (
                    <Image src={g.root.cover} alt={g.root.title} fill sizes="100vw" className="object-cover" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-[#16140f] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#fdfcfa]">
                    Case {String(g.index).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#16140f]/45">
                    {g.root.subtitle}
                  </div>
                  <h2 className="mt-1 text-[20px] font-bold leading-[1.2] tracking-[-0.03em] text-[#16140f]">
                    {g.root.title}
                  </h2>
                  {g.root.excerpt && (
                    <p className="mt-2 text-[13px] leading-[1.7] text-[#16140f]/55 line-clamp-2">
                      {g.root.excerpt}
                    </p>
                  )}
                </div>
              </Link>
              {g.subs.length > 0 && (
                <div className="border-t border-[#16140f]/12">
                  {g.subs.map((s) => (
                    <Link
                      key={s.slug}
                      href={`${lang === "en" ? "/en" : ""}/articles/${s.slug}`}
                      className="flex items-center gap-2 border-b border-[#16140f]/8 px-4 py-2.5 text-[13px] text-[#16140f]/70 last:border-b-0"
                    >
                      <span className="text-[#16140f]/35">↳</span>
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {solos.filter(soloVisible).map((s, i) => (
            <Link
              key={s.article.slug}
              href={`${lang === "en" ? "/en" : ""}/articles/${s.article.slug}`}
              className="flex items-center justify-between gap-3 rounded-lg border-[1.5px] border-[#16140f] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-[#16140f]"
                  style={{ background: SOLO_COLORS[i % SOLO_COLORS.length] }}
                />
                <span className="text-[15px] font-bold tracking-[-0.02em] text-[#16140f]">
                  {s.article.title}
                </span>
              </div>
              <span className="shrink-0 text-[10px] uppercase tracking-[0.05em] text-[#16140f]/40">
                {repLabel(s.normTags)}
              </span>
            </Link>
          ))}

          {shown === 0 && (
            <div className="py-10 text-center text-[13px] text-[#16140f]/45">
              {dict.empty}
            </div>
          )}
        </div>
      </div>

      {/* ═══ 모바일 하단 고정 네비 ═══ */}
      <MobileBottomNav active="home" lang={lang} center={statusText} />
    </div>
  );
}

function representativeTag(tags: string[]): string {
  return tags.find((t) => /\s설계$/.test(t)) ?? tags[0] ?? "";
}
