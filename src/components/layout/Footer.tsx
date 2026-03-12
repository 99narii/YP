"use client";

import styled from "styled-components";
import Link from "next/link";
import { Container } from "@/components/common/Container";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.neutral[900]};
  color: ${({ theme }) => theme.colors.neutral[0]};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.tabletUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const FooterBrand = styled.div`
  max-width: 300px;
`;

const FooterLogo = styled.div`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FooterDescription = styled.p`
  ${({ theme }) => theme.typography.body2}
  color: ${({ theme }) => theme.colors.neutral[300]};
`;

const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.tabletUp} {
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const FooterNavSection = styled.div``;

const FooterNavTitle = styled.h3`
  ${({ theme }) => theme.typography.overline}
  color: ${({ theme }) => theme.colors.neutral[0]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FooterNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterNavLink = styled(Link)`
  ${({ theme }) => theme.typography.body2}
  color: ${({ theme }) => theme.colors.neutral[300]};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[0]};
  }
`;

const FooterBottom = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[700]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.tabletUp} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  ${({ theme }) => theme.typography.caption}
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

interface FooterProps {
  description?: string;
}

export function Footer({ description }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper role="contentinfo">
      <Container>
        <FooterInner>
          <FooterBrand>
            <FooterLogo>New Thinks</FooterLogo>
            <FooterDescription>
              {description || "Influence That Converts. 전환을 만드는 영향력."}
            </FooterDescription>
          </FooterBrand>

          <FooterNav aria-label="푸터 네비게이션">
            <FooterNavSection>
              <FooterNavTitle>Services</FooterNavTitle>
              <FooterNavList>
                <li>
                  <FooterNavLink href="#strategy">Strategy</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="#creative">Creative</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="#analytics">Analytics</FooterNavLink>
                </li>
              </FooterNavList>
            </FooterNavSection>

            <FooterNavSection>
              <FooterNavTitle>Company</FooterNavTitle>
              <FooterNavList>
                <li>
                  <FooterNavLink href="#about">About</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="#contact">Contact</FooterNavLink>
                </li>
              </FooterNavList>
            </FooterNavSection>
          </FooterNav>
        </FooterInner>

        <FooterBottom>
          <Copyright>
            &copy; {currentYear} New Thinks. All rights reserved.
          </Copyright>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
}
