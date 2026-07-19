"use client";

import { ChevronDown } from "lucide-react";

import { brandOptions } from "@/lib/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FilterSidebarProps = {
  readyStock: boolean;
  indent: boolean;
  minPrice: string;
  brand: string;
  onReadyStockChange: (value: boolean) => void;
  onIndentChange: (value: boolean) => void;
  onMinPriceChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onApply: () => void;
};

export function FilterSidebar({
  readyStock,
  indent,
  minPrice,
  brand,
  onReadyStockChange,
  onIndentChange,
  onMinPriceChange,
  onBrandChange,
  onApply,
}: FilterSidebarProps) {
  return (
    <aside className="px-margin-mobile md:px-0">
      <div className="sticky top-20 rounded-xl border border-border-subtle bg-surface-container-low p-gutter">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-headline-md text-primary">Filters</h3>
          <button type="button" className="md:hidden" aria-label="Toggle filters">
            <ChevronDown className="h-5 w-5 text-primary" />
          </button>
        </div>

        <div className="mb-8">
          <label className="mb-3 block text-body-md font-semibold text-primary">
            Status Stok
          </label>
          <div className="space-y-3">
            <label className="group flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={readyStock}
                onChange={(event) => onReadyStockChange(event.target.checked)}
                className="h-5 w-5 rounded border-outline text-primary focus:ring-primary"
              />
              <span className="text-body-md text-on-surface-variant group-hover:text-primary">
                Ready Stock
              </span>
            </label>
            <label className="group flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={indent}
                onChange={(event) => onIndentChange(event.target.checked)}
                className="h-5 w-5 rounded border-outline text-primary focus:ring-primary"
              />
              <span className="text-body-md text-on-surface-variant group-hover:text-primary">
                Inden
              </span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <label className="mb-3 block text-body-md font-semibold text-primary">
            Mulai Dari (IDR)
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-body-sm text-outline">
              Rp
            </span>
            <Input
              type="number"
              value={minPrice}
              onChange={(event) => onMinPriceChange(event.target.value)}
              placeholder="Harga Minimum"
              className="border-border-subtle bg-surface pl-10"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="mb-3 block text-body-md font-semibold text-primary">
            Manufaktur
          </label>
          <select
            value={brand}
            onChange={(event) => onBrandChange(event.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary-container"
          >
            {brandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="button"
          onClick={onApply}
          className="h-12 w-full rounded-full bg-primary-container text-on-primary-container hover:bg-primary"
        >
          Terapkan Filter
        </Button>
      </div>
    </aside>
  );
}
