import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-6 flex flex-wrap items-center gap-2 text-body-sm text-on-surface-variant",
        className,
      )}
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 ? <ChevronRight className="h-4 w-4" /> : null}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
