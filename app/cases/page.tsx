import Link from "next/link";
import Image from "next/image";
import { SidePanel } from "@/components/SidePanel";
import { DesktopTopBar, MobileBottomNav } from "@/components/Nav";
import { getAllArticles } from "@/lib/articles";

export default function CasesPage() {
  const articles = getAllArticles();

  const cases = articles
    .filter((a) => a.isRoot)
    .sort((a, b) => b.date.localeCompare(a.date));

  const subCount = (slug: string) =>
    articles.filter((a) => a.parent === slug).length;

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfa] md:h-screen md:flex-row md:overflow-hidden">
      <SidePanel />

      <div className="flex flex-1 flex-col md:overflow-hidden">
        <DesktopTopBar
          active="cases"
          left={
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#16140f]">
              Cases · 케이스
            </span>
          }
        />

        <main className="flex-1 px-6 py-10 pb-24 md:overflow-y-auto md:px-14 md:py-12 md:pb-12">
          <div className="mx-auto max-w-[900px]">
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#16140f] md:text-[44px]">
              케이스
            </h1>
            <p className="mt-4 max-w-[46ch] text-[14px] leading-[1.7] text-[#16140f]/55">
              게임 하나를 깊이 파고드는 분석 시리즈. 각 케이스는 본문과
              이어지는 질문들로 구성됩니다.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {cases.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/articles/${c.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border-[1.5px] border-[#16140f] transition hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b-[1.5px] border-[#16140f]">
                    {c.cover && (
                      <Image
                        src={c.cover}
                        alt={c.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 440px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-[#16140f] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#fdfcfa]">
                      Case {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-4">
                    {c.subtitle && (
                      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#16140f]/45">
                        {c.subtitle}
                      </div>
                    )}
                    <h2 className="mt-1.5 text-[21px] font-bold leading-[1.2] tracking-[-0.03em] text-[#16140f]">
                      {c.title}
                    </h2>

                    <div className="mt-auto flex items-center gap-3 pt-4 text-[10px] uppercase tracking-[0.08em] text-[#16140f]/40">
                      <span>{c.date}</span>
                      {subCount(c.slug) > 0 && (
                        <>
                          <span className="text-[#16140f]/20">·</span>
                          <span>이어지는 글 {subCount(c.slug)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav active="cases" />
    </div>
  );
}
