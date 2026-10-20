import React from "react";

export type RoleBadgeVariant =
  | "bph" // Role: BPH Inti (solid teal bg-primary text-surface)
  | "staff" // Role: Staff / Departemen (soft gray bg-neutral-100 text-neutral-700)
  | "verified" // Status: Terverifikasi (bg hijau muda + dot hijau)
  | "draft" // Status: Draft Pengajuan (bg kuning muda + dot amber)
  | "locked"; // Status: Terkunci (bg abu muda + dot abu)

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
  // Role Badges sesuai penugasan BPH / Staff
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

  // Status Badges & Tags sesuai Figma
  verified: {
    container:
      "bg-status-success-bg text-status-success-text border border-status-success/20",
    dot: "bg-status-success",
    defaultHasDot: true,
  },
  draft: {
    container:
      "bg-status-warning-bg text-status-warning-text border border-status-warning/20",
    dot: "bg-status-warning",
    defaultHasDot: true,
  },
  locked: {
    container: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    dot: "bg-neutral-700",
    defaultHasDot: true,
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
  className = "",
  children,
  ...props
}: RoleBadgeProps) {
  const content = children || role;

  // Otomatis tentukan variant jika tidak diberikan secara eksplisit
  const resolveVariant = (): RoleBadgeVariant => {
    if (variant) return variant;
    if (typeof content === "string") {
      const lower = content.toLowerCase();
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
      className={`inline-flex items-center justify-center rounded-full select-none leading-none tracking-normal transition-all duration-150 ${currentVariant.container} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {shouldShowDot && currentVariant.dot && (
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${currentVariant.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{content}</span>
    </span>
  );
}

// Alias export agar bisa dipanggil sebagai Badge atau RoleBadge
export const Badge = RoleBadge;
export default RoleBadge;
