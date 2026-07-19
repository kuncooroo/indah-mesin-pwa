import { waUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { cn } from "@/lib/utils";

type WhatsAppFabProps = {
  className?: string;
  hidden?: boolean;
};

export function WhatsAppFab({ className, hidden }: WhatsAppFabProps) {
  if (hidden) {
    return null;
  }

  return (
    <a
      href={waUrl(
        "Halo IndustrialX, saya ingin konsultasi mengenai kebutuhan mesin industri.",
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi via WhatsApp"
      className={cn(
        "fixed right-6 bottom-20 z-[60] flex items-center justify-center rounded-full bg-whatsapp p-4 text-white shadow-2xl transition-transform cta-wa-pulse hover:scale-110 active:scale-90",
        className,
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
