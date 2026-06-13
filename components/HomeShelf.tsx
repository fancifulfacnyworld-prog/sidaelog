"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
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
  label: string;
  en: string;
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
}: {
  groups: CaseGroup[];
  solos: SoloItem[];
  tagGroups: TagGroup[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false); // 모바일: 태그 펼침 여부
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

  const toggle = (t: string) => setActive((cur) => (cur === t ? null : t));
  const clear = () => {
    setActive(null);
    setQuery("");
  };

  const statusText = filtering ? (
    <>
      <b className="text-[#16140f]">{active ?? `"${query}"`}</b> · {shown}편
    </>
  ) : (
    <>
      전체 <b className="text-[#16140f]">{total}</b>편의 글
    </>
  );

  // 태그 그룹 (데스크탑 패널 + 모바일 검색 펼침 공용)
  const tagBlock = (
    <div className="flex flex-col gap-3.5">
      {tagGroups.map((tg) => (
        <div key={tg.en}>
          <div className="mb-2 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#16140f]/40">
            <span className="text-[#c2552e]">›</span>
            {tg.label} · {tg.en}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tg.tags.map((t) => (
              <button
                key={t}
                onMouseDown={(e) => e.preventDefault()} // 모바일: 검색 input blur 방지
                onClick={() => toggle(t)}
                className={`rounded-full border-[1.3px] px-2.5 py-[3px] text-[10px] font-medium transition ${
                  active === t
                    ? "border-[#16140f] bg-[#16140f] text-[#fdfcfa]"
                    : "border-[#16140f]/30 text-[#16140f]/70 hover:border-[#16140f] hover:text-[#16140f]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
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
        placeholder="제목·게임·태그 검색"
        className="w-full bg-transparent text-[12px] text-[#16140f] outline-none placeholder:text-[#16140f]/35"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="text-[12px] text-[#16140f]/45 hover:text-[#16140f]"
          aria-label="검색어 지우기"
        >
          ✕
        </button>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfa] md:h-screen md:flex-row md:overflow-hidden">
      {/* ═══ 데스크탑 좌측 패널 (고정) ═══ */}
      <aside className="hidden shrink-0 flex-col overflow-y-auto border-r-2 border-[#16140f] px-6 py-7 md:sticky md:top-0 md:flex md:h-screen md:w-[300px]">
        <Link href="/" className="text-[24px] font-extrabold tracking-[-0.05em] text-[#16140f]">
          시대<span className="logo-serif font-normal">log</span>
        </Link>
        <p className="mt-2.5 text-[12px] leading-[1.6] text-[#16140f]/65">
          시대를 읽고 기록하는 매거진
        </p>
        <p className="mt-1.5 text-[9px] uppercase leading-[1.6] tracking-[0.18em] text-[#16140f]/35">
          Reading the times through design and records
        </p>
        <div className="mt-3 border-t border-[#16140f]/15 pt-3 text-[9px] uppercase tracking-[0.2em] text-[#16140f]/35">
          Sidaelog · Issue 001
        </div>
        <div className="mt-4">{searchInput("desk")}</div>
        <div className="mt-4">{tagBlock}</div>
        <div className="mt-auto flex gap-1.5 pt-6">
          <a href="mailto:dnjtcl@naver.com" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">Email</a>
          <a href="https://www.linkedin.com/in/dia21/" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">LinkedIn</a>
          <a href="https://github.com/fancifulfacnyworld-prog/sidaelog" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">GitHub</a>
        </div>
      </aside>

      {/* ═══ 모바일 상단 헤더 (간결: 로고 + 검색) ═══ */}
      <header className="shrink-0 border-b-2 border-[#16140f] px-4 py-3 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0 text-[20px] font-extrabold tracking-[-0.05em] text-[#16140f]">
            시대<span className="logo-serif font-normal">log</span>
          </Link>
          <div className="flex-1">{searchInput("mob")}</div>
        </div>
        {/* 검색 활성 시에만 태그 표시 */}
        {(searchOpen || query) && (
          <div className="mt-3 border-t border-[#16140f]/12 pt-3">{tagBlock}</div>
        )}
      </header>

      {/* ═══ 우측 영역 ═══ */}
      <div className="flex flex-1 flex-col md:overflow-hidden">
        {/* 데스크탑 상단바: 상태(좌) + 네비(우) — 위치 고정 */}
        <DesktopTopBar
          active="home"
          left={
            <>
              <span className="text-[11px] text-[#16140f]/60">{statusText}</span>
              {filtering && (
                <button
                  onClick={clear}
                  className="rounded-full border-[1.2px] border-[#16140f]/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#16140f]/60 hover:border-[#16140f] hover:text-[#16140f]"
                >
                  ✕ 해제
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
              <Link
                href={`/articles/${g.root.slug}`}
                className="group flex h-full w-[290px] shrink-0 flex-col border-r border-[#16140f]/20"
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
                <div className="relative mx-5 mt-4 flex-1 overflow-hidden border-[1.5px] border-[#16140f]">
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
                  <p className="mt-4 px-5 text-[12px] leading-[1.7] text-[#16140f]/55 line-clamp-3">
                    {g.root.excerpt}
                  </p>
                )}
                <div className="mt-3 mb-5 px-5">
                  <span className="inline-block rounded-full border border-[#16140f] px-3 py-1 text-[10px] font-bold text-[#16140f]">
                    {representativeTag(g.allTags)}
                  </span>
                </div>
              </Link>

              {g.subs.map((s) => (
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
              Articles
            </span>
          </div>

          {solos.map((s, i) => (
            <Link
              key={s.article.slug}
              href={`/articles/${s.article.slug}`}
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
                {representativeTag(s.normTags)}
              </span>
            </Link>
          ))}
          <div className="w-8 shrink-0" />
        </div>

        {/* ─── 모바일: 세로 카드 (하단 고정 네비 공간 확보 pb) ─── */}
        <div className="flex flex-col gap-4 px-4 pb-24 pt-4 md:hidden">
          {groups.filter(groupVisible).map((g) => (
            <div
              key={g.root.slug}
              className="overflow-hidden rounded-lg border-[1.5px] border-[#16140f]"
            >
              <Link href={`/articles/${g.root.slug}`} className="block">
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
                      href={`/articles/${s.slug}`}
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
              href={`/articles/${s.article.slug}`}
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
                {representativeTag(s.normTags)}
              </span>
            </Link>
          ))}

          {shown === 0 && (
            <div className="py-10 text-center text-[13px] text-[#16140f]/45">
              조건에 맞는 글이 없어요.
            </div>
          )}
        </div>
      </div>

      {/* ═══ 모바일 하단 고정 네비 (네비 + 글 개수, safe-area) ═══ */}
      <MobileBottomNav active="home" center={statusText} />
    </div>
  );
}

function representativeTag(tags: string[]): string {
  return tags.find((t) => /\s설계$/.test(t)) ?? tags[0] ?? "";
}
