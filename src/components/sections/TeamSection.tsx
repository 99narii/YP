"use client";

import { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
}

interface TeamSectionProps {
  members: TeamMember[];
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
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

const Header = styled.div<{ $isVisible: boolean }>`
  text-align: center;
  margin-bottom: 60px;
  opacity: 0;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    margin-bottom: 80px;
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  gap: 24px;

  ${({ theme }) => theme.media.tabletUp} {
    gap: 40px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
`;

const MemberCard = styled.div<{ $index: number; $isVisible: boolean }>`
  opacity: 0;
  display: flex;
  flex-direction: column;

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: ${0.2 + $index * 0.15}s;
    `}
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const ImageWrapper = styled.div<{ $index: number; $isVisible: boolean }>`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0;

  ${({ theme }) => theme.media.tabletUp} {
    width: 150px;
    height: 150px;
  }

  @media (min-width: 1024px) {
    width: 180px;
    height: 180px;
  }

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${scaleIn} 0.6s ease-out forwards;
      animation-delay: ${0.3 + $index * 0.15}s;
    `}
`;

const ContentBox = styled.div<{ $index: number; $isVisible: boolean }>`
  position: relative;
  width: 100%;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-left: 1px solid rgba(255, 255, 255, 0.6);
  border-right: 1px solid rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  opacity: 0;

  ${({ theme }) => theme.media.tabletUp} {
    padding: ${({ theme }) => theme.spacing.lg};
    padding-top: ${({ theme }) => theme.spacing.md};
  }

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.6s ease-out forwards;
      animation-delay: ${0.4 + $index * 0.15}s;
    `}
`;

const MemberImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.5s ease;

  ${MemberCard}:hover & {
    transform: scale(1.05);
  }
`;

const NameRole = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const MemberName = styled.h3`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};

  ${({ theme }) => theme.media.tabletUp} {
    font-size: 1.25rem;
  }
`;

const Divider = styled.span`
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.5;
`;

const MemberRole = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #FFD700;
  letter-spacing: 0.02em;

  ${({ theme }) => theme.media.tabletUp} {
    font-size: 1rem;
  }
`;

const MemberDescription = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.8;
  line-height: 1.5;

  @media (min-width: 1024px) {
    font-size: 16px;
    line-height: 1.6;
  }
`;

export function TeamSection({ members }: TeamSectionProps) {
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

    // 초기 로드 시 즉시 체크
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
    }

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper ref={sectionRef} id="team" aria-label="팀 소개 섹션">
      <Container>
        <Header $isVisible={isVisible}>
          <Title>OUR TEAM</Title>
          <Subtitle>열정과 전문성을 갖춘 팀원들이 브랜드의 성공을 위해 함께합니다</Subtitle>
        </Header>

        <TeamGrid>
          {members.map((member, index) => (
            <MemberCard key={index} $index={index} $isVisible={isVisible}>
              <ImageContainer>
                <ImageWrapper $index={index} $isVisible={isVisible}>
                  <MemberImage
                    src={member.imageSrc}
                    alt={`${member.name} - ${member.role}`}
                    fill
                  />
                </ImageWrapper>
                <ContentBox $index={index} $isVisible={isVisible}>
                  <NameRole>
                    <MemberName>{member.name}</MemberName>
                    <Divider>|</Divider>
                    <MemberRole>{member.role}</MemberRole>
                  </NameRole>
                  <MemberDescription>{member.description}</MemberDescription>
                </ContentBox>
              </ImageContainer>
            </MemberCard>
          ))}
        </TeamGrid>
      </Container>
    </SectionWrapper>
  );
}
