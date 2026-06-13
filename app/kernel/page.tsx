import Link from "next/link";
import { SidePanel } from "@/components/SidePanel";
import { DesktopTopBar, MobileBottomNav } from "@/components/Nav";
import { getAllKernelArticles } from "@/lib/kernel";

export default function KernelPage() {
  const kernelArticles = getAllKernelArticles();

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfa] md:h-screen md:flex-row md:overflow-hidden">
      <SidePanel />

      <div className="flex flex-1 flex-col md:overflow-hidden">
        <DesktopTopBar
          active="kernel"
          left={
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#16140f]">
              Kernel · 알맹이
            </span>
          }
        />

        <main className="flex-1 px-6 py-10 pb-24 md:overflow-y-auto md:px-14 md:py-12 md:pb-12">
          <div className="mx-auto max-w-[760px]">
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#16140f] md:text-[44px]">
              알맹이
            </h1>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#16140f]/55">
              흐르는 디자인의 알맹이를 찾아서 — 짧지만 핵심만 남긴 생각들.
            </p>

            <div className="mt-10 border-t-2 border-[#16140f]">
              {kernelArticles.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/kernel/${article.slug}`}
                  className="group flex items-baseline gap-4 border-b border-[#16140f]/10 py-5 transition hover:pl-2"
                >
                  <span className="w-7 shrink-0 text-[11px] font-bold text-[#16140f]/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="text-[19px] font-bold leading-[1.3] tracking-[-0.02em] text-[#16140f] transition group-hover:text-[#c2552e]">
                      {article.title}
                    </div>
                    {article.subtitle && (
                      <div className="mt-1.5 text-[13px] leading-[1.7] text-[#16140f]/55">
                        {article.subtitle}
                      </div>
                    )}
                  </div>

                  <span className="shrink-0 text-[11px] tracking-[0.06em] text-[#16140f]/35">
                    {article.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav active="kernel" />
    </div>
  );
}
