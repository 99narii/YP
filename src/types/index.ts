// 공통 타입 정의

export interface SectionProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
}

export interface AnimatedProps {
  isVisible?: boolean;
  delay?: number;
}

// SEO 메타데이터 타입
export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// 네비게이션 아이템 타입
export interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

// 섹션 콘텐츠 타입
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface ProblemContent {
  title: string;
  description: string;
  points: {
    title: string;
    description: string;
  }[];
}

export interface SolutionContent {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface ResultContent {
  title: string;
  description: string;
  stats: {
    value: string;
    label: string;
  }[];
}
