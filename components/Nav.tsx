import Link from "next/link";
import type { ReactNode } from "react";

export const MENU = [
  { href: "/", label: "Home", key: "home" },
  { href: "/cases", label: "케이스", key: "cases" },
  { href: "/kernel", label: "알맹이", key: "kernel" },
  { href: "/texture-collector", label: "결 수집가", key: "texture" },
];

/* 데스크탑: 우측 영역 상단 바 — 좌측 left(상태/제목), 우측 네비 (위치 고정) */
export function DesktopTopBar({
  left,
  active,
}: {
  left: ReactNode;
  active: string;
}) {
  return (
    <div className="hidden shrink-0 items-center justify-between border-b-[1.5px] border-[#16140f] px-5 py-2.5 md:flex">
      <div className="flex items-center gap-3">{left}</div>
      <nav className="flex gap-4 text-[12px] font-bold">
        {MENU.map((m) => (
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
    </div>
  );
}

/* 모바일: 하단 고정 바 — 네비 + center(글 개수 등), 아이폰 safe-area 대응 */
export function MobileBottomNav({
  active,
  center,
}: {
  active: string;
  center?: ReactNode;
}) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[#16140f] bg-[#fdfcfa] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex gap-3.5 text-[13px] font-bold">
          {MENU.map((m) => (
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
        {center ? (
          <span className="shrink-0 text-[10px] text-[#16140f]/55">
            {center}
          </span>
        ) : null}
      </div>
    </nav>
  );
}
