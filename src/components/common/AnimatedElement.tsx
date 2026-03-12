"use client";

import styled, { css } from "styled-components";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React, { type ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";
  delay?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

const animationStyles = {
  fadeUp: css<{ $isVisible: boolean; $delay: number }>`
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: translateY(${({ $isVisible }) => ($isVisible ? 0 : "40px")});
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)
        ${({ $delay }) => $delay}ms,
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${({ $delay }) => $delay}ms;
  `,
  fadeIn: css<{ $isVisible: boolean; $delay: number }>`
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)
      ${({ $delay }) => $delay}ms;
  `,
  slideLeft: css<{ $isVisible: boolean; $delay: number }>`
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: translateX(${({ $isVisible }) => ($isVisible ? 0 : "40px")});
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)
        ${({ $delay }) => $delay}ms,
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${({ $delay }) => $delay}ms;
  `,
  slideRight: css<{ $isVisible: boolean; $delay: number }>`
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: translateX(${({ $isVisible }) => ($isVisible ? 0 : "-40px")});
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)
        ${({ $delay }) => $delay}ms,
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${({ $delay }) => $delay}ms;
  `,
  scale: css<{ $isVisible: boolean; $delay: number }>`
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transform: scale(${({ $isVisible }) => ($isVisible ? 1 : 0.95)});
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)
        ${({ $delay }) => $delay}ms,
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${({ $delay }) => $delay}ms;
  `,
};

const Wrapper = styled.div<{
  $animation: keyof typeof animationStyles;
  $isVisible: boolean;
  $delay: number;
}>`
  ${({ $animation }) => animationStyles[$animation]}
`;

export function AnimatedElement({
  children,
  animation = "fadeUp",
  delay = 0,
  threshold = 0.1,
  className,
  as,
}: AnimatedElementProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce: false,
  });

  return (
    <Wrapper
      ref={ref}
      as={as}
      className={className}
      $animation={animation}
      $isVisible={isVisible}
      $delay={delay}
    >
      {children}
    </Wrapper>
  );
}
