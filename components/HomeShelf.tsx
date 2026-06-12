"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

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

  const match = (tags: string[]) => !active || tags.includes(active);
  const total = groups.length + groups.reduce((n, g) => n + g.subs.length, 0) + solos.length;
  const shown =
    groups.filter((g) => match(g.allTags)).length +
    groups.reduce((n, g) => n + g.subs.filter((s) => match(normalize(s.tags))).length, 0) +
    solos.filter((s) => match(s.normTags)).length;

  const toggle = (t: string) => setActive((cur) => (cur === t ? null : t));

  return (
    <div className="flex h-screen overflow-hidden bg-[#fdfcfa]">
      {/* ─── 좌측 정보 패널 ─── */}
      <aside className="flex h-full w-[300px] shrink-0 flex-col overflow-y-auto border-r-2 border-[#16140f] px-6 py-7">
        {/* 로고 */}
        <Link href="/" className="text-[26px] font-extrabold tracking-[-0.05em] text-[#16140f]">
          시대<span className="logo-serif font-normal">log</span>
        </Link>

        {/* 소개 */}
        <p className="mt-3 text-[13px] leading-[1.6] text-[#16140f]/70">
          시대를 읽고 기록하는 매거진
        </p>
        <p className="mt-2 text-[9px] uppercase leading-[1.6] tracking-[0.18em] text-[#16140f]/35">
          Reading the times through design and records
        </p>
        <div className="mt-4 border-t border-[#16140f]/15 pt-3 text-[9px] uppercase tracking-[0.2em] text-[#16140f]/35">
          Sidaelog · Issue 001
        </div>

        {/* 검색 (장식) */}
        <div className="mt-5 flex items-center gap-2 rounded-md border-[1.5px] border-[#16140f] px-3 py-2">
          <span className="text-[13px] text-[#16140f]/60">⌕</span>
          <span className="text-[11px] text-[#16140f]/35">태그로 탐색</span>
        </div>

        {/* 태그 그룹 */}
        <div className="mt-5 flex flex-col gap-4">
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

        {/* 메뉴 */}
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[#16140f]/15 pt-4 text-[11px] font-bold">
          <Link href="/" className="text-[#16140f] hover:text-[#c2552e]">Home</Link>
          <Link href="/cases" className="text-[#16140f] hover:text-[#c2552e]">케이스</Link>
          <Link href="/kernel" className="text-[#16140f] hover:text-[#c2552e]">알맹이</Link>
          <Link href="/texture-collector" className="text-[#16140f] hover:text-[#c2552e]">결 수집가</Link>
        </div>

        {/* 링크 */}
        <div className="mt-auto flex gap-1.5 pt-6">
          <a href="mailto:dnjtcl@naver.com" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">Email</a>
          <a href="https://www.linkedin.com/in/dia21/" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">LinkedIn</a>
          <a href="https://github.com/fancifulfacnyworld-prog/sidaelog" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">GitHub</a>
        </div>
      </aside>

      {/* ─── 우측 가로 책장 ─── */}
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        {/* 상단 상태바 */}
        <div className="flex shrink-0 items-center justify-between border-b-[1.5px] border-[#16140f] px-5 py-2.5">
          <div className="text-[11px] text-[#16140f]/60">
            {active ? (
              <>
                <b className="text-[#16140f]">{active}</b> · {shown}편
              </>
            ) : (
              <>
                전체 <b className="text-[#16140f]">{total}</b>편의 글
              </>
            )}
          </div>
          {active && (
            <button
              onClick={() => setActive(null)}
              className="rounded-full border-[1.2px] border-[#16140f]/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#16140f]/60 hover:border-[#16140f] hover:text-[#16140f]"
            >
              ✕ 필터 해제
            </button>
          )}
        </div>

        {/* 책장 (가로 스크롤) */}
        <div className="shelf-scroll flex flex-1 overflow-x-auto overflow-y-hidden">
          {/* 케이스 그룹 */}
          {groups.map((g) => (
            <div
              key={g.root.slug}
              className="flex shrink-0 border-r-2 border-[#16140f] transition-opacity duration-300"
              style={{ opacity: match(g.allTags) ? 1 : 0.18 }}
            >
              {/* 루트 커버 카드 */}
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

                {/* 커버 */}
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

                {/* 발췌 */}
                {g.root.excerpt && (
                  <p className="mt-4 px-5 text-[12px] leading-[1.7] text-[#16140f]/55 line-clamp-3">
                    {g.root.excerpt}
                  </p>
                )}

                {/* 대표 태그 */}
                <div className="mt-3 mb-5 px-5">
                  <span className="inline-block rounded-full border border-[#16140f] px-3 py-1 text-[10px] font-bold text-[#16140f]">
                    {representativeTag(g.allTags)}
                  </span>
                </div>
              </Link>

              {/* 하위 글 책등 */}
              {g.subs.map((s) => {
                const on = match(normalize(s.tags));
                return (
                  <Link
                    key={s.slug}
                    href={`/articles/${s.slug}`}
                    className="flex h-full w-[40px] shrink-0 flex-col items-center border-r border-[#16140f]/15 py-5 transition hover:bg-[#16140f]/[0.03]"
                    style={{ opacity: on ? 1 : 0.18 }}
                  >
                    <span className="mb-3 text-[10px] text-[#16140f]/40">↳</span>
                    <span className="vertical-kr text-[11px] font-medium leading-[1.1] text-[#16140f]/70">
                      {s.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}

          {/* 독립 글 섹션 헤더 */}
          <div className="flex h-full w-[42px] shrink-0 items-center justify-center border-r-2 border-[#16140f] bg-[#16140f]">
            <span className="vertical-kr text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#fdfcfa]">
              Articles
            </span>
          </div>

          {/* 독립 글 책등 */}
          {solos.map((s, i) => {
            const on = match(s.normTags);
            return (
              <Link
                key={s.article.slug}
                href={`/articles/${s.article.slug}`}
                className="flex h-full w-[52px] shrink-0 flex-col items-center border-r border-[#16140f]/18 py-5 transition hover:bg-[#16140f]/[0.03]"
                style={{ opacity: on ? 1 : 0.18 }}
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
            );
          })}

          {/* 끝 여백 */}
          <div className="w-8 shrink-0" />
        </div>
      </div>
    </div>
  );
}

// 클라이언트 측 태그 정규화 (서버 normTag와 동일 규칙)
function normalize(tags: string[]): string[] {
  return Array.from(
    new Set(
      tags.map((t) => {
        const s = t.trim();
        const m = s.match(/^(감정|몰입|선택|책임|관찰|지연)\s*설계$/);
        if (m) return `${m[1]} 설계`;
        if (s === "UIUX" || s === "UI디자인") return "UI설계";
        return s;
      })
    )
  );
}

function representativeTag(tags: string[]): string {
  return tags.find((t) => /\s설계$/.test(t)) ?? tags[0] ?? "";
}
