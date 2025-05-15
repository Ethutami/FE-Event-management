/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "outline"
  | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "link";
    href: string;
  };

type ButtonAsExternal = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "external";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal;

const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    loading = false,
    disabled = false,
    fullWidth = false,
    ...rest
  } = props;

  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Width classes
  const widthClass = fullWidth ? "w-full" : "";

  // Loading state
  const loadingClass = loading ? "opacity-70 pointer-events-none" : "";

  // Combined classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${loadingClass} ${className}`;

  // Render as button
  if (!props.as || props.as === "button") {
    const { as, ...buttonProps } = rest as ButtonAsButton;
    return (
      <button
        className={combinedClasses}
        disabled={disabled || loading}
        {...buttonProps}
      >
        {loading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        )}
        {children}
      </button>
    );
  }

  // Render as Next.js Link
  if (props.as === "link") {
    const { as, href, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={combinedClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  // Render as external link
  if (props.as === "external") {
    const { as, href, ...externalProps } = rest as ButtonAsExternal;
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...externalProps}
      >
        {children}
      </a>
    );
  }

  return null;
};

export default Button;
