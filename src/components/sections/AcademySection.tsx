"use client";

import { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

interface Feature {
  number: string;
  title: string;
  description: string;
}

interface AcademySectionProps {
  overline: string;
  title: string;
  paragraphs: string[];
  features: Feature[];
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const expandWidth = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }
`;

const numberPulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
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
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: ${0.2 + $index * 0.1}s;
    `}

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FeaturesWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FeaturesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.tabletUp} {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const FeatureCard = styled.div<{ $index: number; $isVisible: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px 16px 16px 0;
  backdrop-filter: blur(10px);
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};
  transition: all 0.4s ease;

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${slideInLeft} 0.8s ease-out forwards,
        ${glow} 4s ease-in-out infinite;
      animation-delay: ${0.5 + $index * 0.15}s, ${1.3 + $index * 0.15}s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    padding: ${({ theme }) => theme.spacing.xl};
    gap: ${({ theme }) => theme.spacing.xl};
  }

  &:hover {
    transform: translateX(8px);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.04) 100%
    );
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const FeatureNumber = styled.div<{ $index: number; $isVisible: boolean }>`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue[50]};
  line-height: 1;
  min-width: 60px;
  opacity: 0.6;

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${numberPulse} 3s ease-in-out infinite;
      animation-delay: ${1 + $index * 0.3}s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    min-width: 80px;
  }
`;

const FeatureContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FeatureTitle = styled.h3`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.h3}
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin: 0;
`;

const FeatureDescription = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.body1}
  color: ${({ theme }) => theme.colors.blue[50]};
  margin: 0;
`;

const FeatureLine = styled.div<{ $index: number; $isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.blue[50]} 0%,
    transparent 100%
  );

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${expandWidth} 1s ease-out forwards;
      animation-delay: ${0.8 + $index * 0.15}s;
    `}
`;

const BackgroundDecor = styled.div`
  position: absolute;
  top: 50%;
  right: -100px;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 70%
  );
  pointer-events: none;

  ${({ theme }) => theme.media.tabletUp} {
    width: 600px;
    height: 600px;
    right: -200px;
  }
`;

export function AcademySection({
  overline,
  title,
  paragraphs,
  features,
}: AcademySectionProps) {
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
    <SectionWrapper ref={sectionRef} id="academy" aria-label="부트캠프 섹션">
      <BackgroundDecor />

      <Container>
        <ContentWrapper>
          <Overline $isVisible={isVisible}>{overline}</Overline>
          <Title $isVisible={isVisible}>{title}</Title>

          {paragraphs.map((text, index) => (
            <Paragraph key={index} $index={index} $isVisible={isVisible}>
              {text}
            </Paragraph>
          ))}

          <FeaturesWrapper>
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index} $index={index} $isVisible={isVisible}>
                  <FeatureNumber $index={index} $isVisible={isVisible}>
                    {feature.number}
                  </FeatureNumber>
                  <FeatureContent>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureContent>
                  <FeatureLine $index={index} $isVisible={isVisible} />
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </FeaturesWrapper>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
}
