import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { VotingProvider } from "@/context/VotingContext";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "인천 스마트시티 민원 투표",
  description: "인천광역시 스마트시티 시민 참여 민원 투표 시스템 — 우리 동네 문제를 함께 해결해요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-sans-kr)] antialiased bg-gray-50">
        <VotingProvider>{children}</VotingProvider>
      </body>
    </html>
  );
}
