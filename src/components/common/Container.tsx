"use client";

import styled from "styled-components";

interface ContainerProps {
  $size?: "default" | "narrow" | "wide" | "full";
  $padding?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ $padding = true, theme }) =>
    $padding ? theme.spacing.lg : 0};
  padding-right: ${({ $padding = true, theme }) =>
    $padding ? theme.spacing.lg : 0};

  max-width: ${({ $size = "default" }) => {
    switch ($size) {
      case "narrow":
        return "768px";
      case "wide":
        return "1600px";
      case "full":
        return "100%";
      default:
        return "100%";
    }
  }};

  ${({ theme }) => theme.media.tabletUp} {
    padding-left: ${({ $padding = true, theme }) =>
      $padding ? theme.spacing.xl : 0};
    padding-right: ${({ $padding = true, theme }) =>
      $padding ? theme.spacing.xl : 0};
  }
`;

// 섹션 래퍼 - Newbird 스타일 여백
export const Section = styled.section`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing.xxl};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};

  ${({ theme }) => theme.media.tabletUp} {
    padding-top: ${({ theme }) => theme.spacing.section};
    padding-bottom: ${({ theme }) => theme.spacing.section};
  }
`;

// 그리드 레이아웃
export const Grid = styled.div<{
  $columns?: number;
  $gap?: keyof typeof import("@/styles/tokens").spacing;
}>`
  display: grid;
  grid-template-columns: repeat(${({ $columns = 12 }) => $columns}, 1fr);
  gap: ${({ $gap = "md", theme }) => theme.spacing[$gap]};
`;

// Flex 유틸리티
export const Flex = styled.div<{
  $direction?: "row" | "column";
  $align?: "flex-start" | "center" | "flex-end" | "stretch";
  $justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  $gap?: keyof typeof import("@/styles/tokens").spacing;
  $wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $direction = "row" }) => $direction};
  align-items: ${({ $align = "stretch" }) => $align};
  justify-content: ${({ $justify = "flex-start" }) => $justify};
  gap: ${({ $gap = "md", theme }) => theme.spacing[$gap]};
  flex-wrap: ${({ $wrap = false }) => ($wrap ? "wrap" : "nowrap")};
`;
