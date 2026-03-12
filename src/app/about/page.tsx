"use client";

import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { MilestonesSection } from "@/components/sections/MilestonesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { YouTubeSection } from "@/components/sections/YouTubeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingButtons } from "@/components/common";
import content from "@/data/content.json";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blue[500]};
  min-height: 100vh;
`;

const Main = styled.main``;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
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
    rgba(0, 132, 255, 0.4) 0%,
    rgba(0, 132, 255, 0.5) 50%,
    rgba(0, 132, 255, 0.8) 80%,
    rgba(0, 132, 255, 1) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: left;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  max-width: 1440px;
  width: 100%;
`;

const HeroOverline = styled.span<{ $mounted: boolean }>`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: ${({ $mounted }) => ($mounted ? 0 : 1)};

  ${({ $mounted }) =>
    $mounted &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.3s;
    `}
`;

const HeroTitle = styled.p<{ $mounted: boolean }>`
  opacity: ${({ $mounted }) => ($mounted ? 0 : 1)};

  ${({ $mounted }) =>
    $mounted &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.8s;
    `}

  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.25rem, 4vw, 2.25rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.9;
`

const HeroStrong = styled.strong`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
`;

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const sectionLinks = [
  { label: "Business", href: "#business" },
  { label: "Milestones", href: "#milestones" },
  { label: "Our Value", href: "#team" },
  { label: "YouTube", href: "#youtube" },
];

export default function AboutPage() {
  const { sections, aboutHero } = content;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PageWrapper>
      <Header pageLinks={pageLinks} sectionLinks={sectionLinks} />

      <Main role="main">
        {/* Hero Section */}
        <HeroSection>
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
          <HeroContent>
            <HeroOverline $mounted={mounted}>{aboutHero.overline}</HeroOverline>
            <HeroTitle $mounted={mounted}>
              {aboutHero.paragraphs.map((item, index) => (
                <span key={index}>
                  {item.bold ? (
                    <HeroStrong>{item.text}</HeroStrong>
                  ) : (
                    item.text
                  )}
                  {item.break && <br />}
                </span>
              ))}
            </HeroTitle>
          </HeroContent>
        </HeroSection>

        {/* About Us Section */}
        <AboutUsSection />

        {/* Milestones Section */}
        <MilestonesSection milestones={sections.milestones.items} />

        {/* Our Team Section */}
        <TeamSection members={sections.team.members} />

        {/* YouTube Section */}
        <YouTubeSection />

        {/* Contact Section */}
        <ContactSection
          overline={sections.contact.overline}
          title={sections.contact.title}
          paragraphs={sections.contact.paragraphs}
          form={sections.contact.form}
        />
      </Main>

      <FloatingButtons />
      <Footer />
    </PageWrapper>
  );
}
