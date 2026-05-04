import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function CasesPage() {
  const articles = getAllArticles();

  const cases = articles
    .filter((a) => a.isRoot)
    .sort((a, b) => (a.case ?? 0) - (b.case ?? 0));

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-5 py-12">
      <div className="mx-auto max-w-[920px]">
        <h1 className="text-[32px] mb-8">Cases</h1>

        <div className="space-y-6">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/articles/${c.slug}`}
              className="block border rounded-xl px-5 py-5 bg-white hover:bg-white/70"
            >
              <div className="text-[12px] uppercase text-black/40">
                Case {String(c.case).padStart(2, "0")}
              </div>

              <div className="mt-2 text-[20px]">
                {c.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}