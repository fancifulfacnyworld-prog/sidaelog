export type Lang = "ko" | "en";

export const LANGS: Lang[] = ["ko", "en"];

export function isLang(v: string): v is Lang {
  return v === "ko" || v === "en";
}

// 주어진 한국어 경로(/cases 등)를 언어 경로로 변환
export function langPath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === "en" ? `/en${clean === "/" ? "" : clean}` : clean;
}

const ko = {
  brandTagline: "시대를 읽고 기록하는 매거진",
  brandEyebrow: "Reading the times through design and records",
  issue: "Sidaelog · Issue 001",
  searchPlaceholder: "제목·게임·태그 검색",
  lens: "설계 · Lens",
  approach: "관점 · Approach",
  tagHint: "태그에 올리거나 선택하면 설명이 보여요",

  nav: { home: "Home", cases: "케이스", kernel: "알맹이", texture: "결 수집가" },

  // 책장 상태바
  totalLabel: (n: number) => `전체 ${n}편의 글`,
  filteredLabel: (t: string, n: number) => `${t} · ${n}편`,
  clear: "✕ 해제",
  empty: "조건에 맞는 글이 없어요.",
  articles: "Articles",

  // 태그 (키는 한국어 정규화 태그, 값은 표시 라벨 + 설명)
  tags: {
    "감정 설계": { label: "감정 설계", desc: "게임은 유저에게 어떤 기분이 들게 만들었을까" },
    "몰입 설계": { label: "몰입 설계", desc: "유저를 어떻게 게임에 몰입하게 만들었을까" },
    "선택 설계": { label: "선택 설계", desc: "선택이 자유로워 보이지만 자유도는 제한된다" },
    "책임 설계": { label: "책임 설계", desc: "유저는 언제 선택의 결과에 책임을 질까" },
    "관찰 설계": { label: "관찰 설계", desc: "게임은 왜 유저를 특정 부분에 오래 머물게 할까" },
    "게임분석": { label: "게임분석", desc: "" },
    "디렉터의시선": { label: "디렉터의 시선", desc: "" },
    "UI설계": { label: "UI 설계", desc: "" },
    "UX전략": { label: "UX 전략", desc: "" },
  } as Record<string, { label: string; desc: string }>,

  cases: {
    eyebrow: "Sidaelog · Cases",
    title: "케이스",
    intro: "게임 하나를 깊이 파고드는 분석 시리즈. 각 케이스는 본문과 이어지는 질문들로 구성됩니다.",
    cont: (n: number) => `이어지는 글 ${n}`,
  },
  kernel: {
    eyebrow: "Sidaelog · Kernel",
    title: "알맹이",
    intro: "흐르는 디자인의 알맹이를 찾아서 — 짧지만 핵심만 남긴 생각들.",
  },
  texture: {
    eyebrow: "Sidaelog · Texture Collector",
    title: "결 수집가",
    intro: "나의 취향, 취향이 만드는 결. 시대로그의 결 수집가는 감정과 분위기, 잘 맞아 취향인 것을 공유합니다.",
    emptyTitle: "아직 수집된 결이 없습니다.",
    emptyBody: "공간, 노래, 책, 영화, 전시, 취미, 아름다운 계절과 자연, 설명할 수 없는 나와 맞는 것들을 천천히 기록할 예정입니다.",
    comingSoon: "Coming Soon",
    archive: "Texture Archive",
  },
  article: {
    back: "← 목록으로",
    game: "Game",
    date: "Date",
    tags: "Tags",
    notes: "Sidaelog · Director Notes",
    footer: "시대log · Notes on design, culture and time",
    further: "Further Questions",
    continues: (t: string) => `이 글은 ‘${t}’에서 이어집니다.`,
    original: "원글 보기 →",
    untranslated: "이 글은 아직 한국어로만 제공됩니다.",
  },
};

const en: typeof ko = {
  brandTagline: "A magazine that reads and records the times",
  brandEyebrow: "Reading the times through design and records",
  issue: "Sidaelog · Issue 001",
  searchPlaceholder: "Search by title, game, tag",
  lens: "Lens",
  approach: "Approach",
  tagHint: "Hover or select a tag to see its description",

  nav: { home: "Home", cases: "Cases", kernel: "Kernel", texture: "Texture" },

  totalLabel: (n: number) => `${n} pieces in all`,
  filteredLabel: (t: string, n: number) => `${t} · ${n}`,
  clear: "✕ Clear",
  empty: "No pieces match.",
  articles: "Articles",

  tags: {
    "감정 설계": { label: "Emotion Design", desc: "What feeling did the game leave you with?" },
    "몰입 설계": { label: "Immersion Design", desc: "How does the game pull you in?" },
    "선택 설계": { label: "Choice Design", desc: "Choices look free, yet the freedom is bounded." },
    "책임 설계": { label: "Accountability Design", desc: "When do you start to own the consequences of a choice?" },
    "관찰 설계": { label: "Observation Design", desc: "Why does the game make you linger in one place?" },
    "게임분석": { label: "Game Analysis", desc: "" },
    "디렉터의시선": { label: "Director's Eye", desc: "" },
    "UI설계": { label: "UI Design", desc: "" },
    "UX전략": { label: "UX Strategy", desc: "" },
  },

  cases: {
    eyebrow: "Sidaelog · Cases",
    title: "Cases",
    intro: "A series that digs deep into a single game. Each case pairs a main piece with the questions that follow from it.",
    cont: (n: number) => `${n} follow-up${n > 1 ? "s" : ""}`,
  },
  kernel: {
    eyebrow: "Sidaelog · Kernel",
    title: "Kernel",
    intro: "In search of the kernel within fleeting design — short thoughts pared down to what matters.",
  },
  texture: {
    eyebrow: "Sidaelog · Texture Collector",
    title: "Texture Collector",
    intro: "My taste, and the textures it shapes. The texture collector shares moods, feelings, and the things that simply fit.",
    emptyTitle: "No textures collected yet.",
    emptyBody: "Spaces, songs, books, films, exhibitions, hobbies, beautiful seasons and nature — the things that fit me in ways I can't quite explain, recorded slowly over time.",
    comingSoon: "Coming Soon",
    archive: "Texture Archive",
  },
  article: {
    back: "← Back to index",
    game: "Game",
    date: "Date",
    tags: "Tags",
    notes: "Sidaelog · Director Notes",
    footer: "Sidaelog · Notes on design, culture and time",
    further: "Further Questions",
    continues: (t: string) => `This piece continues from “${t}.”`,
    original: "Read the original →",
    untranslated: "This piece is currently available in Korean only.",
  },
};

export type Dict = typeof ko;

export function getDict(lang: Lang): Dict {
  return lang === "en" ? en : ko;
}

// 태그 정규화 (띄어쓰기·표기 통일)
function normTag(t: string): string {
  const s = t.trim();
  const m = s.match(/^(감정|몰입|선택|책임|관찰|지연)\s*설계$/);
  if (m) return `${m[1]} 설계`;
  if (s === "UIUX" || s === "UI디자인" || s === "UIUX 분석") return "UI설계";
  return s;
}

// 글에 붙은 모든 태그의 영어 표기
const TAG_EN: Record<string, string> = {
  // 설계 (Lens)
  "감정 설계": "Emotion Design",
  "몰입 설계": "Immersion Design",
  "선택 설계": "Choice Design",
  "책임 설계": "Accountability Design",
  "관찰 설계": "Observation Design",
  "지연 설계": "Pacing Design",
  // 관점 (Approach)
  "게임분석": "Game Analysis",
  "디렉터의시선": "Director's Eye",
  "UI설계": "UI Design",
  "UX전략": "UX Strategy",
  "게임BM": "Game Monetization",
  "KPI설계": "KPI Design",
  // 주제
  "트렌드는선택이다": "Trends Are a Choice",
  "서브컬처게임": "Subculture Game",
  "반드시 알아야 할 게임UI": "Game UI You Must Know",
  "불편한질문": "Uncomfortable Questions",
  "디자인사고": "Design Thinking",
  // 게임 타이틀
  "클레르 옵스퀴르:33원정대": "Clair Obscur: Expedition 33",
  "디스코엘리시움": "Disco Elysium",
  "오브라딘호의 귀환": "Return of the Obra Dinn",
  "발더스게이트3": "Baldur's Gate 3",
  "원신": "Genshin Impact",
  "붕괴:스타레일": "Honkai: Star Rail",
  "HoYoverse": "HoYoverse",
};

// 태그를 언어에 맞게 — 영어면 매핑, 없으면 원본
export function translateTag(tag: string, lang: Lang): string {
  if (lang !== "en") return tag;
  const n = normTag(tag);
  return TAG_EN[n] ?? TAG_EN[tag] ?? tag;
}
