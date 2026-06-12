import Link from "next/link";

const MENU = [
  { href: "/", label: "Home", key: "home" },
  { href: "/cases", label: "케이스", key: "cases" },
  { href: "/kernel", label: "알맹이", key: "kernel" },
  { href: "/texture-collector", label: "결 수집가", key: "texture" },
];

export function SidePanel({ active }: { active?: string }) {
  return (
    <aside className="flex shrink-0 flex-col border-b-2 border-[#16140f] px-6 py-7 md:sticky md:top-0 md:h-screen md:w-[260px] md:border-b-0 md:border-r-2">
      {/* 로고 */}
      <Link
        href="/"
        className="text-[22px] font-extrabold tracking-[-0.05em] text-[#16140f]"
      >
        시대<span className="logo-serif font-normal">log</span>
      </Link>

      <p className="mt-3 text-[12px] leading-[1.6] text-[#16140f]/60">
        시대를 읽고 기록하는 매거진
      </p>
      <div className="mt-4 border-t border-[#16140f]/15 pt-3 text-[9px] uppercase tracking-[0.2em] text-[#16140f]/35">
        Sidaelog · Issue 001
      </div>

      {/* 메뉴 */}
      <nav className="mt-7 flex flex-col gap-2.5">
        {MENU.map((m) => (
          <Link
            key={m.key}
            href={m.href}
            className={`text-[14px] font-bold tracking-[-0.01em] transition ${
              active === m.key
                ? "text-[#c2552e]"
                : "text-[#16140f] hover:text-[#c2552e]"
            }`}
          >
            {active === m.key ? "→ " : ""}
            {m.label}
          </Link>
        ))}
      </nav>

      {/* 링크 */}
      <div className="mt-auto flex gap-1.5 pt-8">
        <a
          href="mailto:dnjtcl@naver.com"
          className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/dia21/"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/fancifulfacnyworld-prog/sidaelog"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]"
        >
          GitHub
        </a>
      </div>
    </aside>
  );
}
