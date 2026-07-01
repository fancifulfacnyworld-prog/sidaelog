"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * GA를 조건부로 로드한다.
 * - URL에 ?notrack=1 로 한 번 접속하면 이 기기를 추적에서 영구 제외 (localStorage 저장)
 * - URL에 ?track=1 로 접속하면 제외 해제
 * - 제외된 기기에서는 GA 스크립트 자체를 로드하지 않는다.
 */
export function Analytics({ gaId }: { gaId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("notrack") === "1") {
      localStorage.setItem("ga_opt_out", "1");
    }
    if (params.get("track") === "1") {
      localStorage.removeItem("ga_opt_out");
    }
    setEnabled(localStorage.getItem("ga_opt_out") !== "1");
  }, []);

  if (!enabled) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
