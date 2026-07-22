import type { FavoriteItem } from "@/lib/data/favorites";

const STORAGE_KEY = "industrialx_favorites";

export type FavoriteProductInput = {
  id: string;
  slug: string;
  name: string;
  priceLabel?: string;
  image?: string;
  description?: string;
  statusLabel?: string;
  categoryLabel?: string;
};

function readStorage(): FavoriteItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      ...item,
      quantity: 1,
      note: "",
      statusLabel: item.statusLabel ?? "Ready Stock",
      categoryLabel: item.categoryLabel ?? "Produk",
    }));
  } catch {
    return [];
  }
}

function writeStorage(items: FavoriteItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getFavorites(): FavoriteItem[] {
  return readStorage();
}

export function saveFavorites(items: FavoriteItem[]) {
  writeStorage(items);
}

export function isFavorite(id: string): boolean {
  return readStorage().some((item) => item.id === id);
}

export function toggleFavorite(input: FavoriteProductInput): boolean {
  const items = readStorage();
  const exists = items.some((item) => item.id === input.id);

  if (exists) {
    writeStorage(items.filter((item) => item.id !== input.id));
    return false;
  }

  writeStorage([
    ...items,
    {
      id: input.id,
      slug: input.slug,
      name: input.name,
      description: input.description ?? "",
      priceLabel: input.priceLabel ?? "Hubungi Kami",
      image: input.image ?? "",
      quantity: 1,
      note: "",
      statusLabel: input.statusLabel ?? "Ready Stock",
      categoryLabel: input.categoryLabel ?? "Produk",
    },
  ]);

  return true;
}

export function getFavoritesCount(): number {
  return readStorage().length;
}

export function favoriteProductId(slug: string, name: string): string {
  return `${slug}::${name}`;
}
