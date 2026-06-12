import { SidePanel } from "@/components/SidePanel";

export default function TextureCollectorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfa] md:flex-row">
      <SidePanel active="texture" />

      <main className="flex-1 px-6 py-12 md:px-14 md:py-16">
        <div className="mx-auto max-w-[760px]">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#16140f]/35">
            Sidaelog · Texture Collector
          </div>
          <h1 className="mt-2 text-[44px] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#16140f]">
            결 수집가
          </h1>
          <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-[#16140f]/55">
            나의 취향, 취향이 만드는 결. 시대로그의 결 수집가는 감정과
            분위기, 잘 맞아 취향인 것을 공유합니다.
          </p>

          {/* 빈 상태 */}
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
  );
}
