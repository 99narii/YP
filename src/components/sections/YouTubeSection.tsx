"use client";

import { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import content from "@/data/content.json";

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
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const countUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 80px 0;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.blue[500]} 0%,
    #001a33 100%
  );
  overflow: hidden;

  ${({ theme }) => theme.media.tabletUp} {
    padding: 120px 0;
  }
`;

const BackgroundOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Orb = styled.div<{ $top: number; $left: number; $size: number; $delay: number }>`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.blue[50]}26 0%,
    ${({ theme }) => theme.colors.blue[50]}00 70%
  );
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 1;
`;

const IntroSection = styled.div<{ $isVisible: boolean }>`
  max-width: 900px;
  margin: 0 auto 80px;
  text-align: center;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    margin-bottom: 100px;
  }
`;

const Overline = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue[50]};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
`;

const IntroTitle = styled.h2`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.4;
`;

const IntroParagraph = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.85;
  line-height: 1.9;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const PerformanceSection = styled.div<{ $isVisible: boolean }>`
  margin-bottom: 80px;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.2s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    margin-bottom: 100px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h3`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionDescription = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.7;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 50px;

  ${({ theme }) => theme.media.tabletUp} {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

const AchievementCard = styled.div<{ $index: number; $isVisible: boolean }>`
  position: relative;
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  text-align: center;
  overflow: hidden;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${scaleIn} 0.6s ease-out forwards;
      animation-delay: ${0.3 + $index * 0.1}s;
    `}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.blue[50]}, ${({ theme }) => theme.colors.blue[100]}, ${({ theme }) => theme.colors.blue[50]});
    background-size: 200% 100%;
    animation: ${shimmer} 3s linear infinite;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  ${({ theme }) => theme.media.tabletUp} {
    padding: 40px 30px;
  }
`;

const AchievementNumber = styled.div`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue[50]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-shadow: 0 0 30px ${({ theme }) => theme.colors.blue[50]}4D;
`;

const AchievementLabel = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.9;
  line-height: 1.5;
`;

const ChannelsSection = styled.div<{ $isVisible: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 80px;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.4s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
`;

const ChannelCard = styled.div`
  position: relative;
  padding: 40px 30px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  ${({ theme }) => theme.media.tabletUp} {
    padding: 50px 40px;
  }
`;

const ChannelIcon = styled.div<{ $type: "youtube" | "sns" }>`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${({ $type }) =>
    $type === "youtube"
      ? "linear-gradient(135deg, #FF0000 0%, #CC0000 100%)"
      : "linear-gradient(135deg, #E4405F 0%, #833AB4 50%, #405DE6 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: ${pulse} 3s ease-in-out infinite;

  svg {
    width: 30px;
    height: 30px;
    fill: white;
  }
`;

const ChannelTitle = styled.h4`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChannelStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatItem = styled.div<{ $index: number; $isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${countUp} 0.5s ease-out forwards;
      animation-delay: ${0.6 + $index * 0.1}s;
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.blue[50]}33;
    transition: all 0.3s ease;
  }
`;

const StatLabel = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.8;
`;

const StatValue = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue[50]};
`;

const StatLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue[50]}1A;
  border: 1px solid ${({ theme }) => theme.colors.blue[50]}33;
  color: ${({ theme }) => theme.colors.blue[50]};
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blue[50]}33;
    transform: translateX(3px);
  }
`;

const ClosingSection = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  text-align: center;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.6s;
    `}
`;

const ClosingText = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  line-height: 1.9;
`;

export function YouTubeSection() {
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

  const achievements = [
    { number: "3억+", label: "킴브로 유튜브 채널\n총 조회수" },
    { number: "10억+", label: "콘텐츠 마케팅 프로젝트\n누적 조회수" },
    { number: "1년", label: "100만 구독자\n달성 기간" },
  ];

  const { social } = content;

  const youtubeChannels = [
    { label: "메인 채널", value: "115만", link: social.youtube },
    { label: "서브 채널", value: "19만" },
    { label: "마케팅 채널 1", value: "41만" },
    { label: "마케팅 채널 2", value: "8만" },
    { label: "마케팅 채널 3", value: "6만" },
  ];

  const snsChannels = [
    { label: "틱톡", value: "22만", link: social.tiktok },
    { label: "인스타그램", value: "8.6만", link: social.instagram },
  ];

  const orbs = [
    { top: 10, left: 10, size: 200, delay: 0 },
    { top: 60, left: 80, size: 150, delay: 1 },
    { top: 30, left: 60, size: 100, delay: 2 },
    { top: 80, left: 20, size: 180, delay: 1.5 },
  ];

  return (
    <SectionWrapper ref={sectionRef} id="youtube" aria-label="유튜브 섹션">
      <BackgroundOrbs>
        {orbs.map((orb, i) => (
          <Orb
            key={i}
            $top={orb.top}
            $left={orb.left}
            $size={orb.size}
            $delay={orb.delay}
          />
        ))}
      </BackgroundOrbs>

      <Container>
        <IntroSection $isVisible={isVisible}>
          <Overline>CONTENT IP</Overline>
          <IntroTitle>콘텐츠 IP 제작 및 채널 운영</IntroTitle>
          <IntroParagraph>
            와이피는 115만 구독자를 보유한 유튜브 채널 킴브로를 중심으로 다양한
            콘텐츠 IP를 기획하고 제작하며 채널을 운영하고 있습니다.
          </IntroParagraph>
          <IntroParagraph>
            콘텐츠 기획, 제작, 채널 운영 경험을 바탕으로 지속적으로 새로운 콘텐츠
            포맷을 개발하고 있으며 콘텐츠의 영향력이 실제 브랜드 성장과 비즈니스
            성과로 이어질 수 있는 콘텐츠 전략을 만들어가고 있습니다.
          </IntroParagraph>
          <IntroParagraph>
            와이피는 단순한 콘텐츠 제작을 넘어 콘텐츠 기반 채널 성장과 콘텐츠
            비즈니스 확장을 함께 만들어가고 있습니다.
          </IntroParagraph>
        </IntroSection>

        <PerformanceSection $isVisible={isVisible}>
          <SectionHeader>
            <SectionTitle>Channel Performance</SectionTitle>
            <SectionDescription>
              와이피는 다양한 플랫폼에서 콘텐츠를 운영하며 지속적으로 채널 성장을
              만들어가고 있습니다.
            </SectionDescription>
          </SectionHeader>

          <AchievementsGrid>
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} $index={index} $isVisible={isVisible}>
                <AchievementNumber>{achievement.number}</AchievementNumber>
                <AchievementLabel style={{ whiteSpace: "pre-line" }}>
                  {achievement.label}
                </AchievementLabel>
              </AchievementCard>
            ))}
          </AchievementsGrid>
        </PerformanceSection>

        <ChannelsSection $isVisible={isVisible}>
          <ChannelCard>
            <ChannelIcon $type="youtube">
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </ChannelIcon>
            <ChannelTitle>콘텐츠 채널 운영</ChannelTitle>
            <ChannelStats>
              {youtubeChannels.map((channel, index) => (
                <StatItem key={index} $index={index} $isVisible={isVisible}>
                  <StatLeft>
                    <StatLabel>{channel.label}</StatLabel>
                    {channel.link && (
                      <LinkButton
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${channel.label} 바로가기`}
                      >
                        →
                      </LinkButton>
                    )}
                  </StatLeft>
                  <StatValue>{channel.value} 구독자</StatValue>
                </StatItem>
              ))}
            </ChannelStats>
          </ChannelCard>

          <ChannelCard>
            <ChannelIcon $type="sns">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </ChannelIcon>
            <ChannelTitle>SNS 채널</ChannelTitle>
            <ChannelStats>
              {snsChannels.map((channel, index) => (
                <StatItem key={index} $index={index} $isVisible={isVisible}>
                  <StatLeft>
                    <StatLabel>{channel.label}</StatLabel>
                    {channel.link && (
                      <LinkButton
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${channel.label} 바로가기`}
                      >
                        →
                      </LinkButton>
                    )}
                  </StatLeft>
                  <StatValue>{channel.value} 팔로워</StatValue>
                </StatItem>
              ))}
            </ChannelStats>
          </ChannelCard>
        </ChannelsSection>

        <ClosingSection $isVisible={isVisible}>
          <ClosingText>
            와이피는 유튜브와 SNS 채널 운영 경험을 기반으로 콘텐츠 기획부터 채널
            성장 전략까지 콘텐츠 비즈니스 전반을 구축해 나가고 있습니다.
          </ClosingText>
        </ClosingSection>
      </Container>
    </SectionWrapper>
  );
}
