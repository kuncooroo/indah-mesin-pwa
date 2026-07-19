import { cn } from "@/lib/utils";

type RetortIconProps = {
  className?: string;
};

export function RetortIcon({ className }: RetortIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("text-primary", className)}
    >
      <rect x="14" y="10" width="36" height="40" rx="6" fill="currentColor" opacity="0.12" />
      <rect
        x="18"
        y="14"
        width="28"
        height="32"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M24 14V10C24 7.8 25.8 6 28 6H36C38.2 6 40 7.8 40 10V14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="30" r="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M22 50H42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 54H38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <rect x="44" y="24" width="8" height="4" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="12" y="24" width="8" height="4" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
