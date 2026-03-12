"use client";

import styled from "styled-components";

// Display - Hero 타이틀
export const Display = styled.h1`
  ${({ theme }) => theme.typography.display1}
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-family: var(--font-playfair), Georgia, serif;

  ${({ theme }) => theme.media.tablet} {
    font-size: 3rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 2.5rem;
  }
`;

// H1
export const H1 = styled.h1`
  ${({ theme }) => theme.typography.h1}
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-family: var(--font-playfair), Georgia, serif;

  ${({ theme }) => theme.media.tablet} {
    font-size: 2.5rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

// H2
export const H2 = styled.h2`
  ${({ theme }) => theme.typography.h2}
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-family: var(--font-playfair), Georgia, serif;

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.75rem;
  }
`;

// H3
export const H3 = styled.h3`
  ${({ theme }) => theme.typography.h3}
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

// Body Large
export const BodyLarge = styled.p`
  ${({ theme }) => theme.typography.body1}
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

// Body Regular
export const Body = styled.p`
  ${({ theme }) => theme.typography.body2}
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

// Caption
export const Caption = styled.span`
  ${({ theme }) => theme.typography.caption}
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

// Overline - 라벨/태그
export const Overline = styled.span`
  ${({ theme }) => theme.typography.overline}
  color: ${({ theme }) => theme.colors.blue[500]};
`;

// 강조 텍스트
export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.blue[500]};
  font-weight: 600;
`;

// 그라데이션 텍스트
export const GradientText = styled.span`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.blue[500]} 0%,
    ${({ theme }) => theme.colors.blue[700]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
