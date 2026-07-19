"use client";

import { useState } from "react";

import { quickFilters } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export function QuickFiltersSection() {
  const [activeFilter, setActiveFilter] = useState(quickFilters[0]?.id);

  return (
    <section className="sticky top-12 z-40 border-y border-border-subtle bg-white py-4 md:top-16">
      <div className="flex gap-3 overflow-x-auto px-margin-mobile py-1 no-scrollbar md:px-margin-desktop">
        {quickFilters.map((filter) => {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-body-sm font-semibold transition-colors active:scale-95",
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-border-subtle text-on-surface-variant hover:border-primary hover:text-primary",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
