import { cn } from "@/lib/utils";

type SkuLabelProps = {
  sku: string;
  className?: string;
};

export function SkuLabel({ sku, className }: SkuLabelProps) {
  return (
    <span className={cn("font-label-technical text-primary", className)}>
      #{sku}
    </span>
  );
}
