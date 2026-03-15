"use client";

import { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

interface ResultModalProps {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const checkmarkDraw = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const circleFill = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  z-index: 10000;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  animation: ${slideUp} 0.3s ease-out;
`;

const IconWrapper = styled.div<{ $type: "success" | "error" }>`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${circleFill} 0.4s ease-out;

  ${({ $type }) =>
    $type === "success"
      ? css`
          background: linear-gradient(
            135deg,
            ${({ theme }) => theme.colors.blue[400]} 0%,
            ${({ theme }) => theme.colors.blue[600]} 100%
          );
        `
      : css`
          background: linear-gradient(135deg, #f87171 0%, #dc2626 100%);
          animation: ${circleFill} 0.4s ease-out, ${shake} 0.5s ease-out 0.4s;
        `}
`;

const SuccessIcon = styled.svg`
  width: 40px;
  height: 40px;
  stroke: white;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;

  .checkmark {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: ${checkmarkDraw} 0.4s ease-out 0.3s forwards;
  }
`;

const ErrorIcon = styled.svg`
  width: 40px;
  height: 40px;
  stroke: white;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;

  line {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
    animation: ${checkmarkDraw} 0.3s ease-out 0.3s forwards;

    &:nth-child(2) {
      animation-delay: 0.4s;
    }
  }
`;

const Title = styled.h3`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: 12px;
`;

const Message = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral[500]};
  line-height: 1.6;
  margin-bottom: 32px;
`;

const CloseButton = styled.button`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 48px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.blue[500]} 0%,
    ${({ theme }) => theme.colors.blue[600]} 100%
  );
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export function ResultModal({
  isOpen,
  type,
  title,
  message,
  buttonText = "확인",
  onClose,
}: ResultModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <ModalContainer $isOpen={isOpen} role="dialog" aria-modal="true">
        <IconWrapper $type={type}>
          {type === "success" ? (
            <SuccessIcon viewBox="0 0 40 40">
              <polyline className="checkmark" points="12,20 18,26 28,14" />
            </SuccessIcon>
          ) : (
            <ErrorIcon viewBox="0 0 40 40">
              <line x1="14" y1="14" x2="26" y2="26" />
              <line x1="26" y1="14" x2="14" y2="26" />
            </ErrorIcon>
          )}
        </IconWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>{buttonText}</CloseButton>
      </ModalContainer>
    </>
  );
}
