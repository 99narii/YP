"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.neutral[900]};
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    overflow-x: hidden;
  }

  /* Newbird 스타일 - 여백의 미를 위한 기본 설정 */
  main {
    width: 100%;
  }

  /* 타이포그래피 기본 설정 */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-playfair), Georgia, serif;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  p {
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.neutral[700]};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.blue[500]};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  /* 접근성 - 포커스 스타일 */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue[500]};
    outline-offset: 2px;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[50]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[300]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[500]};
  }

  /* 선택 영역 스타일 */
  ::selection {
    background: ${({ theme }) => theme.colors.blue[500]};
    color: ${({ theme }) => theme.colors.neutral[0]};
  }

  /* 반응형 폰트 크기 */
  ${({ theme }) => theme.media.tablet} {
    html {
      font-size: 15px;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    html {
      font-size: 14px;
    }
  }
`;
