import Link from "next/link";
import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import { getDict, langPath } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";

const ITEMS = [
  { path: "/", key: "home" },
  { path: "/cases", key: "cases" },
  { path: "/kernel", key: "kernel" },
  { path: "/texture-collector", key: "texture" },
] as const;

function menuFor(lang: Lang) {
  const d = getDict(lang);
  return ITEMS.map((it) => ({
    href: langPath(lang, it.path),
    label: d.nav[it.key],
    key: it.key,
  }));
}

/* 데스크탑: 우측 영역 상단 바 — 좌측 left(상태/제목), 우측 네비 + 언어 토글 */
export function DesktopTopBar({
  left,
  active,
  lang,
}: {
  left: ReactNode;
  active: string;
  lang: Lang;
}) {
  const menu = menuFor(lang);
  return (
    <div className="hidden shrink-0 items-center justify-between border-b-[1.5px] border-[#16140f] px-5 py-2.5 md:flex">
      <div className="flex items-center gap-3">{left}</div>
      <div className="flex items-center gap-4">
        <nav className="flex gap-4 text-[12px] font-bold">
          {menu.map((m) => (
            <Link
              key={m.key}
              href={m.href}
              className={
                m.key === active
                  ? "text-[#c2552e]"
                  : "text-[#16140f] transition hover:text-[#c2552e]"
              }
            >
              {m.label}
            </Link>
          ))}
        </nav>
        <LangToggle lang={lang} />
      </div>
    </div>
  );
}

/* 모바일: 하단 고정 바 — 네비 + center(글 개수) + 언어 토글, safe-area 대응 */
export function MobileBottomNav({
  active,
  center,
  lang,
}: {
  active: string;
  center?: ReactNode;
  lang: Lang;
}) {
  const menu = menuFor(lang);
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#16140f] bg-[#fdfcfa] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex gap-3 text-[12px] font-bold">
          {menu.map((m) => (
            <Link
              key={m.key}
              href={m.href}
              className={
                m.key === active ? "text-[#c2552e]" : "text-[#16140f]"
              }
            >
              {m.label}
            </Link>
          ))}
        </div>
        <LangToggle lang={lang} />
      </div>
      {center ? (
        <div className="border-t border-[#16140f]/10 px-4 py-1.5 text-center text-[10px] text-[#16140f]/55">
          {center}
        </div>
      ) : null}
    </nav>
  );
}
