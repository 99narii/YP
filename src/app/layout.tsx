import type { Metadata, Viewport } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import { fontVariables } from "@/lib/fonts";
import { JsonLd, createWebSiteSchema } from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://YP.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "와이피 | Content Driven Company",
    template: "%s | 와이피",
  },
  description:
    "콘텐츠의 영향력을 기반으로 브랜드, 마케팅, 커머스, 교육까지 확장하는 콘텐츠 중심 비즈니스",
  keywords: [
    "브랜드 마케팅",
    "커머스 마케팅",
    "교육 마케팅",
    "콘텐츠 마케팅",
    "콘텐츠 제작",
    "디지털 마케팅",
    "커머스",
    "콘텐츠 중심 비즈니스",
  ],
  authors: [{ name: "YP" }],
  creator: "YP",
  publisher: "YP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "와이피",
    title: "와이피 | Content Driven Company",
    description: "콘텐츠의 영향력을 기반으로 브랜드, 마케팅, 커머스, 교육까지 확장하는 콘텐츠 중심 비즈니스",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "와이피",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "와이피 | Content Driven Company",
    description: "콘텐츠의 영향력을 기반으로 브랜드, 마케팅, 커머스, 교육까지 확장하는 콘텐츠 중심 비즈니스",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = createWebSiteSchema({
    name: "와이피",
    url: siteUrl,
    description: "콘텐츠의 영향력을 기반으로 브랜드, 마케팅, 커머스, 교육까지 확장하는 콘텐츠 중심 비즈니스",
  });

  return (
    <html lang="ko" className={fontVariables}>
      <head>
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
