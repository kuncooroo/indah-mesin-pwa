import type { StockStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: StockStatus;
  label: string;
  className?: string;
  variant?: "solid" | "soft";
};

export function StatusBadge({
  status,
  label,
  className,
  variant = "solid",
}: StatusBadgeProps) {
  const isReady = status === "ready";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider",
        variant === "solid" &&
          (isReady
            ? "bg-status-ready text-white"
            : "bg-status-indent text-white"),
        variant === "soft" &&
          (isReady
            ? "border border-status-ready/20 bg-status-ready/10 text-status-ready backdrop-blur-md"
            : "border border-status-indent/20 bg-status-indent/10 text-status-indent backdrop-blur-md"),
        className,
      )}
    >
      {label}
    </span>
  );
}
