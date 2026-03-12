"use client";

import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface VisionCard {
  title: string;
  description: string;
}

interface VisionSectionProps {
  cards: VisionCard[];
  finalText: string;
}

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.blue[500]};

  ${({ theme }) => theme.media.tabletUp} {
    height: 100vh;
  }
`;

const HorizontalScroller = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardSlide = styled.div`
  flex: 0 0 100vw;
  width: 100vw;
  min-height: 400px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-top: 80px;
  padding-bottom: 40px;

  ${({ theme }) => theme.media.tabletUp} {
    height: 100vh;
    min-height: auto;
    padding: ${({ theme }) => theme.spacing.xxl};
    padding-top: ${({ theme }) => theme.spacing.xxl};
    padding-bottom: ${({ theme }) => theme.spacing.xxl};
  }
`;

const CardContent = styled.div`
  max-width: 800px;
  width: 100%;
`;

const CardNumber = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.25rem;
  color: #FFD700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;

  ${({ theme }) => theme.media.tabletUp} {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;

  ${({ theme }) => theme.media.tabletUp} {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const CardDescription = styled.p`
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  line-height: 1.8;
  opacity: 0.9;
`;

const IntroSlide = styled(CardSlide)`
  background-color: ${({ theme }) => theme.colors.blue[500]};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.tabletUp} {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const SwipeGuide = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.7;

  @keyframes swipeArrow {
    0%, 100% {
      transform: translateX(0);
      opacity: 0.7;
    }
    50% {
      transform: translateX(12px);
      opacity: 1;
    }
  }
`;


const SwipeArrow = styled.span`
  display: flex;
  align-items: center;
  animation: swipeArrow 1.5s ease-in-out infinite;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const IntroText = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  letter-spacing: -0.02em;
`;

const FinalSlide = styled(CardSlide)`
  background-color: ${({ theme }) => theme.colors.blue[500]};
`;

const FinalText = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  letter-spacing: -0.02em;
`;

const MobileNav = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  z-index: 10;

  ${({ theme }) => theme.media.tabletUp} {
    display: none;
  }
`;

const NavSide = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  z-index: 10;
  display: none;

  /* 데스크톱: 좌우에 세로 배치 */
  ${({ theme }) => theme.media.tabletUp} {
    display: flex;
    flex-direction: row;
    top: 50%;
    transform: translateY(-50%);
    ${({ $side }) => ($side === "left" ? "left: 0;" : "right: 0;")}
  }
`;

const NavItem = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  border: 1px solid ${({ theme }) => theme.colors.neutral[0]};
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral[0]};
  letter-spacing: 0.02em;
  white-space: nowrap;
  margin-left: -1px;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  /* 모바일: 가로형 - 더 작게 */
  width: auto;
  height: 28px;
  padding: 0 8px;

  span {
    transform: none;
  }

  /* 데스크톱: 세로형 */
  ${({ theme }) => theme.media.tabletUp} {
    width: 50px;
    height: 120px;
    padding: 0;
    font-size: 10px;

    span {
      transform: rotate(-90deg);
    }
  }

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export function VisionSection({ cards, finalText }: VisionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideRef = useRef(0);
  const isScrollingRef = useRef(false);

  const totalSlides = cards.length + 2; // VISION + 카드들 + CREATIVE

  // 슬라이드 이동
  const goToSlide = (index: number) => {
    if (!scrollerRef.current) return;

    const slideWidth = window.innerWidth;
    scrollerRef.current.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });
    currentSlideRef.current = index;
    setCurrentSlide(index);
  };

  // 내비게이션 클릭
  const handleNavClick = (index: number) => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    goToSlide(index);
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  // 가로 스크롤 감지 (터치/트랙패드)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const slideWidth = window.innerWidth;
      const newSlide = Math.round(scroller.scrollLeft / slideWidth);
      if (newSlide !== currentSlideRef.current) {
        currentSlideRef.current = newSlide;
        setCurrentSlide(newSlide);
      }
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <SectionWrapper ref={sectionRef} id="vision" aria-label="비전 섹션">
      <HorizontalScroller ref={scrollerRef}>
        {/* VISION 인트로 */}
        <IntroSlide>
          <IntroText>VISION</IntroText>
          <SwipeGuide>
            <SwipeArrow>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </SwipeArrow>
          </SwipeGuide>
        </IntroSlide>

        {/* 카드들 */}
        {cards.map((card, index) => (
          <CardSlide key={index}>
            <CardContent>
              <CardNumber>0{index + 1}</CardNumber>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </CardSlide>
        ))}

        {/* CREATIVE 마무리 */}
        <FinalSlide>
          <FinalText>{finalText}</FinalText>
        </FinalSlide>
      </HorizontalScroller>

      {/* 모바일: 상단 고정 내비게이션 */}
      <MobileNav>
        {Array.from({ length: totalSlides }).map((_, index) => {
          const label = index === 0
            ? "VISION"
            : index <= cards.length
              ? cards[index - 1].title
              : finalText;
          return (
            <NavItem
              key={index}
              $isActive={currentSlide === index}
              onClick={() => handleNavClick(index)}
              aria-label={label}
            >
              <span>{label}</span>
            </NavItem>
          );
        })}
      </MobileNav>

      {/* 데스크톱 좌측: 지나간 카드들 */}
      {currentSlide > 0 && (
        <NavSide $side="left">
          {Array.from({ length: currentSlide }).map((_, index) => {
            const label = index === 0
              ? "VISION"
              : index <= cards.length
                ? cards[index - 1].title
                : finalText;
            return (
              <NavItem
                key={index}
                $isActive={false}
                onClick={() => handleNavClick(index)}
                aria-label={label}
              >
                <span>{label}</span>
              </NavItem>
            );
          })}
        </NavSide>
      )}

      {/* 데스크톱 우측: 남은 카드들 */}
      {currentSlide < totalSlides - 1 && (
        <NavSide $side="right">
          {Array.from({ length: totalSlides - currentSlide - 1 }).map((_, i) => {
            const index = currentSlide + 1 + i;
            const label = index === 0
              ? "VISION"
              : index <= cards.length
                ? cards[index - 1].title
                : finalText;
            return (
              <NavItem
                key={index}
                $isActive={false}
                onClick={() => handleNavClick(index)}
                aria-label={label}
              >
                <span>{label}</span>
              </NavItem>
            );
          })}
        </NavSide>
      )}
    </SectionWrapper>
  );
}
