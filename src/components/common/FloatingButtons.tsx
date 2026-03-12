"use client";

import { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";

// 물방울 떨어지는 효과 애니메이션
const droplet = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

const floatUp = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const ButtonsWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;

  ${({ theme }) => theme.media.tabletUp} {
    bottom: 32px;
    right: 32px;
  }
`;

const FloatingButton = styled.button<{ $isVisible?: boolean }>`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: visible;

  ${({ theme }) => theme.media.tabletUp} {
    width: 56px;
    height: 56px;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ContactButton = styled(FloatingButton)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue[50]} 0%, ${({ theme }) => theme.colors.blue[100]} 100%);
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.blue[50]}66;

  /* 모바일에서만 표시 */
  display: flex;

  ${({ theme }) => theme.media.tabletUp} {
    display: none;
  }

  &:hover {
    box-shadow: 0 6px 24px ${({ theme }) => theme.colors.blue[50]}80;
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.blue[500]};

    ${({ theme }) => theme.media.tabletUp} {
      width: 24px;
      height: 24px;
    }
  }
`;

const TopButton = styled(FloatingButton)<{ $isVisible: boolean }>`
  background: ${({ theme }) => theme.colors.blue[500]};
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 132, 255, 0.3);
  opacity: 0;
  pointer-events: none;
  animation: ${floatUp} 3s ease-in-out infinite;

  ${({ $isVisible }) =>
    $isVisible
      ? css`
          animation: ${fadeIn} 0.3s ease forwards, ${floatUp} 3s ease-in-out infinite;
          animation-delay: 0s, 0.3s;
          pointer-events: auto;
        `
      : css`
          animation: ${fadeOut} 0.3s ease forwards;
        `}

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 132, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.9);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.neutral[0]};

    ${({ theme }) => theme.media.tabletUp} {
      width: 24px;
      height: 24px;
    }
  }
`;

// 물방울 리플 이펙트
const RippleEffect = styled.span<{ $isAnimating: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;

  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      animation: ${ripple} 0.6s ease-out;
    `}
`;

// 물방울 드롭 이펙트 (클릭 시)
const DropletEffect = styled.span<{ $isAnimating: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;

  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      animation: ${droplet} 0.5s ease-out;
      opacity: 1;
    `}
`;

export function FloatingButtons() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    setIsRippling(true);

    // 물방울 효과 후 스크롤
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    // 애니메이션 리셋
    setTimeout(() => {
      setIsRippling(false);
    }, 600);
  }, []);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <ButtonsWrapper>
      {/* Top Button with Water Droplet Effect */}
      <TopButton
        $isVisible={showTopButton}
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
      >
        <RippleEffect $isAnimating={isRippling} />
        <RippleEffect $isAnimating={isRippling} style={{ animationDelay: "0.1s" }} />
        <DropletEffect $isAnimating={isRippling} />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </TopButton>

      {/* Contact Button (Mobile Only) */}
      <ContactButton onClick={scrollToContact} aria-label="문의하기">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </ContactButton>
    </ButtonsWrapper>
  );
}
