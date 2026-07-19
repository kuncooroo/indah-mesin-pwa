import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  label?: string;
  price: string;
  note?: string;
  className?: string;
};

export function PriceDisplay({
  label = "Mulai Dari",
  price,
  note,
  className,
}: PriceDisplayProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-[10px] font-bold uppercase text-outline">
        {label}
      </span>
      <span className="font-label-technical font-bold text-primary">{price}</span>
      {note ? (
        <p className="mt-1 text-body-sm italic text-outline">{note}</p>
      ) : null}
    </div>
  );
}
