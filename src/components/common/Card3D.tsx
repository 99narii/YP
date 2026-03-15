"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface Card3DProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
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

const CardWrapper = styled.div<{ $index: number }>`
  perspective: 1000px;
  width: 100%;
  animation: ${float} ${({ $index }) => 3 + $index * 0.5}s ease-in-out infinite;
  animation-delay: ${({ $index }) => $index * 0.2}s;
`;

const GlassCard = styled.div<{ $rotateX: number; $rotateY: number; $isHovered: boolean }>`
  position: relative;
  width: 100%;
  padding: 28px 32px;
  border-radius: 20px;
  transform-style: preserve-3d;
  transform: rotateX(${({ $rotateX }) => $rotateX}deg) rotateY(${({ $rotateY }) => $rotateY}deg);
  transition: transform 0.1s ease-out, box-shadow 0.3s ease;
  cursor: pointer;

  /* Glass effect */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  /* Shadow */
  box-shadow: ${({ $isHovered }) =>
    $isHovered
      ? `0 25px 50px -12px rgba(0, 0, 0, 0.4),
         0 0 40px rgba(59, 130, 246, 0.3),
         inset 0 1px 1px rgba(255, 255, 255, 0.3)`
      : `0 10px 40px -10px rgba(0, 0, 0, 0.3),
         inset 0 1px 1px rgba(255, 255, 255, 0.2)`};

  /* Light reflection */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    border-radius: 20px 20px 100px 100px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }

  /* Shimmer effect on hover */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
    animation: ${shimmer} 1.5s ease-in-out infinite;
    pointer-events: none;
  }

  ${({ theme }) => theme.media.tabletUp} {
    padding: 32px 40px;
  }
`;

const CardInner = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  transform: translateZ(30px);

  ${({ theme }) => theme.media.tabletUp} {
    gap: 32px;
  }
`;

const NumberWrapper = styled.div`
  position: relative;
`;

const CardNumber = styled.span`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 700;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(147, 197, 253, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transform: translateZ(20px);
`;

const NumberGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.3) 0%,
    transparent 70%
  );
  filter: blur(15px);
  z-index: -1;
`;

const CardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateZ(15px);
`;

const CardTitle = styled.h3`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const CardDescription = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
`;

const Particles = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  overflow: hidden;
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: ${float} 2s ease-in-out infinite;
  }

  &::before {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &::after {
    top: 60%;
    right: 15%;
    animation-delay: 0.5s;
  }
`;

export function Card3D({ number, title, description, index }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;

    setRotation({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Reset rotation on touch devices
  useEffect(() => {
    const handleTouchEnd = () => {
      setRotation({ x: 0, y: 0 });
    };

    window.addEventListener("touchend", handleTouchEnd);
    return () => window.removeEventListener("touchend", handleTouchEnd);
  }, []);

  return (
    <CardWrapper $index={index}>
      <GlassCard
        ref={cardRef}
        $rotateX={rotation.x}
        $rotateY={rotation.y}
        $isHovered={isHovered}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Particles $isHovered={isHovered} />
        <CardInner>
          <NumberWrapper>
            <NumberGlow />
            <CardNumber>{number}</CardNumber>
          </NumberWrapper>
          <CardTextWrapper>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardTextWrapper>
        </CardInner>
      </GlassCard>
    </CardWrapper>
  );
}
