"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FileText, Heart, Loader2, Minus, Plus, X } from "lucide-react";

import { FavoritesHeader } from "@/components/sections/favorites/favorites-header";
import { ProductThumb } from "@/components/shared/product-thumb";
import type { FavoriteItem } from "@/lib/data/favorites";
import { getFavorites, saveFavorites } from "@/lib/favorites-store";
import { cn } from "@/lib/utils";

function FavoriteCard({
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
    if (confirm(`Hapus "${item.name}" dari favorit?`)) {
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
          className="relative block size-[72px] shrink-0 overflow-hidden rounded-xl bg-[#f8fafc]"
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
              📝 Tambah Catatan
            </button>
          ) : (
            <input
              type="text"
              value={item.note}
              placeholder="Contoh: Steam Retort, spesifikasi khusus..."
              onChange={(event) => onUpdate(item.id, { note: event.target.value })}
              className="h-9 w-full rounded-xl border border-border-subtle bg-[#f8fafc] px-3 text-[11px] text-primary outline-none placeholder:text-on-surface-variant/70"
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

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

  function handleUpdate(
    id: string,
    patch: Partial<Pick<FavoriteItem, "quantity" | "note">>,
  ) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  async function handleCreateRfq() {
    if (!items.length || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            slug: item.slug,
            name: item.name,
            quantity: item.quantity,
            note: item.note.trim() || undefined,
          })),
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Gagal membuat permintaan penawaran.");
      }

      router.push(`/simpanan/rfq/${encodeURIComponent(payload.data.number)}`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal membuat permintaan penawaran.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={cn("pb-36", items.length > 0 && "pb-44")}>
      <FavoritesHeader />

      <main className={cn("px-4 pt-4", items.length > 0 && "pb-10")}>
        <div className="mb-3 flex items-center gap-2">
          <Heart className="size-4 fill-primary text-primary" strokeWidth={0} />
          <h2 className="text-[13px] font-semibold text-primary">Daftar Favorit</h2>
        </div>

        {items.length ? (
          <>
            <div className="space-y-3">
              {items.map((item) => (
                <FavoriteCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>

            {error ? (
              <p className="mt-4 rounded-xl bg-[#fef2f2] px-3 py-2 text-[12px] text-[#b91c1c]">
                {error}
              </p>
            ) : null}
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[13px] font-medium text-on-surface-variant">
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

      {items.length ? (
        <div className="fixed bottom-24 left-0 right-0 z-40 mx-auto w-full max-w-[480px] border-t border-border-subtle bg-white/95 px-4 pt-5 pb-3 backdrop-blur-md">
          <button
            type="button"
            onClick={handleCreateRfq}
            disabled={submitting}
            className={cn(
              "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-colors",
              submitting ? "bg-[#64748b]" : "bg-primary hover:bg-primary-container",
            )}
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2.2} />
            ) : (
              <FileText className="size-4" strokeWidth={2.2} />
            )}
            {submitting
              ? "Memproses..."
              : `Buat Permintaan Penawaran (${totalItems} Item)`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
