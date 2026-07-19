import Link from "next/link";

import { cn } from "@/lib/utils";

type BackLinkProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function BackLink({ href = "/", onClick, className }: BackLinkProps) {
  const classes = cn(
    "inline-flex size-9 items-center justify-center text-primary",
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Kembali"
        className={classes}
      >
        <span className="text-[28px] leading-none font-bold tracking-tight">
          &lt;
        </span>
      </button>
    );
  }

  return (
    <Link href={href} aria-label="Kembali" className={classes}>
      <span className="text-[28px] leading-none font-bold tracking-tight">&lt;</span>
    </Link>
  );
}
