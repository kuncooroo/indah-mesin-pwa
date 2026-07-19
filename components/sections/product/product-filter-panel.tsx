"use client";

import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import {
  catalogCategoryOptions,
  catalogColorOptions,
  catalogProductTypeOptions,
  catalogSortOptions,
  defaultCatalogFilters,
  formatFilterPrice,
  parseFilterPriceInput,
  priceScaleLabels,
  priceSliderMax,
  type CatalogFilterState,
} from "@/lib/data/catalog-filters";
import { filterCatalogProducts } from "@/lib/data/product-catalog";
import { cn } from "@/lib/utils";

type ProductFilterPanelProps = {
  open: boolean;
  appliedFilters: CatalogFilterState;
  searchQuery: string;
  onClose: () => void;
  onApply: (filters: CatalogFilterState) => void;
};

function FilterChip({
  label,
  active,
  onClick,
  variant = "filled",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "filled" | "outline";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors",
        variant === "filled" &&
          (active
            ? "bg-primary text-white"
            : "border border-border-subtle bg-white text-on-surface"),
        variant === "outline" &&
          (active
            ? "border-2 border-primary bg-white text-primary"
            : "border border-border-subtle bg-white text-on-surface"),
      )}
    >
      {label}
    </button>
  );
}

function PriceRangeSlider({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}) {
  const minPercent = (minValue / priceSliderMax) * 100;
  const maxPercent = (maxValue / priceSliderMax) * 100;

  return (
    <div className="pt-1">
      <div className="relative h-8">
        <div className="absolute top-1/2 right-0 left-0 h-1.5 -translate-y-1/2 rounded-full bg-[#e2e8f0]" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />
        <input
          type="range"
          min={0}
          max={priceSliderMax}
          step={5_000_000}
          value={minValue}
          onChange={(event) => {
            const next = Number(event.target.value);
            onMinChange(Math.min(next, maxValue));
          }}
          className="range-thumb absolute inset-0 z-20 w-full appearance-none bg-transparent"
          aria-label="Harga minimum"
        />
        <input
          type="range"
          min={0}
          max={priceSliderMax}
          step={5_000_000}
          value={maxValue}
          onChange={(event) => {
            const next = Number(event.target.value);
            onMaxChange(Math.max(next, minValue));
          }}
          className="range-thumb absolute inset-0 z-30 w-full appearance-none bg-transparent"
          aria-label="Harga maksimum"
        />
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-on-surface-variant">
        {priceScaleLabels.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

export function ProductFilterPanel({
  open,
  appliedFilters,
  searchQuery,
  onClose,
  onApply,
}: ProductFilterPanelProps) {
  const [draft, setDraft] = useState<CatalogFilterState>(appliedFilters);

  useEffect(() => {
    if (open) {
      setDraft(appliedFilters);
    }
  }, [open, appliedFilters]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const previewCount = useMemo(
    () => filterCatalogProducts(draft, searchQuery).length,
    [draft, searchQuery],
  );

  if (!open) return null;

  function updateDraft(partial: Partial<CatalogFilterState>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function handleReset() {
    setDraft(defaultCatalogFilters);
  }

  function handleApply(closeAfter = false) {
    onApply(draft);
    if (closeAfter) onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] mx-auto flex w-full max-w-[480px] flex-col bg-white">
      <header className="sticky top-0 z-10 border-b border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink onClick={onClose} />
          <h1 className="text-[17px] font-bold text-primary">Filter</h1>
          <button
            type="button"
            onClick={handleReset}
            className="text-[13px] font-semibold text-primary"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5 pb-28">
        <section className="mb-7">
          <h2 className="mb-3 text-[14px] font-bold text-primary">Kategori</h2>
          <div className="flex flex-wrap gap-2">
            {catalogCategoryOptions.map((option) => (
              <FilterChip
                key={option.id}
                label={option.label}
                active={draft.category === option.id}
                onClick={() => updateDraft({ category: option.id })}
              />
            ))}
          </div>
        </section>

        <section className="mb-7">
          <h2 className="mb-3 text-[14px] font-bold text-primary">
            Rentang Harga
          </h2>
          <PriceRangeSlider
            minValue={draft.minPrice}
            maxValue={draft.maxPrice}
            onMinChange={(minPrice) => updateDraft({ minPrice })}
            onMaxChange={(maxPrice) => updateDraft({ maxPrice })}
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-[11px] text-on-surface-variant">
                Min. Harga
              </span>
              <input
                type="text"
                value={formatFilterPrice(draft.minPrice)}
                onChange={(event) =>
                  updateDraft({
                    minPrice: Math.min(
                      parseFilterPriceInput(event.target.value),
                      draft.maxPrice,
                    ),
                  })
                }
                className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[12px] font-semibold text-primary outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] text-on-surface-variant">
                Maks. Harga
              </span>
              <input
                type="text"
                value={formatFilterPrice(draft.maxPrice)}
                onChange={(event) =>
                  updateDraft({
                    maxPrice: Math.max(
                      parseFilterPriceInput(event.target.value),
                      draft.minPrice,
                    ),
                  })
                }
                className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[12px] font-semibold text-primary outline-none"
              />
            </label>
          </div>
        </section>

        <section className="mb-7">
          <h2 className="mb-3 text-[14px] font-bold text-primary">Produk</h2>
          <div className="flex flex-wrap gap-2">
            {catalogProductTypeOptions.map((option) => (
              <FilterChip
                key={option.id}
                label={option.label}
                variant="outline"
                active={draft.productType === option.id}
                onClick={() => updateDraft({ productType: option.id })}
              />
            ))}
          </div>
        </section>

        <section className="mb-7">
          <h2 className="mb-3 text-[14px] font-bold text-primary">Warna</h2>
          <div className="flex flex-wrap gap-3">
            {catalogColorOptions.map((option) => {
              const isActive = draft.color === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-label={option.label}
                  onClick={() =>
                    updateDraft({
                      color: isActive ? "all" : option.id,
                    })
                  }
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full transition-transform",
                    option.border && "border border-border-subtle",
                    isActive && "ring-2 ring-primary ring-offset-2",
                  )}
                  style={{ backgroundColor: option.hex }}
                >
                  {isActive ? (
                    <Check
                      className={cn(
                        "size-4",
                        option.id === "white" || option.id === "grey"
                          ? "text-primary"
                          : "text-white",
                      )}
                      strokeWidth={3}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-7">
          <h2 className="mb-3 text-[14px] font-bold text-primary">Urutkan</h2>
          <div className="space-y-3">
            {catalogSortOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3"
              >
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full border-2",
                    draft.sortBy === option.value
                      ? "border-primary"
                      : "border-border-subtle",
                  )}
                >
                  {draft.sortBy === option.value ? (
                    <span className="size-2.5 rounded-full bg-primary" />
                  ) : null}
                </span>
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={draft.sortBy === option.value}
                  onChange={() => updateDraft({ sortBy: option.value })}
                  className="sr-only"
                />
                <span className="text-[13px] text-on-surface">{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-[14px] font-bold text-primary">
            Ketersediaan
          </h2>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3">
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-md border-2",
                  draft.available
                    ? "border-primary bg-primary text-white"
                    : "border-border-subtle bg-white",
                )}
              >
                {draft.available ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : null}
              </span>
              <input
                type="checkbox"
                checked={draft.available}
                onChange={(event) =>
                  updateDraft({ available: event.target.checked })
                }
                className="sr-only"
              />
              <span className="text-[13px] text-on-surface">Tersedia</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-md border-2",
                  draft.limitedStock
                    ? "border-primary bg-primary text-white"
                    : "border-border-subtle bg-white",
                )}
              >
                {draft.limitedStock ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : null}
              </span>
              <input
                type="checkbox"
                checked={draft.limitedStock}
                onChange={(event) =>
                  updateDraft({ limitedStock: event.target.checked })
                }
                className="sr-only"
              />
              <span className="text-[13px] text-on-surface">Stok terbatas</span>
            </label>
          </div>
        </section>
      </div>

      <div className="absolute right-0 bottom-0 left-0 border-t border-border-subtle bg-white px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleApply(false)}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary text-[13px] font-semibold text-white"
          >
            Terapkan Filter
          </button>
          <button
            type="button"
            onClick={() => handleApply(true)}
            className="inline-flex h-12 items-center justify-center rounded-2xl border-2 border-primary bg-white text-[13px] font-semibold text-primary"
          >
            Lihat Hasil ({previewCount})
          </button>
        </div>
      </div>
    </div>
  );
}
