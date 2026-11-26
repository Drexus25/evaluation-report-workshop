import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/libs/cn";

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

const baseButtonClasses =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-150 ease-out select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-surface hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary shadow-sm",
  secondary:
    "bg-surface text-primary hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-primary shadow-sm border border-neutral-200/50",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-primary",
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

export function buttonVariants(options?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  const { variant = "primary", size = "md", className } = options ?? {};
  return cn(baseButtonClasses, variantStyles[variant], sizeStyles[size], className);
}

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
      className,
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
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {isLoading && (
          <Loader2
            className={cn("animate-spin text-current shrink-0", spinnerSizes[size])}
            aria-hidden="true"
          />
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
