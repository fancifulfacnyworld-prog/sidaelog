import type { Metadata } from "next";
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
        {children}
        <GoogleAnalytics gaId="G-WDQT737VSB" />
      </body>
    </html>
  );
}
