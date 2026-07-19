import type { Category, CategoryTab, QuickFilter } from "@/lib/types";

export const homeCategories: Category[] = [
  {
    slug: "sterilisasi",
    label: "Mesin Sterilisasi",
    icon: "Sparkles",
    href: "/produk?kategori=sterilisasi",
  },
  {
    slug: "penutup-kaleng",
    label: "Mesin Penutup Kaleng",
    icon: "Box",
    href: "/produk?kategori=penutup-kaleng",
  },
  {
    slug: "seal-kemasan",
    label: "Mesin Seal Kemasan",
    icon: "Package",
    href: "/produk?kategori=seal-kemasan",
  },
  {
    slug: "konveyor",
    label: "Mesin Konveyor",
    icon: "ArrowRightLeft",
    href: "/produk?kategori=konveyor",
  },
  {
    slug: "produksi",
    label: "Mesin Produksi",
    icon: "Factory",
    href: "/produk?kategori=produksi",
  },
];

export const categoryTabs: CategoryTab[] = [
  { slug: "cnc", label: "Mesin CNC", icon: "Cog" },
  { slug: "packaging", label: "Packaging", icon: "Package" },
  { slug: "pertanian", label: "Pertanian", icon: "Sprout" },
  { slug: "food-processing", label: "Food Processing", icon: "Soup" },
  { slug: "logistik", label: "Logistik", icon: "Factory" },
];

export const quickFilters: QuickFilter[] = [
  { id: "ready", label: "Ready Stock" },
  { id: "new", label: "New Arrival" },
  { id: "best-price", label: "Best Price" },
  { id: "heavy-duty", label: "Heavy Duty" },
];

export const brandOptions = [
  "Semua Brand",
  "Hardinge",
  "Mazak",
  "Fanuc",
  "Haas Automation",
];

export const sortOptions = [
  { value: "newest", label: "Terbaru" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
];
