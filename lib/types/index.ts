export type StockStatus = "ready" | "indent";

export type Product = {
  slug: string;
  name: string;
  sku: string;
  description: string;
  categorySlug: string;
  categoryLabel: string;
  image: string;
  gallery?: ProductGalleryItem[];
  status: StockStatus;
  statusLabel: string;
  priceLabel: string;
  priceNote?: string;
  features?: string[];
  specifications?: ProductSpecification[];
  downloads?: ProductDownload[];
  benefit?: ProductBenefit;
};

export type ProductGalleryItem = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

export type ProductSpecification = {
  attribute: string;
  value: string;
};

export type ProductDownload = {
  title: string;
  subtitle: string;
  href: string;
};

export type ProductBenefit = {
  title: string;
  description: string;
  stats?: Array<{ value: string; label: string }>;
  image?: string;
  imageCaption?: string;
};

export type Category = {
  slug: string;
  label: string;
  icon: string;
  href: string;
};

export type CategoryTab = {
  slug: string;
  label: string;
  icon: string;
};

export type SavedItem = {
  slug: string;
  sku: string;
  name: string;
  image: string;
  status: StockStatus;
  statusLabel: string;
  priceEstimate: string;
  priceNote: string;
  primaryAction: string;
  secondaryAction: string;
};

export type ContactMethod = {
  icon: string;
  label: string;
  value: string;
  href: string;
};

export type ShowroomHour = {
  day: string;
  hours: string;
  closed?: boolean;
};

export type LocationInfo = {
  title: string;
  icon: string;
  lines: string[];
};

export type QuickFilter = {
  id: string;
  label: string;
};
