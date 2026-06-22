import { getAllArticles } from "./articles";
import type { Lang } from "./i18n";
import type { CaseGroup, SoloItem, TagGroup } from "@/components/HomeShelf";

// 태그 정규화 (띄어쓰기·표기 통일)
function normTag(t: string): string {
  const s = t.trim();
  const m = s.match(/^(감정|몰입|선택|책임|관찰|지연)\s*설계$/);
  if (m) return `${m[1]} 설계`;
  if (s === "UIUX" || s === "UI디자인") return "UI설계";
  return s;
}

function uniqNorm(tags: string[]): string[] {
  return Array.from(new Set(tags.map(normTag)));
}

export function getHomeData(lang: Lang) {
  const articles = getAllArticles(lang);
  const byDateDesc = (a: { date: string }, b: { date: string }) =>
    b.date.localeCompare(a.date);
  const byDateAsc = (a: { date: string }, b: { date: string }) =>
    a.date.localeCompare(b.date);

  const roots = articles.filter((a) => a.isRoot).sort(byDateDesc);
  const solos = articles
    .filter((a) => !a.isRoot && !a.parent)
    .sort(byDateDesc);

  const groups: CaseGroup[] = roots.map((root, i) => {
    const subs = articles
      .filter((a) => a.parent === root.slug)
      .sort(byDateAsc);
    const allTags = uniqNorm([...root.tags, ...subs.flatMap((s) => s.tags)]);
    return { root, subs, allTags, index: i + 1 };
  });

  const soloItems: SoloItem[] = solos.map((article) => ({
    article,
    normTags: uniqNorm(article.tags),
  }));

  const tagGroups: TagGroup[] = [
    { key: "lens", tags: ["감정 설계", "몰입 설계", "선택 설계", "책임 설계", "관찰 설계"] },
    { key: "approach", tags: ["게임분석", "디렉터의시선", "UI설계", "UX전략"] },
  ];

  return { groups, solos: soloItems, tagGroups };
}
