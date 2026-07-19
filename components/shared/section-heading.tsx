import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      <h3 className="text-headline-md text-primary">{title}</h3>
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-1 text-body-sm font-semibold text-primary"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
