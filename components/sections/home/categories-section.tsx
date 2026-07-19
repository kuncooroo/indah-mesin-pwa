import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { homeCategories } from "@/lib/data/categories";
import { getCategoryIcon } from "@/lib/icons";

export function CategoriesSection() {
  return (
    <section className="px-margin-mobile py-section-gap md:px-margin-desktop">
      <SectionHeading title="Kategori Utama" href="/kategori" className="mb-6" />
      <div className="grid grid-cols-2 gap-4">
        {homeCategories.map((category) => {
          const Icon = getCategoryIcon(category.icon);

          return (
            <Link
              key={category.slug}
              href={category.href}
              className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-border-subtle bg-white p-6 text-center transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container transition-colors group-hover:bg-primary-container group-hover:text-white">
                <Icon className="h-8 w-8 text-primary group-hover:text-white" />
              </div>
              <span className="text-body-sm font-semibold text-on-surface">
                {category.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
