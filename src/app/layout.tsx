import type { Metadata, Viewport } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import { fontVariables } from "@/lib/fonts";
import { JsonLd, createWebSiteSchema } from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://new-thinks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "New Thinks | Influence That Converts",
    template: "%s | New Thinks",
  },
  description:
    "전환을 만드는 영향력. 데이터 기반 인플루언서 마케팅으로 브랜드의 성장을 이끕니다.",
  keywords: [
    "인플루언서 마케팅",
    "디지털 마케팅",
    "브랜드 마케팅",
    "소셜 미디어 마케팅",
    "influencer marketing",
    "digital marketing",
  ],
  authors: [{ name: "New Thinks" }],
  creator: "New Thinks",
  publisher: "New Thinks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "New Thinks",
    title: "New Thinks | Influence That Converts",
    description: "전환을 만드는 영향력. 데이터 기반 인플루언서 마케팅.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "New Thinks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Thinks | Influence That Converts",
    description: "전환을 만드는 영향력. 데이터 기반 인플루언서 마케팅.",
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
    name: "New Thinks",
    url: siteUrl,
    description: "전환을 만드는 영향력. 데이터 기반 인플루언서 마케팅.",
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
