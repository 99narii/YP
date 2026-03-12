"use client";

import { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

interface FlowItem {
  label: string;
  description: string;
}

interface CommerceSectionProps {
  overline: string;
  title: string;
  paragraphs: string[];
  flow: FlowItem[];
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const flowPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
`;

const drawLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 80px 0;
  background-color: ${({ theme }) => theme.colors.blue[500]};
  overflow: hidden;

  ${({ theme }) => theme.media.tabletUp} {
    padding: 120px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Overline = styled.span<{ $isVisible: boolean }>`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.caption}
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue[50]};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
    `}
`;

const Title = styled.h2<{ $isVisible: boolean }>`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.4;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.1s;
    `}
`;

const Paragraph = styled.p<{ $index: number; $isVisible: boolean }>`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.body1}
  color: ${({ theme }) => theme.colors.neutral[0]};
  line-height: 1.9;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: ${0.2 + $index * 0.15}s;
    `}

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FlowWrapper = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.spacing.xxl} 0;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const FlowContainer = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.4s;
    `}
`;

const FlowItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.tabletUp} {
    gap: 0;
  }
`;

const FlowItem = styled.div<{ $index: number; $isVisible: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  z-index: 2;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${scaleIn} 0.6s ease-out forwards, ${float} 4s ease-in-out infinite;
      animation-delay: ${0.5 + $index * 0.2}s, ${1.5 + $index * 0.2}s;
    `}
`;

const FlowCircle = styled.div<{ $index: number }>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 2px solid ${({ theme }) => theme.colors.blue[50]};
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  cursor: default;

  ${({ theme }) => theme.media.tabletUp} {
    width: 120px;
    height: 120px;
  }

  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.colors.neutral[0]};
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }
`;

const FlowLabel = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  ${({ theme }) => theme.typography.caption}
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  letter-spacing: 0.05em;
  text-align: center;
`;

const FlowDescription = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.caption}
  color: ${({ theme }) => theme.colors.blue[50]};
  text-align: center;
`;

const FlowConnector = styled.div<{ $index: number; $isVisible: boolean }>`
  display: none;

  ${({ theme }) => theme.media.tabletUp} {
    display: block;
    width: 100px;
    height: 2px;
    position: relative;
    align-self: center;
    margin: 0 ${({ theme }) => theme.spacing.lg};
    margin-bottom: 24px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.blue[50]} 0%,
      ${({ theme }) => theme.colors.neutral[0]} 50%,
      ${({ theme }) => theme.colors.blue[50]} 100%
    );
    background-size: 200% 100%;

    ${({ $isVisible, $index }) =>
      $isVisible &&
      css`
        animation: ${drawLine} 0.8s ease-out forwards,
          ${shimmer} 3s ease-in-out infinite;
        animation-delay: ${0.8 + $index * 0.2}s, ${1.6 + $index * 0.2}s;
      `}
  }
`;

const GlowOrb = styled.div<{ $position: "left" | "right"; $isVisible: boolean }>`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
  opacity: 0;

  ${({ $position }) =>
    $position === "left"
      ? css`
          top: -100px;
          left: -150px;
        `
      : css`
          bottom: -100px;
          right: -150px;
        `}

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${flowPulse} 4s ease-in-out infinite;
    `}
`;

export function CommerceSection({
  overline,
  title,
  paragraphs,
  flow,
}: CommerceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
    }

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper ref={sectionRef} id="commerce" aria-label="커머스 섹션">
      <GlowOrb $position="left" $isVisible={isVisible} />
      <GlowOrb $position="right" $isVisible={isVisible} />

      <Container>
        <ContentWrapper>
          <Overline $isVisible={isVisible}>{overline}</Overline>
          <Title $isVisible={isVisible}>{title}</Title>

          {paragraphs.map((text, index) => (
            <Paragraph key={index} $index={index} $isVisible={isVisible}>
              {text}
            </Paragraph>
          ))}

          <FlowWrapper>
            <FlowContainer $isVisible={isVisible}>
              {flow.map((item, index) => (
                <FlowItemWrapper key={index}>
                  <FlowItem $index={index} $isVisible={isVisible}>
                    <FlowCircle $index={index}>
                      <FlowLabel>{item.label}</FlowLabel>
                    </FlowCircle>
                    <FlowDescription>{item.description}</FlowDescription>
                  </FlowItem>

                  {index < flow.length - 1 && (
                    <FlowConnector $index={index} $isVisible={isVisible} />
                  )}
                </FlowItemWrapper>
              ))}
            </FlowContainer>
          </FlowWrapper>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
}
