"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";

export function LangToggle({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  // 현재 경로에서 /en 프리픽스를 떼어낸 기본(한국어) 경로
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const enHref = base === "/" ? "/en" : `/en${base}`;

  const cls = (on: boolean) =>
    `px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] transition ${
      on
        ? "bg-[#16140f] text-[#fdfcfa]"
        : "text-[#16140f]/45 hover:text-[#16140f]"
    }`;

  return (
    <div className="flex shrink-0 items-center overflow-hidden rounded-full border-[1.3px] border-[#16140f]">
      <Link href={base} className={cls(lang === "ko")} aria-label="한국어">
        KO
      </Link>
      <Link href={enHref} className={cls(lang === "en")} aria-label="English">
        EN
      </Link>
    </div>
  );
}
