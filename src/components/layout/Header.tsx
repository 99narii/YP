"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: rgba(0, 132, 255, 0.4);
  backdrop-filter: blur(16px);

  ${({ theme }) => theme.media.tabletUp} {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background-color: transparent;
    backdrop-filter: none;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled(Link)`
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[0]};
  letter-spacing: -0.02em;

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[0]};
  }
`;

// 중앙 네비게이션 - 둥근 border, 불투명 배경
const Nav = styled.nav`
  display: none;

  ${({ theme }) => theme.media.tabletUp} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
`;

const NavLink = styled(Link)`
  ${({ theme }) => theme.typography.body1}
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral[0]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[0]};
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const NavDivider = styled.span`
  ${({ theme }) => theme.typography.body1}
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.3;
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

// 우측 Contact 버튼
const ContactButton = styled(Link)`
  display: none;

  ${({ theme }) => theme.media.tabletUp} {
    display: inline-flex;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.neutral[0]};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.neutral[0]};
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

// 모바일 메뉴 버튼
const MobileMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.tabletUp} {
    display: none;
  }
`;

const MenuLine = styled.span<{ $isOpen: boolean; $position: number }>`
  display: block;
  width: 24px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  transition: ${({ theme }) => theme.transitions.smooth};
  transform-origin: center;

  ${({ $isOpen, $position }) => {
    if ($isOpen && $position === 0)
      return "transform: rotate(45deg) translateY(10px);";
    if ($isOpen && $position === 1) return "opacity: 0;";
    if ($isOpen && $position === 2)
      return "transform: rotate(-45deg) translateY(-10px);";
    return "";
  }}
`;

// 모바일 메뉴
const MobileNav = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: rgba(0, 132, 255, 0.5);
  backdrop-filter: blur(16px);
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  transform: translateY(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: ${({ theme }) => theme.transitions.smooth};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: ${({ theme }) => theme.zIndex.header};

  ${({ theme }) => theme.media.tabletUp} {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral[0]};
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  pageLinks?: NavItem[];
  sectionLinks?: NavItem[];
}

export function Header({ pageLinks = [], sectionLinks = [] }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allLinks = [...pageLinks, ...sectionLinks];

  return (
    <>
      <HeaderWrapper role="banner">
        <HeaderInner>
          <Logo href="/" aria-label="홈으로 이동">
            YP
          </Logo>

          <Nav role="navigation" aria-label="메인 네비게이션">
            {pageLinks.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
            {pageLinks.length > 0 && sectionLinks.length > 0 && (
              <NavDivider>|</NavDivider>
            )}
            {sectionLinks.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </Nav>

          <ContactButton href="#contact">CONTACT</ContactButton>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMobileMenuOpen}
          >
            <MenuLine $isOpen={isMobileMenuOpen} $position={0} />
            <MenuLine $isOpen={isMobileMenuOpen} $position={1} />
            <MenuLine $isOpen={isMobileMenuOpen} $position={2} />
          </MobileMenuButton>
        </HeaderInner>
      </HeaderWrapper>

      <MobileNav
        $isOpen={isMobileMenuOpen}
        role="navigation"
        aria-label="모바일 네비게이션"
      >
        {allLinks.map((item) => (
          <MobileNavLink
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </MobileNavLink>
        ))}
        <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
          Contact
        </MobileNavLink>
      </MobileNav>
    </>
  );
}
