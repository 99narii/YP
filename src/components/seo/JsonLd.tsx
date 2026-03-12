import { type Organization, type WebSite, type WebPage, type WithContext } from "schema-dts";

interface JsonLdProps {
  data: WithContext<Organization | WebSite | WebPage>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 기본 Organization 스키마 생성
export function createOrganizationSchema(config: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    ...(config.logo && { logo: config.logo }),
    ...(config.description && { description: config.description }),
    ...(config.sameAs && { sameAs: config.sameAs }),
  };
}

// WebSite 스키마 생성
export function createWebSiteSchema(config: {
  name: string;
  url: string;
  description?: string;
}): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    url: config.url,
    ...(config.description && { description: config.description }),
  };
}

// WebPage 스키마 생성
export function createWebPageSchema(config: {
  name: string;
  url: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
}): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    url: config.url,
    ...(config.description && { description: config.description }),
    ...(config.datePublished && { datePublished: config.datePublished }),
    ...(config.dateModified && { dateModified: config.dateModified }),
  };
}
