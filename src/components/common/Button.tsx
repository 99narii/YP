"use client";

import styled, { css } from "styled-components";

interface ButtonProps {
  $variant?: "primary" | "secondary" | "outline" | "ghost";
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
}

const buttonSizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 0.875rem;
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: 1rem;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
    font-size: 1.125rem;
  `,
};

const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.blue[500]};
    color: ${({ theme }) => theme.colors.neutral[0]};
    box-shadow: ${({ theme }) => theme.shadows.button};

    &:hover {
      background-color: ${({ theme }) => theme.colors.blue[600]};
      box-shadow: ${({ theme }) => theme.shadows.buttonHover};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.neutral[900]};
    color: ${({ theme }) => theme.colors.neutral[0]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[700]};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.neutral[900]};
    border: 2px solid ${({ theme }) => theme.colors.neutral[900]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[900]};
      color: ${({ theme }) => theme.colors.neutral[0]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.neutral[900]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
  letter-spacing: 0.02em;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.smooth};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $size = "md" }) => buttonSizes[$size]}
  ${({ $variant = "primary" }) => buttonVariants[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

// 링크 스타일 버튼
export const LinkButton = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
  letter-spacing: 0.02em;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.smooth};
  text-decoration: none;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $size = "md" }) => buttonSizes[$size]}
  ${({ $variant = "primary" }) => buttonVariants[$variant]}

  &:hover {
    color: ${({ $variant = "primary" }) =>
      $variant === "primary" || $variant === "secondary" ? "inherit" : "inherit"};
  }
`;

// 텍스트 링크 (with underline animation)
export const TextLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-weight: 500;
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.fast};

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.blue[500]};
    transition: ${({ theme }) => theme.transitions.smooth};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.blue[500]};

    &::after {
      width: 100%;
    }
  }
`;
