"use client";

import styled from "styled-components";
import { Container } from "@/components/common/Container";
import content from "@/data/content.json";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.neutral[0]};
  padding: ${({ theme }) => theme.spacing.xl} 0;

  ${({ theme }) => theme.media.tabletUp} {
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }
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
  max-width: 100%;
`;

const FooterLogo = styled.div`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FooterDescription = styled.p`
  ${({ theme }) => theme.typography.body2}
  color: rgba(255, 255, 255, 0.8);

  ${({ theme }) => theme.media.tabletUp} {
    white-space: nowrap;
  }
`;

const FooterBottom = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.3);
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
  color: rgba(255, 255, 255, 0.7);
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.media.tabletUp} {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const InfoItem = styled.span`
  ${({ theme }) => theme.typography.caption}
  color: rgba(255, 255, 255, 0.7);

  strong {
    color: rgba(255, 255, 255, 0.9);
    margin-right: 4px;
  }
`;

interface FooterProps {
  description?: string;
}

export function Footer({ description }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { footer } = content;

  return (
    <FooterWrapper role="contentinfo">
      <Container>
        <FooterInner>
          <FooterBrand>
            <FooterLogo>{footer.company.name}</FooterLogo>
            <FooterDescription>
              {description || footer.description}
            </FooterDescription>
          </FooterBrand>
        </FooterInner>

        <FooterBottom>
          <CompanyInfo>
            <InfoItem>
              <strong>회사명</strong>{footer.company.name}
            </InfoItem>
            <InfoItem>
              <strong>대표자</strong>{footer.company.ceo}
            </InfoItem>
            <InfoItem>
              <strong>이메일</strong>{footer.company.email}
            </InfoItem>
            <InfoItem>
              <strong>연락처</strong>{footer.company.phone}
            </InfoItem>
          </CompanyInfo>
          <Copyright>
            &copy; {currentYear} YP. All rights reserved.
          </Copyright>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
}
