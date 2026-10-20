import React, { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1F6F78] text-white hover:bg-[#195960] active:bg-[#14454B] focus-visible:ring-[#1F6F78] shadow-sm",
  secondary:
    "bg-white text-[#1F6F78] hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-white shadow-sm border border-neutral-200/50",
  outline:
    "bg-transparent text-white border-2 border-[#1F6F78] hover:bg-[#1F6F78]/15 active:bg-[#1F6F78]/25 focus-visible:ring-[#1F6F78]",
  ghost:
    "bg-[#8E9398] text-[#0F4349] hover:bg-[#7D8287] active:bg-[#6C7176] focus-visible:ring-neutral-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs gap-1.5 min-w-[72px]",
  md: "h-11 px-6 text-sm gap-2 min-w-[96px]",
  lg: "h-14 px-8 text-base gap-2.5 min-w-[120px]",
};

const spinnerSizes: Record<ButtonSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className={`animate-spin ${spinnerSizes[size]} text-current shrink-0`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!isLoading && leftIcon && (
          <span className="shrink-0 inline-flex items-center">{leftIcon}</span>
        )}

        {children && <span className="truncate">{children}</span>}

        {!isLoading && rightIcon && (
          <span className="shrink-0 inline-flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
