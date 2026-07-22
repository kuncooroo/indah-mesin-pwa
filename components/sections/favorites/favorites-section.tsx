"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FileText, Minus, Plus, ShoppingCart, X } from "lucide-react";

import { FavoritesHeader } from "@/components/sections/favorites/favorites-header";
import { ProductThumb } from "@/components/shared/product-thumb";
import type { FavoriteItem } from "@/lib/data/favorites";
import { getRfqCartItems, saveRfqCartItems } from "@/lib/rfq-cart-store";
import { cn } from "@/lib/utils";

function RfqCartCard({
  item,
  onRemove,
  onUpdate,
}: {
  item: FavoriteItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Pick<FavoriteItem, "quantity" | "note">>) => void;
}) {
  const [showNote, setShowNote] = useState(Boolean(item.note.trim()));

  function handleDelete() {
    if (confirm(`Hapus "${item.name}" dari keranjang RFQ?`)) {
      onRemove(item.id);
    }
  }

  function changeQuantity(delta: number) {
    onUpdate(item.id, { quantity: Math.max(1, item.quantity + delta) });
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

      <div className="flex gap-3 pr-8">
        <Link
          href={`/produk/${item.slug}`}
          className="relative block size-[72px] shrink-0 overflow-hidden rounded-xl bg-white border border-border-subtle"
        >
          <ProductThumb className="size-full" iconClassName="size-8" />
        </Link>

        <div className="min-w-0 flex-1">
          <Link href={`/produk/${item.slug}`}>
            <h3 className="line-clamp-2 text-[14px] leading-snug font-bold text-primary">
              {item.name}
            </h3>
          </Link>
          <p className="mt-1 text-[11px] text-on-surface-variant">
            {item.statusLabel} • {item.categoryLabel}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          {!showNote ? (
            <button
              type="button"
              onClick={() => setShowNote(true)}
              className="text-[11px] font-semibold text-primary underline-offset-2 hover:underline"
            >
              Tambah Catatan
            </button>
          ) : (
            <input
              type="text"
              value={item.note}
              placeholder="Contoh: Steam system, fuel LPG..."
              onChange={(event) => onUpdate(item.id, { note: event.target.value })}
              className="h-9 w-full rounded-xl border border-border-subtle bg-white px-3 text-[11px] text-primary outline-none placeholder:text-on-surface-variant/70"
            />
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={`Kurangi jumlah ${item.name}`}
            onClick={() => changeQuantity(-1)}
            disabled={item.quantity <= 1}
            className="flex size-8 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-primary transition-colors enabled:hover:bg-[#eff6ff] disabled:opacity-40"
          >
            <Minus className="size-4" strokeWidth={2.2} />
          </button>
          <span className="min-w-[20px] text-center text-[14px] font-bold text-primary">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label={`Tambah jumlah ${item.name}`}
            onClick={() => changeQuantity(1)}
            className="flex size-8 items-center justify-center rounded-full border border-[#bfdbfe] bg-[#eff6ff] text-primary transition-colors hover:bg-[#dbeafe]"
          >
            <Plus className="size-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function FavoritesSection() {
  const router = useRouter();
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  useEffect(() => {
    setItems(getRfqCartItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveRfqCartItems(items);
  }, [items, hydrated]);

  function handleRemove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function handleUpdate(
    id: string,
    patch: Partial<Pick<FavoriteItem, "quantity" | "note">>,
  ) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function handleContinue() {
    if (!items.length) return;
    router.push("/simpanan/rfq/permintaan");
  }

  return (
    <div className="bg-white">
      <FavoritesHeader />

      <main className="px-4 pt-4 pb-4">
        <div className="mb-3 flex items-center gap-2">
          <ShoppingCart className="size-4 text-primary" strokeWidth={2.2} />
          <h2 className="text-[13px] font-semibold text-primary">RFQ Cart</h2>
        </div>

        {items.length ? (
          <>
            <div className="space-y-3">
              {items.map((item) => (
                <RfqCartCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>

            <div className="mt-6 pb-2">
              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-primary text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(0,35,111,0.28)] transition-colors hover:bg-primary-container"
              >
                <FileText className="size-[18px]" strokeWidth={2} />
                Buat RFQ ({totalItems} Item)
              </button>
            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[13px] font-medium text-on-surface-variant">
              Belum ada produk di keranjang RFQ.
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
