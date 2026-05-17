import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Serif_KR, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const serif = Noto_Serif_KR({
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://sidaelog.vercel.app/"),
  title: "시대로그",
  description: "시대를 읽고 기록하는 매거진",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <nav className="mb-8 border-b border-black/10 bg-[#f6f6f4] px-5 py-4">
  <div className="mx-auto flex max-w-[920px] items-center justify-between">
    
    {/* 로고 */}
    <Link href="/" className="logo-serif text-[18px] tracking-[-0.04em] text-black/80">
      시대log
    </Link>

    {/* 메뉴 묶음 */}
<div className="flex items-center text-[13px] text-black/60">
  <Link href="/" className="hover:text-black">
    Home
  </Link>

  <span className="mx-3 text-black/20">·</span>

  <Link href="/cases" className="hover:text-black">
    케이스
  </Link>

  <span className="mx-3 text-black/20">·</span>

  <Link href="/kernel" className="hover:text-black">
    알맹이
  </Link>

  <span className="mx-3 text-black/20">·</span>

  <Link href="/texture-collector" className="hover:text-black">
    결 수집가
  </Link>
</div>

  </div>
</nav>
        {children}
        <GoogleAnalytics gaId="G-WDQT737VSB" />
      </body>
    </html>
  );
}
