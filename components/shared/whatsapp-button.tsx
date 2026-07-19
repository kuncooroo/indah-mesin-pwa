import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

type WhatsAppButtonProps = {
  href: string;
  label: string;
  className?: string;
  size?: "default" | "lg";
};

export function WhatsAppButton({
  href,
  label,
  className,
  size = "default",
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-xl bg-whatsapp font-bold text-white transition-all hover:brightness-105 active:scale-[0.98]",
        size === "default" && "px-6 py-4 text-button-text",
        size === "lg" && "w-full py-4 text-button-text shadow-lg",
        className,
      )}
    >
      <WhatsAppIcon className="h-6 w-6" />
      {label}
    </a>
  );
}
