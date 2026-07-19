import Link from "next/link";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeading({
  title,
  href,
  linkLabel = "Lihat Semua",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h3 className="text-[17px] font-bold text-primary">{title}</h3>
      {href ? (
        <Link
          href={href}
          className="text-[13px] font-semibold text-primary"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
