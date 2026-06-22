import { SidePanel } from "@/components/SidePanel";
import { DesktopTopBar, MobileBottomNav } from "@/components/Nav";
import { getDict, type Lang } from "@/lib/i18n";

export function TextureView({ lang }: { lang: Lang }) {
  const dict = getDict(lang);

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfa] md:h-screen md:flex-row md:overflow-hidden">
      <SidePanel lang={lang} />

      <div className="flex flex-1 flex-col md:overflow-hidden">
        <DesktopTopBar
          active="texture"
          lang={lang}
          left={
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#16140f]">
              {dict.texture.eyebrow}
            </span>
          }
        />

        <main className="flex-1 px-6 py-10 pb-24 md:overflow-y-auto md:px-14 md:py-12 md:pb-12">
          <div className="mx-auto max-w-[760px]">
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#16140f] md:text-[44px]">
              {dict.texture.title}
            </h1>
            <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-[#16140f]/55">
              {dict.texture.intro}
            </p>

            <div className="mt-10 rounded-lg border-[1.5px] border-[#16140f] p-8">
              <div className="text-[19px] font-bold tracking-[-0.02em] text-[#16140f]">
                {dict.texture.emptyTitle}
              </div>
              <p className="mt-4 max-w-[540px] text-[14px] leading-[1.8] text-[#16140f]/55">
                {dict.texture.emptyBody}
              </p>

              <div className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#16140f]/35">
                <span className="rounded-full border border-[#16140f]/25 px-3 py-1">
                  {dict.texture.comingSoon}
                </span>
                <span className="rounded-full border border-[#16140f]/25 px-3 py-1">
                  {dict.texture.archive}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav active="texture" lang={lang} />
    </div>
  );
}
