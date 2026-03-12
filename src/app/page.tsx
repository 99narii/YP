"use client";

import styled from "styled-components";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VisionSection } from "@/components/sections/VisionSection";
import { MilestonesSection } from "@/components/sections/MilestonesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import {
  Container,
  Section,
  H2,
  BodyLarge,
  Body,
  Overline,
  AnimatedElement,
} from "@/components/common";
import content from "@/data/content.json";
import planAnimation from "@/../../public/lottie/plan.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// 전체 페이지 래퍼 - 프라이머리 배경
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blue[500]};
  min-height: 100vh;
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

// 이미지 영역 (상단 70%)
const HeroImageArea = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 500px;
  z-index: 2;

  ${({ theme }) => theme.media.tabletUp} {
    height: 75vh;
  }
`;

const HeroImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const HeroImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 132, 255, 0.3) 0%,
    rgba(0, 132, 255, 0.3) 80%,
    rgba(0, 132, 255, 0.7) 92%,
    rgba(0, 132, 255, 1) 100%
  );
  z-index: 4;
`;

// 텍스트 영역 (하단)
const HeroTextArea = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 10vh;
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.blue[500]};
`;

// 히어로 콘텐츠 레이아웃 - 좌우 분할
const HeroContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;

  ${({ theme }) => theme.media.tabletUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

// 좌측 QR 영역
const QRSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const QRImageWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
`;

const QRImage = styled(Image)`
  object-fit: contain;
`;

const QRLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral[0]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// 우측 설명 영역
const DescriptionSection = styled.div`
  max-width: 500px;

  ${({ theme }) => theme.media.tabletUp} {
    text-align: right;
  }
`;

const DescriptionHeadline = styled(Body)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DescriptionBody = styled(Body)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.85;
`;

// 마퀴 애니메이션
const marqueeAnimation = `
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const MarqueeWrapper = styled.div`
  position: absolute;
  top: 60vh;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  transform: translateY(-50%);

  ${({ theme }) => theme.media.tabletUp} {
    top: 65vh;
  }

  ${marqueeAnimation}
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: fit-content;
  animation: marquee 60s linear infinite;
`;

// 마퀴 텍스트 컨테이너 - 블러 레이어 포함
const MarqueeTextContainer = styled.span`
  position: relative;
  display: inline-block;
`;

// 선명한 텍스트 (상단) - 하단으로 갈수록 서서히 페이드
const MarqueeTextClear = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  white-space: nowrap;
  display: block;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 0) 70%
  );
`;

// 블러 텍스트 (하단) - 상단에서 서서히 나타남
const MarqueeTextBlur = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(8px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
`;

// 공통 섹션 스타일 (프라이머리 배경 위)
const SectionStyled = styled(Section)`
  background-color: transparent;
`;

const SectionTitle = styled(H2)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionOverline = styled(Overline)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
`;

const SectionDescription = styled(BodyLarge)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.9;
  max-width: 800px;
`;

// About 섹션
const AboutSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.blue[500]};
`;

const AboutLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.tabletUp} {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const AboutLottieWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 auto;

  ${({ theme }) => theme.media.tabletUp} {
    max-width: none;
    margin: 0;
  }
`;

const AboutContent = styled.div`
  flex: 1;
`;

const AboutOverline = styled(Overline)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
`;

const AboutTitle = styled(H2)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: var(--font-noto-sans-kr), sans-serif;
`;

const AboutDescription = styled(BodyLarge)`
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.9;
  white-space: pre-line;
`;

// Main Content
const Main = styled.main``;

// 네비게이션 아이템
const navItems = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Team", href: "#team" },
  { label: "YouTube", href: "#youtube" },
  { label: "Academy", href: "#academy" },
];

export default function Home() {
  const { hero, sections } = content;

  return (
    <PageWrapper>
      <Header navItems={navItems} />

      <Main role="main">
        {/* Hero Section */}
        <HeroSection id="hero" aria-label="히어로 섹션">
          {/* Marquee Animation - 이미지 뒤에서 슬라이드 */}
          <MarqueeWrapper>
            <MarqueeTrack>
              {[...Array(4)].map((_, i) => (
                <MarqueeTextContainer key={i}>
                  <MarqueeTextClear>{hero.marquee.text}</MarqueeTextClear>
                  <MarqueeTextBlur aria-hidden="true">
                    {hero.marquee.text}
                  </MarqueeTextBlur>
                </MarqueeTextContainer>
              ))}
            </MarqueeTrack>
          </MarqueeWrapper>

          {/* 이미지 영역 */}
          <HeroImageArea>
            <HeroImageWrapper>
              <HeroImage
                src="/images/plastic.png"
                alt=""
                fill
                priority
                aria-hidden="true"
              />
            </HeroImageWrapper>
            <HeroOverlay />
          </HeroImageArea>

          {/* 텍스트 영역 */}
          <HeroTextArea>
            <Container>
              <HeroContentLayout>
                {/* 좌측: QR 코드 */}
                <AnimatedElement animation="fadeUp" delay={0}>
                  <QRSection>
                    <QRImageWrapper>
                      <QRImage
                        src={hero.qr.imageSrc}
                        alt={hero.qr.imageAlt}
                        fill
                      />
                    </QRImageWrapper>
                    <QRLabel>{hero.qr.label}</QRLabel>
                  </QRSection>
                </AnimatedElement>

                {/* 우측: 설명 텍스트 */}
                <AnimatedElement animation="fadeUp" delay={200}>
                  <DescriptionSection>
                    <DescriptionHeadline>
                      {hero.description.headline}
                    </DescriptionHeadline>
                    <DescriptionBody>{hero.description.body}</DescriptionBody>
                  </DescriptionSection>
                </AnimatedElement>
              </HeroContentLayout>
            </Container>
          </HeroTextArea>
        </HeroSection>

        {/* About Us Section */}
        <AboutSection id="about" aria-label="회사 소개 섹션">
          <Container>
            <AnimatedElement animation="fadeUp" delay={0}>
              <AboutLayout>
                {/* 좌측: Lottie 애니메이션 */}
                <AboutLottieWrapper>
                  <Lottie animationData={planAnimation} loop autoplay />
                </AboutLottieWrapper>

                {/* 우측: 텍스트 콘텐츠 */}
                <AboutContent>
                  <AboutOverline>{sections.about.overline}</AboutOverline>
                  <AboutTitle>{sections.about.title}</AboutTitle>
                  <AboutDescription>
                    {sections.about.description}
                  </AboutDescription>
                </AboutContent>
              </AboutLayout>
            </AnimatedElement>
          </Container>
        </AboutSection>

        {/* Vision Section */}
        <VisionSection
          cards={sections.vision.cards}
          finalText={sections.vision.finalText}
        />

        {/* Milestones Section */}
        <MilestonesSection milestones={sections.milestones.items} />

        {/* Our Team Section */}
        <TeamSection members={sections.team.members} />

        {/* YouTube Channel Link Section */}
        <SectionStyled id="youtube" aria-label="유튜브 채널 섹션">
          <Container>
            <AnimatedElement>
              <SectionOverline>{sections.youtube.overline}</SectionOverline>
              <SectionTitle>{sections.youtube.title}</SectionTitle>
              <SectionDescription>
                {sections.youtube.description}
              </SectionDescription>
            </AnimatedElement>
          </Container>
        </SectionStyled>

        {/* YouTube Introduction Section */}
        <SectionStyled id="youtube-intro" aria-label="유튜브 소개 섹션">
          <Container>
            <AnimatedElement>
              <SectionOverline>
                {sections.youtubeIntro.overline}
              </SectionOverline>
              <SectionTitle>{sections.youtubeIntro.title}</SectionTitle>
              <SectionDescription>
                {sections.youtubeIntro.description}
              </SectionDescription>
            </AnimatedElement>
          </Container>
        </SectionStyled>

        {/* Marketing Section */}
        <SectionStyled id="marketing" aria-label="마케팅 섹션">
          <Container>
            <AnimatedElement>
              <SectionOverline>{sections.marketing.overline}</SectionOverline>
              <SectionTitle>{sections.marketing.title}</SectionTitle>
              <SectionDescription>
                {sections.marketing.description}
              </SectionDescription>
            </AnimatedElement>
          </Container>
        </SectionStyled>

        {/* Academy Section */}
        <SectionStyled id="academy" aria-label="아카데미 섹션">
          <Container>
            <AnimatedElement>
              <SectionOverline>{sections.academy.overline}</SectionOverline>
              <SectionTitle>{sections.academy.title}</SectionTitle>
              <SectionDescription>
                {sections.academy.description}
              </SectionDescription>
            </AnimatedElement>
          </Container>
        </SectionStyled>

        {/* Contact Section */}
        <SectionStyled id="contact" aria-label="연락처 섹션">
          <Container>
            <AnimatedElement>
              <SectionOverline>{sections.contact.overline}</SectionOverline>
              <SectionTitle>{sections.contact.title}</SectionTitle>
              <SectionDescription>
                {sections.contact.description}
              </SectionDescription>
            </AnimatedElement>
          </Container>
        </SectionStyled>
      </Main>

      <Footer />
    </PageWrapper>
  );
}
