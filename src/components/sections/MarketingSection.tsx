"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import styled, { keyframes, css } from "styled-components";

interface MarketingSectionProps {
  overline: string;
  title: string;
  paragraphs: string[];
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

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
`;

const drift = keyframes`
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(2px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  75% {
    transform: translate(1px, 1px);
  }
  100% {
    transform: translate(0, 0);
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
  white-space: pre-line;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: ${0.2 + $index * 0.2}s;
    `}
`;

const ConstellationWrapper = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 200px;
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.4s;
    `}

  ${({ theme }) => theme.media.tabletUp} {
    height: 300px;
  }
`;

const ConstellationSpacing = styled.div`
  position: relative;
  height: 200px;
  margin: ${({ theme }) => theme.spacing.xl} 0;

  ${({ theme }) => theme.media.tabletUp} {
    height: 300px;
    margin: ${({ theme }) => theme.spacing.xxl} 0;
  }
`;

const ConstellationSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const Star = styled.circle<{ $delay: number; $duration: number }>`
  fill: ${({ theme }) => theme.colors.blue[50]};
  animation: ${twinkle} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transition: cx 1.5s ease-in-out, cy 1.5s ease-in-out, r 1.5s ease-in-out;
`;

const StarGlow = styled.circle<{ $delay: number }>`
  fill: ${({ theme }) => theme.colors.blue[50]};
  opacity: 0.15;
  filter: blur(1.5px);
  animation: ${pulse} 8s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transition: cx 1.5s ease-in-out, cy 1.5s ease-in-out, r 1.5s ease-in-out;
`;

const ConstellationLine = styled.line<{ $delay: number }>`
  stroke: ${({ theme }) => theme.colors.blue[50]};
  stroke-width: 0.3;
  opacity: 0;
  animation: ${pulse} 10s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transition: x1 1.5s ease-in-out, y1 1.5s ease-in-out, x2 1.5s ease-in-out, y2 1.5s ease-in-out;
`;

const NodeGroup = styled.g<{ $delay: number }>`
  animation: ${drift} ${({ $delay }) => 20 + $delay * 2}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

interface ConstellationNode {
  id: number;
  x: number;
  y: number;
  size: number;
  connections: number[];
}

function generateConstellation(): ConstellationNode[] {
  const nodeCount = 8 + Math.floor(Math.random() * 5);
  const nodes: ConstellationNode[] = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      x: 5 + Math.random() * 90,
      y: 15 + Math.random() * 70,
      size: 0.5 + Math.random() * 0.8,
      connections: [],
    });
  }

  // Create connections (each node connects to 1-2 nearby nodes)
  nodes.forEach((node, i) => {
    const otherNodes = nodes
      .filter((_, j) => j !== i && !node.connections.includes(j))
      .map((other) => ({
        index: nodes.indexOf(other),
        distance: Math.sqrt(
          Math.pow(other.x - node.x, 2) + Math.pow(other.y - node.y, 2)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    const connectionCount = 1 + Math.floor(Math.random() * 2);
    for (let c = 0; c < Math.min(connectionCount, otherNodes.length); c++) {
      if (!node.connections.includes(otherNodes[c].index)) {
        node.connections.push(otherNodes[c].index);
        nodes[otherNodes[c].index].connections.push(i);
      }
    }
  });

  return nodes;
}

function Constellation() {
  const [nodes, setNodes] = useState<ConstellationNode[]>([]);

  useEffect(() => {
    setNodes(generateConstellation());

    const interval = setInterval(() => {
      setNodes(generateConstellation());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const renderedLines = useMemo(() => {
    const lines: { from: number; to: number; key: string }[] = [];
    const added = new Set<string>();

    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const key = [Math.min(node.id, targetId), Math.max(node.id, targetId)].join("-");
        if (!added.has(key)) {
          added.add(key);
          lines.push({ from: node.id, to: targetId, key });
        }
      });
    });

    return lines;
  }, [nodes]);

  if (nodes.length === 0) return null;

  return (
    <ConstellationSVG viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {/* Lines */}
      {renderedLines.map((line, i) => {
        const fromNode = nodes[line.from];
        const toNode = nodes[line.to];
        return (
          <ConstellationLine
            key={line.key}
            x1={`${fromNode.x}%`}
            y1={`${fromNode.y}%`}
            x2={`${toNode.x}%`}
            y2={`${toNode.y}%`}
            $delay={i * 0.2}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <NodeGroup key={node.id} $delay={i * 0.3}>
          <StarGlow
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size * 3}
            $delay={i * 0.5}
          />
          <Star
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            $delay={i * 0.3}
            $duration={3 + Math.random() * 2}
          />
        </NodeGroup>
      ))}
    </ConstellationSVG>
  );
}

export function MarketingSection({ overline, title, paragraphs }: MarketingSectionProps) {
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
    <SectionWrapper ref={sectionRef} id="marketing" aria-label="마케팅 섹션">
      <Container>
        <ContentWrapper>
          <Overline $isVisible={isVisible}>{overline}</Overline>
          <Title $isVisible={isVisible}>{title}</Title>

          <Paragraph $index={0} $isVisible={isVisible}>
            {paragraphs[0]}
          </Paragraph>

          <ConstellationSpacing>
            <ConstellationWrapper $isVisible={isVisible}>
              <Constellation />
            </ConstellationWrapper>
          </ConstellationSpacing>

          <Paragraph $index={1} $isVisible={isVisible}>
            {paragraphs[1]}
          </Paragraph>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
}
