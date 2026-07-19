"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipboardList, Heart, Pencil, Trash2 } from "lucide-react";
import { FavoritesHeader } from "@/components/sections/favorites/favorites-header";
import { ProductThumb } from "@/components/shared/product-thumb";
import { favoriteItems as initialFavorites } from "@/lib/data/favorites";
import type { FavoriteItem } from "@/lib/data/favorites";

function FavoriteCard({
  item,
  onRemove,
}: {
  item: FavoriteItem;
  onRemove: (id: string) => void;
}) {
  const router = useRouter();

  function handleDelete() {
    if (confirm(`Hapus "${item.name}" dari favorit?`)) {
      onRemove(item.id);
    }
  }

  return (
    <article className="flex overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
      <div className="relative shrink-0 p-3 pr-0">
        <Link
          href={`/produk/${item.slug}`}
          className="relative block size-[96px] overflow-hidden rounded-2xl"
        >
          <ProductThumb className="size-full" iconClassName="size-10" />
        </Link>
        <span className="absolute right-1 bottom-1 flex size-7 items-center justify-center rounded-full bg-white shadow-md">
          <Heart className="size-3.5 fill-primary text-primary" strokeWidth={0} />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-3 pr-2 pl-1">
        <div>
          <Link href={`/produk/${item.slug}`}>
            <h3 className="line-clamp-2 text-[13px] leading-snug font-bold text-primary">
              {item.name}
            </h3>
          </Link>
          <p className="mt-1.5 line-clamp-3 text-[10px] leading-relaxed text-on-surface-variant">
            {item.description}
          </p>
        </div>
        <p className="mt-2 text-[12px] font-bold text-primary">{item.priceLabel}</p>
      </div>

      <div className="flex w-[52px] shrink-0 flex-col items-center justify-center gap-3 border-l border-border-subtle py-3">
        <button
          type="button"
          aria-label={`Edit ${item.name}`}
          onClick={() => router.push(`/produk/${item.slug}`)}
          className="flex size-9 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-primary transition-colors hover:bg-[#eff6ff]"
        >
          <Pencil className="size-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label={`Hapus ${item.name}`}
          onClick={handleDelete}
          className="flex size-9 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-primary transition-colors hover:bg-[#eff6ff]"
        >
          <Trash2 className="size-4" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

export function FavoritesSection() {
  const [items, setItems] = useState(initialFavorites);

  function handleRemove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="pb-24">
      <FavoritesHeader />

      <main className="px-4 pt-4">
        <h2 className="mb-3 text-[13px] font-semibold text-primary">
          Daftar Favorit
        </h2>

        {items.length ? (
          <>
            <div className="space-y-3">
              {items.map((item) => (
                <FavoriteCard key={item.id} item={item} onRemove={handleRemove} />
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/simpanan/po"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-white text-[13px] font-semibold text-primary transition-colors hover:bg-[#eff6ff]"
              >
                <ClipboardList className="size-4" strokeWidth={2.2} />
                Ringkasan Order
              </Link>
            </div>
          </>
        ) : (
          <div className="py-20 text-center">            <p className="text-[13px] font-medium text-on-surface-variant">
              Belum ada produk favorit.
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
