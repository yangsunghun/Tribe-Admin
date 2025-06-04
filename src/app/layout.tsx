import "@/assets/css/globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import TQProviders from "@/components/providers/TQProviders";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "Tribe 관리자 페이지",
  description: "Tribe 관리자 페이지 입니다"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className="min-h-screen">
      <body className={`${pretendard.className}`}>
        <AuthProvider>
          <TQProviders>{children}</TQProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
