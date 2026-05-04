import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Serif_KR, Inter } from "next/font/google";
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

<head>
  <link
    href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
    rel="stylesheet"
  />
</head>

export const metadata: Metadata = {
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
    <div className="flex gap-4 text-[13px] text-black/60">
      <Link href="/" className="hover:text-black">
        Home
      </Link>

      <Link href="/cases" className="hover:text-black">
        Cases
      </Link>
    </div>

  </div>
</nav>
        {children}
      </body>
    </html>
  );
}
