import { keyframes, css } from "styled-components";

// 기본 페이드 인
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 아래에서 위로 슬라이드 업
export const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 왼쪽에서 슬라이드 인
export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 오른쪽에서 슬라이드 인
export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 스케일 업
export const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// 텍스트 reveal (마스크 효과)
export const textReveal = keyframes`
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
`;

// 라인 확장
export const lineExpand = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

// 애니메이션 믹스인
export const animationMixin = {
  fadeIn: css`
    animation: ${fadeIn} 0.6s ease-out forwards;
  `,
  slideUp: css`
    animation: ${slideUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `,
  slideInLeft: css`
    animation: ${slideInLeft} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `,
  slideInRight: css`
    animation: ${slideInRight} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `,
  scaleUp: css`
    animation: ${scaleUp} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `,
};

// 스크롤 트리거 애니메이션을 위한 초기 상태
export const scrollAnimationInitial = css`
  opacity: 0;
  transform: translateY(40px);
`;

// 스크롤 트리거 애니메이션 활성 상태
export const scrollAnimationActive = css`
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

// 지연 시간 생성기 (stagger 효과)
export const staggerDelay = (index: number, baseDelay: number = 100) =>
  `${index * baseDelay}ms`;
