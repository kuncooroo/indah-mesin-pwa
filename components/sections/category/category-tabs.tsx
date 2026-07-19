"use client";

import { Cog, Factory, Package, Soup, Sprout } from "lucide-react";

import { categoryTabs } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const tabIcons = {
  Cog,
  Package,
  Sprout,
  Soup,
  Factory,
};

type CategoryTabsProps = {
  activeSlug: string;
  onChange: (slug: string) => void;
};

export function CategoryTabs({ activeSlug, onChange }: CategoryTabsProps) {
  return (
    <section className="mb-6 overflow-x-auto border-b border-border-subtle px-margin-mobile no-scrollbar md:px-margin-desktop">
      <div className="flex gap-8">
        {categoryTabs.map((tab) => {
          const Icon = tabIcons[tab.icon as keyof typeof tabIcons] ?? Cog;
          const isActive = activeSlug === tab.slug;

          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => onChange(tab.slug)}
              className={cn(
                "flex flex-col items-center gap-1 py-3 transition-all",
                isActive
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-primary",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-body-sm font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
