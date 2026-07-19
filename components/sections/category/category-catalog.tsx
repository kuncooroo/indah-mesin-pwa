"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { CategoryProductCard } from "@/components/shared/category-product-card";
import { CategoryTabs } from "@/components/sections/category/category-tabs";
import { FilterSidebar } from "@/components/sections/category/filter-sidebar";
import { sortOptions } from "@/lib/data/categories";
import { getProductsByCategory, products } from "@/lib/data/products";
import type { Product } from "@/lib/types";

function parsePrice(priceLabel: string): number {
  const digits = priceLabel.replace(/[^\d]/g, "");
  return Number(digits) || 0;
}

type CategoryCatalogProps = {
  initialCategory?: string;
};

export function CategoryCatalog({
  initialCategory = "food-processing",
}: CategoryCatalogProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [readyStock, setReadyStock] = useState(true);
  const [indent, setIndent] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [brand, setBrand] = useState("Semua Brand");
  const [sortBy, setSortBy] = useState("newest");
  const [appliedFilters, setAppliedFilters] = useState({
    readyStock: true,
    indent: false,
    minPrice: "",
    brand: "Semua Brand",
  });

  const filteredProducts = useMemo(() => {
    let list: Product[] =
      activeCategory === "all"
        ? products
        : getProductsByCategory(activeCategory);

    if (appliedFilters.readyStock && !appliedFilters.indent) {
      list = list.filter((product) => product.status === "ready");
    } else if (!appliedFilters.readyStock && appliedFilters.indent) {
      list = list.filter((product) => product.status === "indent");
    } else if (!appliedFilters.readyStock && !appliedFilters.indent) {
      list = [];
    }

    if (appliedFilters.minPrice) {
      const min = Number(appliedFilters.minPrice);
      list = list.filter((product) => parsePrice(product.priceLabel) >= min);
    }

    if (appliedFilters.brand !== "Semua Brand") {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(appliedFilters.brand.toLowerCase()),
      );
    }

    if (sortBy === "price-asc") {
      list = [...list].sort(
        (a, b) => parsePrice(a.priceLabel) - parsePrice(b.priceLabel),
      );
    }

    if (sortBy === "price-desc") {
      list = [...list].sort(
        (a, b) => parsePrice(b.priceLabel) - parsePrice(a.priceLabel),
      );
    }

    return list;
  }, [activeCategory, appliedFilters, sortBy]);

  const categoryLabel =
    activeCategory === "food-processing"
      ? "Food Processing"
      : activeCategory.replace("-", " ");

  return (
    <>
      <section className="px-margin-mobile py-4 md:px-margin-desktop">
        <h2 className="text-headline-lg-mobile text-primary md:text-headline-lg">
          Kategori & Filter
        </h2>
      </section>

      <CategoryTabs activeSlug={activeCategory} onChange={setActiveCategory} />

      <div className="flex flex-col gap-gutter px-margin-mobile md:px-margin-desktop">
        <FilterSidebar
          readyStock={readyStock}
          indent={indent}
          minPrice={minPrice}
          brand={brand}
          onReadyStockChange={setReadyStock}
          onIndentChange={setIndent}
          onMinPriceChange={setMinPrice}
          onBrandChange={setBrand}
          onApply={() =>
            setAppliedFilters({ readyStock, indent, minPrice, brand })
          }
        />

        <div className="px-margin-mobile py-2 md:px-0">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-body-sm text-on-surface-variant">
              <span className="font-bold text-primary">
                {filteredProducts.length}
              </span>{" "}
              Mesin {categoryLabel} Ditemukan
            </p>
            <div className="flex items-center gap-2">
              <span className="text-body-sm text-on-surface-variant">
                Urutkan:
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="cursor-pointer border-none bg-transparent text-body-sm font-semibold text-primary outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-gutter">
            {filteredProducts.map((product) => (
              <CategoryProductCard key={product.slug} product={product} />
            ))}
          </div>

          {!filteredProducts.length ? (
            <div className="py-16 text-center text-body-md text-on-surface-variant">
              Tidak ada produk yang cocok dengan filter saat ini.
            </div>
          ) : null}

          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-on-surface-variant transition-colors hover:bg-surface-variant"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  page === 1
                    ? "bg-primary text-on-primary"
                    : "border border-border-subtle text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-2 text-on-surface-variant">...</span>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-on-surface-variant transition-colors hover:bg-surface-variant"
            >
              8
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-on-surface-variant transition-colors hover:bg-surface-variant"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
