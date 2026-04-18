import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// DEFAULT GLOBAL SEO Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://gecko.io.vn'),
  title: {
    default: "Gecko Team Inc. | Giải Pháp Quản Lý Cửa Hàng F&B Chuyên Nghiệp",
    template: "%s | Gecko Team Inc."
  },
  description: "Gecko Team Inc. cung cấp giải pháp, phần mềm quản lý tối ưu hoá cho các cửa hàng, quán cafe, mô hình kinh doanh F&B vừa và nhỏ.",
  keywords: ["Quản lý cửa hàng F&B", "POS", "Gecko Team Inc", "Phần mềm quản lý cafe", "Quản lý nhân sự F&B"],
  openGraph: {
    title: "Gecko Team Inc. | Quản Lý Cửa Hàng F&B Tối Ưu Thời Gian",
    description: "Khám phá các phần mềm và hệ thống giúp tiết kiệm thời gian, tối ưu hoá con người cho cửa hàng F&B của bạn.",
    url: 'https://gecko.io.vn',
    siteName: 'Gecko Team Inc.',
    locale: 'vi_VN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://gecko.io.vn',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <NavBar />
        {children}
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
