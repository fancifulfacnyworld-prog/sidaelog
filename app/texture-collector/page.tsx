import Link from "next/link";

export default function TextureCollectorPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <div className="mx-auto max-w-[920px]">
        
        {/* Header */}
        <div className="mb-14">
          <div className="text-[12px] uppercase tracking-[0.18em] text-black/35">
            Texture Collector
          </div>

          <h1 className="mt-3 text-[40px] leading-[1.05] tracking-[-0.05em] text-black/90">
            결 수집가
          </h1>

          <p className="mt-6 max-w-[620px] text-[16px] leading-[1.9] text-black/60">
            나의 취향, 취향이 만드는 결
            <br />
            시대로그의 결 수집가는 감정과 분위기,
            잘 맞아 취향인 것을 공유합니다.
          </p>
        </div>

        {/* Empty State */}
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/40">
          <div className="px-7 py-10">
            <div className="text-[18px] tracking-[-0.02em] text-black/80">
              아직 수집된 결이 없습니다.
            </div>

            <p className="mt-4 max-w-[520px] text-[15px] leading-[1.9] text-black/55">
              공간, 노래, 책, 영화, 전시, 취미
              아름다운 계절과 자연,
              설명할 수 없는 나와 맞는 것들을
              천천히 기록할 예정입니다.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-black/35">
              <span>Coming Soon</span>
              <span className="text-black/20">·</span>
              <span>Texture Archive</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10">
          <Link
            href="/"
            className="text-[13px] text-black/45 underline underline-offset-4 transition hover:text-black"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}