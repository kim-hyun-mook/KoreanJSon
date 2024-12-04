import React from "react";
import styled, { css } from "styled-components";

// 타입 정의
type ButtonProps = {
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  variant?: "solid" | "outlined" | "dashed" | "text" | "link";
  children: React.ReactNode;
};

const Button = ({
  color = "primary",
  variant = "solid",
  children,
}: ButtonProps) => {
  return (
    <StyledButton color={color} variant={variant}>
      {children}
    </StyledButton>
  );
};

// 미리 정의된 색상 팔레트
const COLORS = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
  light: "#f8f9fa",
  dark: "#343a40",
};

const StyledButton = styled.button<ButtonProps>`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ color, variant }) => {
    const bgColor = COLORS[color || "primary"];
    const textColor = color === "light" ? "#000" : "#fff";

    return css`
      ${variant === "solid" &&
      css`
        background-color: ${bgColor};
        color: ${textColor};
        border: none;
      `}

      ${variant === "outlined" &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: 2px solid ${bgColor};
      `}

      ${variant === "dashed" &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: 2px dashed ${bgColor};
      `}

      ${variant === "text" &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: none;
      `}

      ${variant === "link" &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: none;
        text-decoration: underline;
      `}
    `;
  }}

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.75;
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;

export default Button;
