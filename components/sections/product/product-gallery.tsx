"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

import type { ProductGalleryItem } from "@/lib/types";
import { StatusBadge } from "@/components/shared/status-badge";
import type { StockStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  items: ProductGalleryItem[];
  status: StockStatus;
  statusLabel: string;
};

export function ProductGallery({
  items,
  status,
  statusLabel,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  if (!activeItem) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border-subtle bg-white">
        <Image
          src={activeItem.src}
          alt={activeItem.alt}
          fill
          priority
          sizes="(max-width: 520px) 100vw, 480px"
          className="object-cover transition-opacity duration-150"
        />
        <StatusBadge
          status={status}
          label={statusLabel}
          className="absolute top-4 left-4 rounded-full px-3 py-1 text-body-sm normal-case"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 transition-colors",
              index === activeIndex
                ? "border-primary"
                : "border-border-subtle hover:border-primary",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="80px"
              className="object-cover"
            />
            {item.type === "video" ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircle className="h-8 w-8 text-white" />
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
