import Link from "next/link";
import Image from "next/image";
import { SidePanel } from "@/components/SidePanel";
import { DesktopTopBar, MobileBottomNav } from "@/components/Nav";
import { getDict, type Lang } from "@/lib/i18n";
import { getAllTextures } from "@/lib/texture";

export function TextureView({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const textures = getAllTextures();

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
          <div className="mx-auto max-w-[900px]">
            <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#16140f] md:text-[44px]">
              {dict.texture.title}
            </h1>
            <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-[#16140f]/55">
              {dict.texture.intro}
            </p>

            {textures.length === 0 ? (
              /* 빈 상태 */
              <div className="mt-10 rounded-lg border-[1.5px] border-[#16140f] p-8">
                <div className="text-[19px] font-bold tracking-[-0.02em] text-[#16140f]">
                  {dict.texture.emptyTitle}
                </div>
                <p className="mt-4 max-w-[520px] text-[14px] leading-[1.8] text-[#16140f]/55">
                  {dict.texture.emptyBody}
                </p>
              </div>
            ) : (
              /* 결 카드 그리드 */
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {textures.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/texture-collector/${t.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border-[1.5px] border-[#16140f] transition hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-b-[1.5px] border-[#16140f]">
                      {t.cover && (
                        <Image
                          src={t.cover}
                          alt={t.source ?? t.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 440px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-[#16140f] px-2.5 py-1 text-[10px] font-bold tracking-[0.06em] text-[#fdfcfa]">
                        {t.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col px-5 py-5">
                      {t.quote && (
                        <blockquote className="border-l-[3px] border-[#c2552e] pl-3 text-[16px] font-semibold leading-[1.5] tracking-[-0.02em] text-[#16140f]">
                          {t.quote}
                        </blockquote>
                      )}
                      <div className="mt-auto flex items-center gap-2 pt-4 text-[11px] text-[#16140f]/45">
                        {t.source && (
                          <span className="font-bold text-[#16140f]/70">
                            {t.source}
                          </span>
                        )}
                        {t.author && (
                          <>
                            <span className="text-[#16140f]/25">·</span>
                            <span>{t.author}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <MobileBottomNav active="texture" lang={lang} />
    </div>
  );
}
