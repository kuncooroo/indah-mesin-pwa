import type { FavoriteItem } from "@/lib/data/favorites";
import type { FavoriteProductInput } from "@/lib/favorites-store";

const STORAGE_KEY = "industrialx_rfq_cart";

function readStorage(): FavoriteItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      ...item,
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

export function getRfqCartItems(): FavoriteItem[] {
  return readStorage();
}

export function saveRfqCartItems(items: FavoriteItem[]) {
  writeStorage(items);
}

export function addToRfqCart(input: FavoriteProductInput): boolean {
  const items = readStorage();
  const existing = items.find((item) => item.id === input.id);

  if (existing) {
    writeStorage(
      items.map((item) =>
        item.id === input.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
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

export function setSingleProductRfq(input: FavoriteProductInput) {
  writeStorage([
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
}

export function clearRfqCart() {
  writeStorage([]);
}

export function getRfqCartCount(): number {
  return readStorage().reduce((sum, item) => sum + item.quantity, 0);
}
