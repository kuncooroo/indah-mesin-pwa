export type CatalogFilterState = {
  category: string;
  productType: string;
  minPrice: number;
  maxPrice: number;
  brand: string;
  readyStock: boolean;
  sortBy: string;
};

export const defaultCatalogFilters: CatalogFilterState = {
  category: "all",
  productType: "all",
  minPrice: 0,
  maxPrice: 1_000_000_000,
  brand: "all",
  readyStock: false,
  sortBy: "newest",
};

export const catalogCategoryOptions = [
  { id: "all", label: "Semua" },
  { id: "sterilisator", label: "Sterilisator" },
  { id: "retort-parts", label: "Retort Parts" },
  { id: "pompa", label: "Pompa" },
  { id: "sensor", label: "Sensor" },
  { id: "panel-kontrol", label: "Panel Kontrol" },
  { id: "aksesoris", label: "Aksesoris" },
];

export const catalogProductTypeOptions = [
  { id: "all", label: "Semua" },
  { id: "retort", label: "Retort" },
  { id: "steam-retort", label: "Steam Retort" },
  { id: "water-spray", label: "Water Spray" },
  { id: "rotary", label: "Rotary" },
  { id: "pompa-sirkulasi", label: "Pompa Sirkulasi" },
  { id: "control-panel", label: "Control Panel" },
  { id: "spare-part", label: "Spare Part" },
];

export const catalogBrandOptions = [
  { id: "all", label: "Semua Brand" },
  { id: "industrialx", label: "IndustrialX" },
  { id: "siemens", label: "Siemens" },
  { id: "grundfos", label: "Grundfos" },
  { id: "omron", label: "Omron" },
];

export const catalogSortOptions = [
  { value: "newest", label: "Terbaru" },
  { value: "bestseller", label: "Terlaris" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "name-asc", label: "Nama A–Z" },
];

export const priceSliderMax = 1_000_000_000;

export const priceScaleLabels = [
  { value: 0, label: "Rp 0" },
  { value: 250_000_000, label: "Rp 250 jt" },
  { value: 500_000_000, label: "Rp 500 jt" },
  { value: 750_000_000, label: "Rp 750 jt" },
  { value: 1_000_000_000, label: "Rp 1 M+" },
];

export function formatFilterPrice(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function parseFilterPriceInput(value: string): number {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}
