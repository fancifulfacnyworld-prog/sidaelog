import type { Metadata } from "next";
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
  title: "시대Log",
  description: "시대의 흐름 속, 나다움의 결을 찾아",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
