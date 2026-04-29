"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export function Spoiler({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className={[
        "rounded px-1 transition",
        revealed
          ? "text-black blur-0"
          : "select-none bg-black/10 text-black/40 blur-sm hover:bg-black/15",
      ].join(" ")}
      aria-label={revealed ? "스포일러 내용 표시됨" : "스포일러 보기"}
    >
      {children}
    </button>
  );
}