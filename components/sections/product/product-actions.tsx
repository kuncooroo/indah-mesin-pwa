"use client";

import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { productOrderMessage, waUrl } from "@/lib/whatsapp";

type ProductActionsProps = {
  productName: string;
  sku: string;
  productUrl: string;
};

export function StickyWhatsAppBar({
  productName,
  sku,
  productUrl,
}: ProductActionsProps) {
  const message = productOrderMessage({ name: productName, sku, productUrl });

  return (
    <div className="fixed bottom-16 left-0 z-50 w-full p-4 industrial-glass sticky-ctwa">
      <WhatsAppButton
        href={waUrl(message)}
        label="PESAN VIA WHATSAPP"
        size="lg"
      />
    </div>
  );
}
