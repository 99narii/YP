"use client";

import { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

interface Milestone {
  date: string;
  title: string;
  description: string;
}

interface MilestonesSectionProps {
  milestones: Milestone[];
}

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const drawLine = keyframes`
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.2);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const typeWriter = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCursor = keyframes`
  0%, 50% {
    border-color: transparent;
  }
  51%, 100% {
    border-color: #FFFFFF;
  }
`;

const floatParticle = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
`;

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
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

const Header = styled.div<{ $isVisible: boolean }>`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    margin-bottom: 120px;
  }
`;

const Title = styled.h2`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.8;
`;

const TimelineWrapper = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const TimelineLine = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  left: 20px;
  top: 0;
  width: 2px;
  height: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.2) 100%
  );

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${drawLine} 2s ease-out forwards;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const MilestoneItem = styled.div<{ $index: number; $isVisible: boolean }>`
  position: relative;
  padding-left: 60px;
  padding-bottom: 60px;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: ${0.3 + $index * 0.3}s;
    `}

  &:last-child {
    padding-bottom: 0;
  }

  ${({ theme }) => theme.media.tabletUp} {
    padding-left: 0;
    padding-bottom: 80px;
    display: grid;
    grid-template-columns: 1fr 60px 1fr;
    align-items: start;
    gap: 0;

    &:nth-child(odd) {
      .milestone-content {
        grid-column: 1;
        align-items: flex-end;
        text-align: right;
        padding-right: 40px;
      }
      .milestone-dot {
        grid-column: 2;
      }
      .milestone-date {
        grid-column: 3;
        justify-content: flex-start;
        padding-left: 40px;
      }
    }

    &:nth-child(even) {
      .milestone-content {
        grid-column: 3;
        align-items: flex-start;
        text-align: left;
        padding-left: 40px;
      }
      .milestone-dot {
        grid-column: 2;
      }
      .milestone-date {
        grid-column: 1;
        justify-content: flex-end;
        padding-right: 40px;
      }
    }
  }
`;

const MilestoneDot = styled.div<{ $index: number; $isVisible: boolean }>`
  position: absolute;
  left: 10px;
  top: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral[0]};
  border: 4px solid ${({ theme }) => theme.colors.blue[500]};
  transform: scale(0);
  z-index: 2;

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${scaleIn} 0.5s ease-out forwards,
        ${pulseGlow} 2s ease-in-out infinite;
      animation-delay: ${0.5 + $index * 0.3}s, ${1 + $index * 0.3}s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    position: relative;
    left: auto;
    justify-self: center;
  }
`;

const MilestoneDate = styled.div<{ $index: number; $isVisible: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${slideInFromLeft} 0.6s ease-out forwards;
      animation-delay: ${0.6 + $index * 0.3}s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 22px;
  }
`;

const DateText = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue[50]};
  letter-spacing: 0.05em;
`;

const MilestoneContent = styled.div<{ $index: number; $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${slideInFromRight} 0.6s ease-out forwards;
      animation-delay: ${0.7 + $index * 0.3}s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    display: flex;
    flex-direction: column;
  }
`;

const MilestoneTitle = styled.h3`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.3;
`;

const MilestoneDescription = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.8;
  line-height: 1.6;
`;

// Floating particles for extra flair
const Particle = styled.div<{ $delay: number; $left: number }>`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  left: ${({ $left }) => $left}%;
  bottom: 20%;
  opacity: 0;
  animation: ${floatParticle} 4s ease-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

export function MilestonesSection({ milestones }: MilestonesSectionProps) {
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
      { threshold: 0.2 }
    );

    // 초기 로드 시 즉시 체크
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
    }

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    delay: Math.random() * 4,
    left: Math.random() * 100,
  }));

  return (
    <SectionWrapper ref={sectionRef} id="milestones" aria-label="마일스톤 섹션">
      <ParticlesContainer>
        {isVisible &&
          particles.map((p, i) => (
            <Particle key={i} $delay={p.delay} $left={p.left} />
          ))}
      </ParticlesContainer>

      <Container>
        <Header $isVisible={isVisible}>
          <Title>MILESTONES</Title>
          <Subtitle>우리가 걸어온 길, 그리고 만들어갈 미래</Subtitle>
        </Header>

        <TimelineWrapper>
          <TimelineLine $isVisible={isVisible} />

          {milestones.map((milestone, index) => (
            <MilestoneItem key={index} $index={index} $isVisible={isVisible}>
              <MilestoneDate
                className="milestone-date"
                $index={index}
                $isVisible={isVisible}
              >
                <DateText>{milestone.date}</DateText>
              </MilestoneDate>

              <MilestoneDot
                className="milestone-dot"
                $index={index}
                $isVisible={isVisible}
              />

              <MilestoneContent
                className="milestone-content"
                $index={index}
                $isVisible={isVisible}
              >
                <MilestoneTitle>{milestone.title}</MilestoneTitle>
                <MilestoneDescription>
                  {milestone.description}
                </MilestoneDescription>
              </MilestoneContent>
            </MilestoneItem>
          ))}
        </TimelineWrapper>
      </Container>
    </SectionWrapper>
  );
}
