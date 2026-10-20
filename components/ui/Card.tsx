import React, { forwardRef } from "react";

export type CardVariant = "default" | "subtle" | "outline" | "interactive";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-surface text-neutral-700 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
  subtle:
    "bg-surface-subtle text-neutral-700 border border-neutral-200/60 shadow-none",
  outline: "bg-surface text-neutral-700 border border-neutral-300 shadow-none",
  interactive:
    "bg-surface text-neutral-700 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-primary-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", padding = "md", className = "", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl transition-colors ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-between gap-4 pb-4 ${
          bordered ? "border-b border-neutral-200/70" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "span";
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = "h3", className = "", children, ...props }, ref) => {
    return (
      <Component
        ref={ref as never}
        className={`font-headline font-semibold text-neutral-800 tracking-tight text-base sm:text-lg ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-neutral-500 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

export const CardMeta = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={`inline-flex items-center text-xs font-mono font-medium text-primary px-2.5 py-1 rounded-md bg-primary-50 border border-primary-100 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
});

CardMeta.displayName = "CardMeta";

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-between gap-3 pt-4 ${
          bordered ? "border-t border-neutral-200/70" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";

export default Card;
