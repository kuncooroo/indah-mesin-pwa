"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { ProductThumb } from "@/components/shared/product-thumb";
import type { FavoriteItem } from "@/lib/data/favorites";
import { getFavorites, saveFavorites } from "@/lib/favorites-store";

function WishlistCard({
  item,
  onRemove,
}: {
  item: FavoriteItem;
  onRemove: (id: string) => void;
}) {
  function handleDelete() {
    if (confirm(`Hapus "${item.name}" dari favorit?`)) {
      onRemove(item.id);
    }
  }

  return (
    <article className="relative rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      <button
        type="button"
        aria-label={`Hapus ${item.name}`}
        onClick={handleDelete}
        className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-[#f1f5f9] hover:text-primary"
      >
        <X className="size-4" strokeWidth={2.2} />
      </button>

      <Link href={`/produk/${item.slug}`} className="flex gap-3 pr-8">
        <div className="relative block size-[72px] shrink-0 overflow-hidden rounded-xl bg-[#f8fafc]">
          <ProductThumb className="size-full" iconClassName="size-8" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[14px] leading-snug font-bold text-primary">
            {item.name}
          </h3>
          <p className="mt-1 text-[12px] font-semibold text-primary">{item.priceLabel}</p>
          <p className="mt-1 text-[11px] text-on-surface-variant">
            {item.statusLabel} • {item.categoryLabel}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function WishlistSection() {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(getFavorites());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveFavorites(items);
  }, [items, hydrated]);

  function handleRemove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <BackLink href="/akun" />
          <h1 className="text-[17px] font-bold text-primary">Favorit</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-4">
        <div className="mb-3 flex items-center gap-2">
          <Heart className="size-4 fill-primary text-primary" strokeWidth={0} />
          <h2 className="text-[13px] font-semibold text-primary">Daftar Favorit</h2>
        </div>

        {items.length ? (
          <div className="space-y-3">
            {items.map((item) => (
              <WishlistCard key={item.id} item={item} onRemove={handleRemove} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Heart className="mx-auto size-10 text-on-surface-variant/40" strokeWidth={1.5} />
            <p className="mt-3 text-[13px] font-medium text-on-surface-variant">
              Belum ada produk favorit.
            </p>
            <p className="mt-1 text-[11px] text-on-surface-variant">
              Ketuk ikon hati di kartu produk untuk menyimpan di sini.
            </p>
            <Link
              href="/produk"
              className="mt-3 inline-flex text-[13px] font-semibold text-primary"
            >
              Jelajahi Produk
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
