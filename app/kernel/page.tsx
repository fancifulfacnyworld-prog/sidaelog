import Link from "next/link";
import { getAllKernelArticles } from "@/lib/kernel";

export default function KernelPage() {
  const kernelArticles = getAllKernelArticles();

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <div className="mx-auto max-w-[920px]">
        <h1 className="text-[40px] tracking-[-0.04em] text-black/90">
          알맹이
        </h1>

        <p className="mt-6 text-[15px] leading-[1.8] text-black/55">
          흐르는 디자인의 알맹이를 찾아서
        </p>

        <div className="mt-12 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white/40">
          {kernelArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/kernel/${article.slug}`}
              className="block px-5 py-5 transition hover:bg-white/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[18px] leading-[1.4] tracking-[-0.02em] text-black/85">
                    {article.title}
                  </div>

                  {article.subtitle ? (
                    <div className="mt-2 text-[14px] leading-[1.8] text-black/55">
                      {article.subtitle}
                    </div>
                  ) : null}
                </div>

                <div className="shrink-0 text-[12px] tracking-[0.14em] text-black/45">
                  {article.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}