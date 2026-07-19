"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { savedItems as initialSavedItems } from "@/lib/data/products";
import type { SavedItem } from "@/lib/types";
import { productOrderMessage, waUrl } from "@/lib/whatsapp";

function SavedItemCard({
  item,
  onRemove,
}: {
  item: SavedItem;
  onRemove: (slug: string) => void;
}) {
  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/produk/${item.slug}`
      : `/produk/${item.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface-container-lowest transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-metallic-bg">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 520px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onRemove(item.slug)}
          aria-label={`Hapus ${item.name}`}
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-error shadow-sm transition-all hover:bg-white active:scale-90"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-3">
          <StatusBadge
            status={item.status}
            label={item.statusLabel}
            variant="soft"
          />
        </div>
      </div>
      <div className="flex flex-grow flex-col p-component-padding">
        <span className="mb-1 font-label-technical uppercase tracking-widest text-on-surface-variant">
          SKU: {item.sku}
        </span>
        <h3 className="mb-4 text-headline-md text-on-surface">{item.name}</h3>
        <div className="mb-4 rounded bg-metallic-bg p-3">
          <div className="mb-1 flex justify-between text-body-sm text-on-surface-variant">
            <span>Price Estimate:</span>
            <span className="font-bold text-on-surface">{item.priceEstimate}</span>
          </div>
          <p className="text-[11px] italic text-on-surface-variant">
            {item.priceNote}
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <WhatsAppButton
            href={waUrl(
              productOrderMessage({
                name: item.name,
                sku: item.sku,
                productUrl,
              }),
            )}
            label={item.primaryAction}
            className="h-12 rounded text-button-text shadow-sm"
          />
          <Link
            href={`/produk/${item.slug}`}
            className="inline-flex h-12 items-center justify-center rounded border border-primary text-button-text text-primary transition-colors hover:bg-surface-container"
          >
            {item.secondaryAction}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SavedItemsSection() {
  const [items, setItems] = useState(initialSavedItems);

  return (
    <main className="mx-auto max-w-7xl px-margin-mobile py-8 md:px-margin-desktop">
      <div className="mb-8">
        <h2 className="mb-2 text-headline-lg text-primary">Saved Items</h2>
        <p className="text-body-md text-on-surface-variant">
          Review and manage your high-priority industrial equipment for
          procurement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-gutter">
        {items.map((item) => (
          <SavedItemCard
            key={item.slug}
            item={item}
            onRemove={(slug) =>
              setItems((current) => current.filter((entry) => entry.slug !== slug))
            }
          />
        ))}
      </div>

      {items.length ? (
        <div className="mt-margin-desktop flex flex-col items-center justify-between gap-4 rounded-xl border border-border-subtle bg-surface-container-low p-gutter md:flex-row">
          <p className="text-body-md">
            You have <strong>{items.length} items</strong> saved. Prices are
            estimates based on standard specifications.
          </p>
          <button
            type="button"
            className="rounded bg-primary px-6 py-3 text-button-text text-white shadow transition-colors hover:bg-primary-container active:scale-95"
          >
            Download All Specs (PDF)
          </button>
        </div>
      ) : (
        <div className="py-20 text-center text-body-md text-on-surface-variant">
          Belum ada item tersimpan.
        </div>
      )}
    </main>
  );
}
