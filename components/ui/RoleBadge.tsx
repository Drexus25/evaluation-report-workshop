import React from "react";
import { cn } from "@/libs/cn";

export type RoleBadgeVariant =
  | "admin"
  | "bph"
  | "staff"
  | "neutral"
  | "verified"
  | "draft"
  | "locked";

export type RoleBadgeSize = "sm" | "md" | "lg";

export interface RoleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  role?: string;
  variant?: RoleBadgeVariant;
  size?: RoleBadgeSize;
  showDot?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<
  RoleBadgeVariant,
  { container: string; dot?: string; defaultHasDot: boolean }
> = {
  admin: {
    container:
      "bg-primary-900 text-surface border border-primary-800 font-bold shadow-xs hover:bg-primary-950 transition-colors",
    defaultHasDot: false,
  },
  neutral: {
    container:
      "bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium hover:bg-neutral-200 transition-colors",
    defaultHasDot: false,
  },
  bph: {
    container:
      "bg-primary text-surface font-bold shadow-xs hover:bg-primary-700 transition-colors",
    defaultHasDot: false,
  },
  staff: {
    container:
      "bg-neutral-100 text-neutral-700 border border-neutral-200/60 font-medium hover:bg-neutral-200 transition-colors",
    defaultHasDot: false,
  },
  verified: {
    container:
      "bg-status-success-bg text-status-success-text border border-status-success/20",
    dot: "bg-status-success",
    defaultHasDot: false,
  },
  draft: {
    container:
      "bg-status-warning-bg text-status-warning-text border border-status-warning/20",
    dot: "bg-status-warning",
    defaultHasDot: false,
  },
  locked: {
    container: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    dot: "bg-neutral-700",
    defaultHasDot: false,
  },
};

const sizeStyles: Record<RoleBadgeSize, string> = {
  sm: "text-[11px] px-2.5 py-0.5 gap-1.5",
  md: "text-xs px-3.5 py-1 gap-2",
  lg: "text-sm px-4 py-1.5 gap-2.5",
};

export function RoleBadge({
  role = "BPH",
  variant,
  size = "md",
  showDot,
  className,
  children,
  ...props
}: RoleBadgeProps) {
  const content = children || role;

  const resolveVariant = (): RoleBadgeVariant => {
    if (variant) return variant;
    if (typeof content === "string") {
      const lower = content.toLowerCase();
      if (lower.includes("admin")) return "admin";
      if (lower.includes("bph")) return "bph";
      if (lower.includes("verif")) return "verified";
      if (lower.includes("draft")) return "draft";
      if (lower.includes("kunci") || lower.includes("lock")) return "locked";
    }
    return "staff";
  };

  const currentVariantKey = resolveVariant();
  const currentVariant = variantStyles[currentVariantKey];
  const shouldShowDot =
    showDot !== undefined ? showDot : currentVariant.defaultHasDot;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full select-none leading-none tracking-normal transition-all duration-150",
        currentVariant.container,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {shouldShowDot && currentVariant.dot && (
        <span
          className={cn("w-2 h-2 rounded-full shrink-0", currentVariant.dot)}
          aria-hidden="true"
        />
      )}
      <span>{content}</span>
    </span>
  );
}

export const Badge = RoleBadge;
export default RoleBadge;
