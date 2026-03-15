"use client";

import { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import dynamic from "next/dynamic";
import content from "@/data/content.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Custom hook to fetch Lottie animation from public folder
function useLottieAnimation(path: string) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, [path]);

  return animationData;
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
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const ContentLayout = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.2s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const LottieWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 auto;

  ${({ theme }) => theme.media.tabletUp} {
    max-width: none;
    margin: 0;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const Overline = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  ${({ theme }) => theme.typography.caption}
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue[50]};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
`;

const Description = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.9;
  line-height: 1.8;
  white-space: pre-line;
`;

const ItemList = styled.ul`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Item = styled.li<{ $index: number; $isVisible: boolean }>`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral[0]};
  line-height: 1.8;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.6s ease-out forwards;
      animation-delay: ${0.4 + $index * 0.15}s;
    `}

  &::before {
    content: "";
    display: block;
    width: 3px;
    height: 1.2em;
    background: ${({ theme }) => theme.colors.blue[50]};
    border-radius: 2px;
    flex-shrink: 0;
  }
`;

const Closing = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.9;
  line-height: 1.8;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { sections } = content;
  const businessAnimation = useLottieAnimation("/lottie/business.json");

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
    <SectionWrapper ref={sectionRef} id="business" aria-label="사업 영역 섹션">
      <Container>
        <ContentLayout $isVisible={isVisible}>
          <LottieWrapper>
            {businessAnimation && (
              <Lottie animationData={businessAnimation} loop autoplay />
            )}
          </LottieWrapper>

          <TextContent>
            <Overline>{sections.ourBusiness.overline}</Overline>
            <Description>{sections.ourBusiness.description}</Description>
            <ItemList>
              {sections.ourBusiness.items.map((item, index) => (
                <Item key={index} $index={index} $isVisible={isVisible}>
                  {item}
                </Item>
              ))}
            </ItemList>
            <Closing>{sections.ourBusiness.closing}</Closing>
          </TextContent>
        </ContentLayout>
      </Container>
    </SectionWrapper>
  );
}
