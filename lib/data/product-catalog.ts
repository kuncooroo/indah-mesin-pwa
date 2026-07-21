import type { CatalogFilterState } from "@/lib/data/catalog-filters";

export type ProductCatalogFilter = {
  id: string;
  label: string;
  image: string;
};

export type CatalogProduct = {
  slug: string;
  name: string;
  categoryTag: string;
  categoryBadge: string;
  priceLabel: string;
  image: string;
  filterId: string;
  productTypeId: string;
  brandId: string;
  readyStock: boolean;
  rating: number;
  soldLabel: string;
  location: string;
};
const retortImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATo9OiVElbXKff7x40hmph9vONdRV6AGfrMN3Mb3Ju3Cq3DvETTRvmYOzLpOhmLfEG9C_sqxjZH4dnVNbcnnxVOhN-guDUElL0HS6ycfeeRcRKGt0umRNiSf-712ViaLkwTS8L2tRjpWM1RCzEKCRrYkfrj3ea6aJjip3m9dNJ0yTkvDYdL4huGO-2JpuToXHUrWcF2qRHjs0mXBCU_C1YT4ZWLqQwQEj9wLEgMjGBXXRSubKUovCaZySiAHB3ilPNCpbAHE5QW2vz";

const panelImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBPTL75Kk7OPWILwRRafFV6eDx7tYlnbodu0azMhLjY_zYfGH27HKPT80SoFbgGtNPdWfYBuNzvCrvF3RQkixyQBdzXvBKd9OY8kY3_oqhEgw1-vBRHWicQIxiteDga6LCzhzuPw5MXa03gbn9ITO0DpKqOmGFOOp_ZOhPxE3oZq3-tTGRx3EZW04W5z_b9FoZD5JnlRP0-0TmiOy56lC0Y44bkoOlhiGFCdaCy35KDACIaneSmDzxbDCxCJRBAP-l5MEOOBUfbQuOr";

const partsImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSdRgMNZUR_k7EhRP-oZsfRqw3bmITi7dfdxgN_cVWWobpEiNd5AHydIhkICMFJMZlZtF8N54TlVDLA0pvY-220jYUyI-V1acASq_wc-rQ1y6C6iTEUm6qiQPhdLxUNEVCxLTCZtNf90lXTrm8uQlj-tQbQvpLkARZiWMqpF4_jStST0ekEKyJyAqaJVV33VaFkQtPpWoSgKAbGS1S3e5ylrwCSUo2a71lY18CiCGi5PLbRt9FIih3Y6Ef-_0tY3mOGgwenHNJ01V";

export const productCatalogFilters: ProductCatalogFilter[] = [
  { id: "all", label: "Semua", image: retortImage },
  { id: "sterilisator", label: "Sterilisator", image: retortImage },
  { id: "retort-parts", label: "Retort Parts", image: partsImage },
  { id: "pompa", label: "Pompa", image: panelImage },
  { id: "sensor", label: "Sensor", image: panelImage },
  { id: "lainnya", label: "Lainnya", image: partsImage },
];

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "industrial-retort-sterilizer",
    name: "Retort Sterilisasi Horizontal RH-1200",
    categoryTag: "Sterilisator",
    categoryBadge: "Pangan",
    priceLabel: "Rp 650.000.000",
    image: retortImage,
    filterId: "sterilisator",
    productTypeId: "retort",
    brandId: "industrialx",
    readyStock: true,
    rating: 4.9,
    soldLabel: "300+ terjual",
    location: "Kota Malang",
  },
  {
    slug: "industrial-retort-sterilizer",
    name: "Control Panel Retort CPR-2000",
    categoryTag: "Panel Kontrol",
    categoryBadge: "Retort",
    priceLabel: "Rp 85.000.000",
    image: panelImage,
    filterId: "panel-kontrol",
    productTypeId: "control-panel",
    brandId: "siemens",
    readyStock: true,
    rating: 4.8,
    soldLabel: "120+ terjual",
    location: "Kota Malang",
  },
  {
    slug: "automatic-liquid-filler-alf-5000",
    name: "Pompa Sirkulasi Air Panas PSAP-304",
    categoryTag: "Pompa",
    categoryBadge: "Retort",
    priceLabel: "Rp 45.750.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQPmVVxQ_LrTuB2zoeD13D3VZ8EoGs5AGfimiuWfsLzQ0q0nTLVEN60ncAPL-pIfIzm6jqVoh71NRucvlY31zblNZlpJr_fcIOuvePPP6qhYj_BFR_1idG-vJZy8aMEJXw_SZyRr1bC6sZYU0S97hZjycFCQ4j6jQ70pBYD5i1tS-tamsBe_mKS6z3kk1THW0PJtJsys3M0mvViQxtUOK5NLcJ0qzunCFuq1t2052Ms-Xqpn9h4mc5g_Km_iIkNT5RK_x-wsPVm2Ae",
    filterId: "pompa",
    productTypeId: "pompa-sirkulasi",
    brandId: "grundfos",
    readyStock: false,
    rating: 4.7,
    soldLabel: "85+ terjual",
    location: "Surabaya",
  },
  {
    slug: "14-head-multihead-weigher",
    name: "Temperature Sensor TS-300",
    categoryTag: "Sensor",
    categoryBadge: "Sparepart",
    priceLabel: "Rp 12.500.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN84ss-jG4xuT24rpQLoMxdlNuHtYa9jxj2oql5Jhgn2EOxnO5UenlFKSvYQw2BbsDKfb_auSweKFa5H88FSaWcpj5zh-MkpP2JJVfvmmhYlDzbXD8IrzsjYbzrXFiVxjZkgP3XdJnU8cDdGSso8lLcT-kCzv2XS44ZWGgrAQ8sFnsUxlXhOmpTGyY3Xd2rtnmHYpQqxyq6WBIsuHSZm7nMDRoN_rJHIdRZZX2NI4U5WXD6flzaS-nb26TB76ksGuQh3jGziXKHq80",
    filterId: "sensor",
    productTypeId: "spare-part",
    brandId: "omron",
    readyStock: true,
    rating: 4.8,
    soldLabel: "210+ terjual",
    location: "Kota Malang",
  },
  {
    slug: "automatic-vacuum-packaging-machine",
    name: "Retort Basket Stainless RB-500",
    categoryTag: "Aksesoris Retort",
    categoryBadge: "Retort",
    priceLabel: "Rp 18.500.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfL8_-n5A0m1wo-LlFI_BxfXTrZuJgtYmCTsTRvIpVuJcpF464ry-kgqOnBKwPi5Jde3jRBzTGmxgd4mgSuwQdakeON3BbEebk8uvbulyKfQSX3CvnpUwukNy2PxIboVhZX3j9p3vd8k73hY6_-1O9WXp4ijKDbxNwasVH92dArB7-WKwULRszqQeQgFhh8_EzlSjmP3-MZ88gofP03UmcOI6tfNToWjMMjZK4-VRUt05Gp2c6w5mKAfQM7nnYaWtjOICVN8C2naAE",
    filterId: "aksesoris",
    productTypeId: "spare-part",
    brandId: "industrialx",
    readyStock: true,
    rating: 4.9,
    soldLabel: "150+ terjual",
    location: "Kota Malang",
  },
  {
    slug: "industrial-food-dehydrator",
    name: "Sealing Gasket Retort RG-100",
    categoryTag: "Spare Part",
    categoryBadge: "Sparepart",
    priceLabel: "Rp 2.850.000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5mM7r582n1iU7P0O4WE4wt3FOqNhst447DubuaGz_GGspb1tNNXG-J73geyqMngZLbGaHtlQuMEOy6OnLV7t4Q33cT8O9YLR_j7VU3zHn-3nuNmuL95WYbUmmVs2q5NQCk1gmXPNxtrC48M8N_l7R-7hHyEOVliRAQSEK1XLRxxYgja9aqwnYePO1kMmEWk3yymoOC95Do4N4xicqg7U4ovx0RxEeOBoTXhl8mI0lj29sA71I8A0dANGeWrWyqJ3ak4LbNhAZzFR",
    filterId: "retort-parts",
    productTypeId: "spare-part",
    brandId: "industrialx",
    readyStock: false,
    rating: 4.6,
    soldLabel: "95+ terjual",
    location: "Surabaya",
  },
  {
    slug: "automatic-liquid-filling-machine-beverages",
    name: "Retort Sterilisasi Vertical RV-800",
    categoryTag: "Sterilisator",
    categoryBadge: "Pangan",
    priceLabel: "Rp 520.000.000",
    image: retortImage,
    filterId: "sterilisator",
    productTypeId: "steam-retort",
    brandId: "industrialx",
    readyStock: true,
    rating: 4.9,
    soldLabel: "180+ terjual",
    location: "Kota Malang",
  },
  {
    slug: "industrial-genset-500kva-silent",
    name: "Pressure Gauge Retort PG-250",
    categoryTag: "Sensor",
    categoryBadge: "Sparepart",
    priceLabel: "Rp 8.750.000",
    image: panelImage,
    filterId: "sensor",
    productTypeId: "spare-part",
    brandId: "siemens",
    readyStock: true,
    rating: 4.7,
    soldLabel: "60+ terjual",
    location: "Kota Malang",
  },
];
export function parseCatalogPrice(priceLabel: string): number {
  return Number(priceLabel.replace(/[^\d]/g, "")) || 0;
}

export function filterCatalogProducts(
  filters: CatalogFilterState,
  query = "",
): CatalogProduct[] {
  let list = [...catalogProducts];

  if (filters.category !== "all") {
    list = list.filter((product) => product.filterId === filters.category);
  }

  list = list.filter((product) => {
    const price = parseCatalogPrice(product.priceLabel);
    return price >= filters.minPrice && price <= filters.maxPrice;
  });

  if (filters.productType !== "all") {
    list = list.filter((product) => product.productTypeId === filters.productType);
  }

  if (filters.brand !== "all") {
    list = list.filter((product) => product.brandId === filters.brand);
  }

  if (filters.readyStock) {
    list = list.filter((product) => product.readyStock);
  }

  if (query.trim()) {
    const term = query.trim().toLowerCase();
    list = list.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.categoryTag.toLowerCase().includes(term),
    );
  }

  if (filters.sortBy === "price-asc") {
    list.sort(
      (a, b) =>
        parseCatalogPrice(a.priceLabel) - parseCatalogPrice(b.priceLabel),
    );
  } else if (filters.sortBy === "price-desc") {
    list.sort(
      (a, b) =>
        parseCatalogPrice(b.priceLabel) - parseCatalogPrice(a.priceLabel),
    );
  } else if (filters.sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name, "id"));
  }

  return list;
}

export function getCatalogProducts(filterId = "all", query = "") {
  return filterCatalogProducts(
    {
      category: filterId,
      minPrice: 0,
      maxPrice: 1_000_000_000,
      productType: "all",
      brand: "all",
      readyStock: false,
      sortBy: "newest",
    },
    query,
  );
}

export function getCatalogProductMetaBySlug(slug: string) {
  const product = catalogProducts.find((item) => item.slug === slug);

  if (!product) return null;

  return {
    rating: product.rating,
    soldLabel: product.soldLabel,
    categoryTag: product.categoryTag,
  };
}