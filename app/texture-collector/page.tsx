import { SidePanel } from "@/components/SidePanel";
import { DesktopTopBar, MobileBottomNav } from "@/components/Nav";

export default function TextureCollectorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfa] md:h-screen md:flex-row md:overflow-hidden">
      <SidePanel />

      <div className="flex flex-1 flex-col md:overflow-hidden">
        <DesktopTopBar
          active="texture"
          left={
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#16140f]">
              Texture Collector · 결 수집가
            </span>
          }
        />

        <main className="flex-1 px-6 py-10 pb-24 md:overflow-y-auto md:px-14 md:py-12 md:pb-12">
          <div className="mx-auto max-w-[760px]">
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#16140f] md:text-[44px]">
              결 수집가
            </h1>
            <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-[#16140f]/55">
              나의 취향, 취향이 만드는 결. 시대로그의 결 수집가는 감정과
              분위기, 잘 맞아 취향인 것을 공유합니다.
            </p>

            <div className="mt-10 rounded-lg border-[1.5px] border-[#16140f] p-8">
              <div className="text-[19px] font-bold tracking-[-0.02em] text-[#16140f]">
                아직 수집된 결이 없습니다.
              </div>
              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.8] text-[#16140f]/55">
                공간, 노래, 책, 영화, 전시, 취미, 아름다운 계절과 자연,
                설명할 수 없는 나와 맞는 것들을 천천히 기록할 예정입니다.
              </p>

              <div className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#16140f]/35">
                <span className="rounded-full border border-[#16140f]/25 px-3 py-1">
                  Coming Soon
                </span>
                <span className="rounded-full border border-[#16140f]/25 px-3 py-1">
                  Texture Archive
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav active="texture" />
    </div>
  );
}
