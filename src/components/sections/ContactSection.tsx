"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface ContactForm {
  fields: FormField[];
  privacyNotice: string;
  privacyLabel: string;
  submitButton: string;
}

interface ContactSectionProps {
  overline: string;
  title: string;
  paragraphs: string[];
  form: ContactForm;
}

interface ValidationErrors {
  [key: string]: string;
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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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
  max-width: 700px;
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
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible, $index }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: ${0.2 + $index * 0.1}s;
    `}

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FormWrapper = styled.form<{ $isVisible: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  opacity: ${({ $isVisible }) => ($isVisible ? 0 : 1)};

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease-out forwards;
      animation-delay: 0.5s;
    `}
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.caption}
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral[0]};

  span {
    color: ${({ theme }) => theme.colors.blue[50]};
    margin-left: 4px;
  }
`;

const CharCount = styled.span<{ $isOver: boolean }>`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.caption}
  color: ${({ $isOver, theme }) => ($isOver ? theme.colors.system.warning : "rgba(255, 255, 255, 0.5)")};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const inputStyles = css<{ $hasError?: boolean }>`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.body1}
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ $hasError, theme }) =>
    $hasError ? theme.colors.system.warning : theme.colors.blue[50]};
  border-radius: 0;
  color: ${({ theme }) => theme.colors.neutral[0]};
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.system.warning : theme.colors.neutral[0]};
    border-bottom-width: 2px;
  }

  &:hover:not(:focus) {
    border-bottom-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.system.warning : theme.colors.blue[50]};
  }
`;

const Input = styled.input<{ $hasError?: boolean }>`
  ${inputStyles}
  height: 48px;
`;

const Textarea = styled.textarea<{ $hasError?: boolean }>`
  ${inputStyles}
  min-height: 120px;
  resize: vertical;
`;

const ErrorMessage = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.system.warning};
  margin-top: 4px;
`;

const PrivacyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PrivacyNotice = styled.p`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.caption}
  color: ${({ theme }) => theme.colors.neutral[0]};
  opacity: 0.7;
  line-height: 1.6;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomCheckbox = styled.span<{ $checked: boolean }>`
  width: 22px;
  height: 22px;
  border: 2px solid ${({ $checked, theme }) =>
    $checked ? theme.colors.blue[50] : "rgba(255, 255, 255, 0.4)"};
  border-radius: 4px;
  background: ${({ $checked }) =>
    $checked ? "rgba(255, 255, 255, 0.15)" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colors.blue[50]};
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transform: ${({ $checked }) => ($checked ? "scale(1)" : "scale(0.5)")};
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue[50]};
  }
`;

const CheckboxLabel = styled.span`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.body1}
  color: ${({ theme }) => theme.colors.neutral[0]};
`;

const SubmitButton = styled.button<{ $disabled: boolean }>`
  font-family: var(--font-noto-sans-kr), sans-serif;
  ${({ theme }) => theme.typography.body1}
  font-weight: 600;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ $disabled, theme }) =>
    $disabled
      ? theme.colors.blue[50]
      : `linear-gradient(135deg, ${theme.colors.blue[50]} 0%, ${theme.colors.neutral[0]} 100%)`};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.blue[500] : theme.colors.blue[500]};
  border: none;
  border-radius: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  ${({ $disabled }) =>
    !$disabled &&
    css`
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(255, 255, 255, 0.2);
      }

      &:active {
        transform: translateY(0);
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.3) 50%,
          transparent 100%
        );
        background-size: 200% 100%;
        animation: ${shimmer} 2s ease-in-out infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover::after {
        opacity: 1;
      }
    `}
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.tabletUp} {
    grid-template-columns: 1fr 1fr;
  }
`;

// Phone number formatting helper
const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/[^\d]/g, "");

  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else if (numbers.length <= 10) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  }
};

// Get raw phone numbers (without dashes)
const getRawPhoneNumber = (value: string): string => {
  return value.replace(/[^\d]/g, "");
};

export function ContactSection({
  overline,
  title,
  paragraphs,
  form,
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "이름을 입력해주세요";
        if (value.trim().length < 2) return "이름은 2자 이상 입력해주세요";
        if (value.trim().length > 20) return "이름은 20자 이하로 입력해주세요";
        return "";

      case "company":
        if (value.trim() && value.trim().length < 2) return "회사명은 2자 이상 입력해주세요";
        if (value.trim().length > 20) return "회사명은 20자 이하로 입력해주세요";
        return "";

      case "email":
        if (!value.trim()) return "이메일을 입력해주세요";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "올바른 이메일 형식을 입력해주세요";
        return "";

      case "phone":
        const rawPhone = getRawPhoneNumber(value);
        if (!rawPhone) return "연락처를 입력해주세요";
        if (!rawPhone.startsWith("0")) return "연락처는 0으로 시작해야 합니다";
        if (rawPhone.length < 9 || rawPhone.length > 12) return "연락처는 9~12자리로 입력해주세요";
        return "";

      case "message":
        if (value.length > 200) return "문의내용은 200자 이내로 입력해주세요";
        return "";

      default:
        return "";
    }
  }, []);

  const handleInputChange = (name: string, value: string) => {
    let processedValue = value;

    // Auto-format phone number
    if (name === "phone") {
      processedValue = formatPhoneNumber(value);
    }

    // Limit message to 200 characters
    if (name === "message" && value.length > 200) {
      processedValue = value.slice(0, 200);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name] || "");
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ValidationErrors = {};
    let hasError = false;

    ["name", "company", "email", "phone", "message"].forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName] || "");
      if (error) {
        newErrors[fieldName] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, company: true, email: true, phone: true, message: true });

    if (hasError || !isAgreed) return;

    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const isFormValid = () => {
    const requiredFields = ["name", "email", "phone"];
    const hasRequiredFields = requiredFields.every((f) => formData[f]?.trim());
    const hasNoErrors = Object.values(errors).every((e) => !e);
    return isAgreed && hasRequiredFields && hasNoErrors;
  };

  const messageLength = formData.message?.length || 0;

  return (
    <SectionWrapper ref={sectionRef} id="contact" aria-label="문의하기 섹션">
      <Container>
        <ContentWrapper>
          <Overline $isVisible={isVisible}>{overline}</Overline>
          <Title $isVisible={isVisible}>{title}</Title>

          {paragraphs.map((text, index) => (
            <Paragraph key={index} $index={index} $isVisible={isVisible}>
              {text}
            </Paragraph>
          ))}

          <FormWrapper $isVisible={isVisible} onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label>
                  이름<span>*</span>
                </Label>
                <InputWrapper>
                  <Input
                    type="text"
                    name="name"
                    placeholder="이름을 입력해주세요"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    $hasError={!!errors.name && touched.name}
                  />
                </InputWrapper>
                {errors.name && touched.name && (
                  <ErrorMessage>{errors.name}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>회사명</Label>
                <InputWrapper>
                  <Input
                    type="text"
                    name="company"
                    placeholder="회사명을 입력해주세요"
                    value={formData.company || ""}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    onBlur={() => handleBlur("company")}
                    $hasError={!!errors.company && touched.company}
                  />
                </InputWrapper>
                {errors.company && touched.company && (
                  <ErrorMessage>{errors.company}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>
                  이메일<span>*</span>
                </Label>
                <InputWrapper>
                  <Input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    $hasError={!!errors.email && touched.email}
                  />
                </InputWrapper>
                {errors.email && touched.email && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>
                  연락처<span>*</span>
                </Label>
                <InputWrapper>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="연락처를 입력해주세요"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    $hasError={!!errors.phone && touched.phone}
                  />
                </InputWrapper>
                {errors.phone && touched.phone && (
                  <ErrorMessage>{errors.phone}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <LabelRow>
                <Label>문의내용</Label>
                <CharCount $isOver={messageLength > 200}>
                  {messageLength}/200
                </CharCount>
              </LabelRow>
              <InputWrapper>
                <Textarea
                  name="message"
                  placeholder="문의 내용을 입력해주세요 (선택)"
                  value={formData.message || ""}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  $hasError={!!errors.message && touched.message}
                />
              </InputWrapper>
              {errors.message && touched.message && (
                <ErrorMessage>{errors.message}</ErrorMessage>
              )}
            </FormGroup>

            <PrivacyWrapper>
              <PrivacyNotice>{form.privacyNotice}</PrivacyNotice>
              <CheckboxWrapper>
                <HiddenCheckbox
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <CustomCheckbox $checked={isAgreed}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </CustomCheckbox>
                <CheckboxLabel>{form.privacyLabel}</CheckboxLabel>
              </CheckboxWrapper>
            </PrivacyWrapper>

            <SubmitButton type="submit" $disabled={!isFormValid()}>
              {form.submitButton}
            </SubmitButton>
          </FormWrapper>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
}
