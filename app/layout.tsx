import type { Metadata } from "next";
import { Noto_Serif_KR, Inter } from "next/font/google";
import "./globals.css";

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "시대Log",
  description: "요즘을 버티는 기록",
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
