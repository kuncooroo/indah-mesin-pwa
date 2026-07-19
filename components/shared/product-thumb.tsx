import { RetortIcon } from "@/components/shared/retort-icon";
import { cn } from "@/lib/utils";

type ProductThumbProps = {
  className?: string;
  iconClassName?: string;
};

export function ProductThumb({ className, iconClassName }: ProductThumbProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#eef4ff]",
        className,
      )}
    >
      <RetortIcon className={cn("size-12", iconClassName)} />
    </div>
  );
}
