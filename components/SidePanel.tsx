import Link from "next/link";

const LINKS = (
  <>
    <a href="mailto:dnjtcl@naver.com" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">Email</a>
    <a href="https://www.linkedin.com/in/dia21/" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">LinkedIn</a>
    <a href="https://github.com/fancifulfacnyworld-prog/sidaelog" target="_blank" rel="noreferrer" className="rounded-full bg-[#16140f] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#fdfcfa]">GitHub</a>
  </>
);

export function SidePanel() {
  return (
    <>
      {/* 데스크탑: 좌측 고정 패널 */}
      <aside className="hidden shrink-0 flex-col border-r-2 border-[#16140f] px-6 py-7 md:sticky md:top-0 md:flex md:h-screen md:w-[260px]">
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

        <div className="mt-auto flex gap-1.5 pt-8">{LINKS}</div>
      </aside>

      {/* 모바일: 상단 헤더 (로고만, 간결하게) */}
      <header className="flex shrink-0 items-center justify-between border-b-2 border-[#16140f] px-4 py-3 md:hidden">
        <Link href="/" className="text-[20px] font-extrabold tracking-[-0.05em] text-[#16140f]">
          시대<span className="logo-serif font-normal">log</span>
        </Link>
        <span className="text-[9px] uppercase tracking-[0.18em] text-[#16140f]/35">
          Issue 001
        </span>
      </header>
    </>
  );
}
