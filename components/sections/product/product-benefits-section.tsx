import Image from "next/image";

import type { ProductBenefit } from "@/lib/types";

type ProductBenefitsSectionProps = {
  benefit: ProductBenefit;
};

export function ProductBenefitsSection({ benefit }: ProductBenefitsSectionProps) {
  return (
    <section className="mt-section-gap grid grid-cols-1 items-center gap-8">
      <div>
        <h3 className="mb-4 text-headline-md">{benefit.title}</h3>
        <p className="mb-6 leading-relaxed text-on-surface-variant">
          {benefit.description}
        </p>
        {benefit.stats ? (
          <div className="grid grid-cols-2 gap-4">
            {benefit.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border-subtle bg-surface-container-low p-4"
              >
                <div className="mb-1 text-xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-body-sm text-outline">{stat.label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {benefit.image ? (
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={benefit.image}
            alt={benefit.title}
            width={640}
            height={420}
            className="h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {benefit.imageCaption ? (
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/60 to-transparent p-6">
              <p className="font-semibold text-white">{benefit.imageCaption}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
