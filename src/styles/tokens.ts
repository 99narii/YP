/**
 * Design Tokens
 * Newbird 스타일 레퍼런스 기반 디자인 시스템
 */

export const colors = {
  blue: {
    50: "#E6F3FF",
    100: "#CCE6FF",
    200: "#99CCFF",
    300: "#66B2FF",
    400: "#339BFF",
    500: "#0084FF", // Primary Main
    600: "#0076E6",
    700: "#005EBF", // Text/Accessible Blue
    800: "#00458C",
    900: "#002D59",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#F8F9FA", // Newbird 스타일 배경색
    100: "#E9ECEF",
    300: "#DEE2E6",
    500: "#ADB5BD",
    700: "#495057", // 보조 텍스트
    900: "#1A1A1A", // 메인 타이틀/본문
  },
  system: {
    success: "#00C853",
    error: "#FF3D00",
  },
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "40px",
  xxl: "80px",
  section: "120px", // 섹션 간 간격 (Newbird 스타일)
} as const;

export const breakpoints = {
  mobile: "576px",
  tablet: "768px",
  desktop: "1200px",
} as const;

// 미디어 쿼리 헬퍼
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  // 범위 지정
  tabletOnly: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  tabletUp: `@media (min-width: ${breakpoints.tablet})`,
} as const;

export const typography = {
  display1: `
    font-size: 4rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  `,
  h1: `
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
  `,
  h2: `
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1.4;
  `,
  h3: `
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4;
  `,
  body1: `
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.6;
  `,
  body2: `
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
  `,
  caption: `
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
  `,
  overline: `
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  `,
} as const;

export const shadows = {
  card: "0 4px 20px rgba(0, 0, 0, 0.08)",
  cardHover: "0 8px 30px rgba(0, 0, 0, 0.12)",
  button: "0 2px 10px rgba(0, 132, 255, 0.3)",
  buttonHover: "0 4px 15px rgba(0, 132, 255, 0.4)",
} as const;

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "16px",
  full: "9999px",
} as const;

export const transitions = {
  fast: "150ms ease",
  normal: "300ms ease",
  slow: "500ms ease",
  smooth: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  header: 300,
  modal: 400,
  tooltip: 500,
} as const;
