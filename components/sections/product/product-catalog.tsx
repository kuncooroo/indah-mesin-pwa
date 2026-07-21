"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  LayoutGrid,
  LayoutList,
  Search,
} from "lucide-react";

import { ProductFilterPanel } from "@/components/sections/product/product-filter-panel";
import { BackLink } from "@/components/shared/back-link";
import { CatalogProductCard } from "@/components/shared/catalog-product-card";
import {
  catalogSortOptions,
  defaultCatalogFilters,
  type CatalogFilterState,
} from "@/lib/data/catalog-filters";
import { filterCatalogProducts } from "@/lib/data/product-catalog";
import { cn } from "@/lib/utils";

type ProductCatalogProps = {
  initialFilter?: string;
};

type ViewMode = "grid" | "list";

const PAGE_SIZE_GRID = 4;
const PAGE_SIZE_LIST = 5;

export function ProductCatalog({ initialFilter = "all" }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<CatalogFilterState>({
    ...defaultCatalogFilters,
    category: initialFilter,
  });

  const pageSize = viewMode === "grid" ? PAGE_SIZE_GRID : PAGE_SIZE_LIST;

  const filteredProducts = useMemo(
    () => filterCatalogProducts(appliedFilters, searchQuery),
    [appliedFilters, searchQuery],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const selectedSortLabel = useMemo(
    () =>
      catalogSortOptions.find((option) => option.value === appliedFilters.sortBy)
        ?.label ?? "Terbaru",
    [appliedFilters.sortBy],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters, searchQuery, viewMode]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function handleApplyFilters(filters: CatalogFilterState) {
    setAppliedFilters(filters);
  }

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  function toggleViewMode() {
    setViewMode((current) => (current === "grid" ? "list" : "grid"));
  }

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <BackLink href="/" />
          <div className="min-w-0 flex-1 text-center">
            <h1 className="text-[17px] font-bold text-primary">Retort</h1>
            <p className="text-[11px] text-on-surface-variant">
              {filteredProducts.length} produk tersedia
            </p>
          </div>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>

        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari produk retort, sterilizer, atau aksesoris..."
              className="h-10 w-full rounded-xl border border-border-subtle bg-[#f8fafc] pr-3 pl-9 text-[12px] outline-none placeholder:text-on-surface-variant/70"
            />
          </div>
          <button
            type="button"
            aria-label={viewMode === "grid" ? "Tampilan list" : "Tampilan grid"}
            onClick={toggleViewMode}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-[#f8fafc] text-primary"
          >
            {viewMode === "grid" ? (
              <LayoutList className="size-[18px]" strokeWidth={2.2} />
            ) : (
              <LayoutGrid className="size-[18px]" strokeWidth={2.2} />
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-3 text-[12px] font-semibold text-primary"
          >
            <Filter className="size-3.5" />
            Filter
          </button>
        </div>
      </header>

      <section className="px-4 pt-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[12px] text-on-surface-variant">
            <span className="font-bold text-primary">{filteredProducts.length}</span>{" "}
            Produk ditemukan
          </p>
          <div className="inline-flex shrink-0 items-center text-[12px] text-on-surface-variant">
            <span>Sort:</span>
            <div className="relative ml-0.5 inline-flex items-center">
              <span
                aria-hidden="true"
                className="invisible whitespace-nowrap pl-0.5 pr-3.5 text-[12px] font-semibold"
              >
                {selectedSortLabel}
              </span>
              <select
                value={appliedFilters.sortBy}
                onChange={(event) =>
                  setAppliedFilters((current) => ({
                    ...current,
                    sortBy: event.target.value,
                  }))
                }
                aria-label="Urutkan produk"
                className="absolute inset-0 cursor-pointer appearance-none bg-transparent pl-0.5 pr-3.5 text-[12px] font-semibold text-primary outline-none"
              >
                {catalogSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-0 size-3 -translate-y-1/2 text-primary" />
            </div>
          </div>
        </div>

        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-2 gap-3 auto-rows-fr"
              : "flex flex-col gap-3",
          )}
        >
          {paginatedProducts.map((product, index) => (
            <CatalogProductCard
              key={`${product.slug}-${index}`}
              product={product}
              variant={viewMode}
            />
          ))}
        </div>

        {!filteredProducts.length ? (
          <div className="py-16 text-center text-[13px] text-on-surface-variant">
            Tidak ada produk yang cocok dengan filter saat ini.
          </div>
        ) : null}

        {filteredProducts.length > pageSize ? (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white text-primary transition-colors enabled:hover:bg-[#eff6ff] disabled:opacity-40"
            >
              <ChevronLeft className="size-4" strokeWidth={2.2} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full text-[12px] font-semibold transition-colors",
                    page === currentPage
                      ? "bg-primary text-white"
                      : "border border-border-subtle bg-white text-primary hover:bg-[#eff6ff]",
                  )}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              aria-label="Halaman berikutnya"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white text-primary transition-colors enabled:hover:bg-[#eff6ff] disabled:opacity-40"
            >
              <ChevronRight className="size-4" strokeWidth={2.2} />
            </button>
          </div>
        ) : null}
      </section>

      <ProductFilterPanel
        open={showFilter}
        appliedFilters={appliedFilters}
        searchQuery={searchQuery}
        onClose={() => setShowFilter(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}
