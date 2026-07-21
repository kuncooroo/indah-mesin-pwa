import {
  Cpu,
  GraduationCap,
  HardHat,
  Puzzle,
  Wrench,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { homeServices } from "@/lib/data/services";

const serviceIcons = {
  mesin: Cpu,
  sparepart: Puzzle,
  instalasi: HardHat,
  training: GraduationCap,
  maintenance: Wrench,
} as const;

export function CategoriesSection() {
  return (
    <section className="px-4 py-5">
      <SectionHeading title="Layanan" className="mb-4" />

      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {homeServices.map((service) => {
          const Icon = serviceIcons[service.id as keyof typeof serviceIcons];

          return (
            <div
              key={service.id}
              className="group flex w-[78px] shrink-0 cursor-pointer flex-col items-center gap-2"
            >
              <div className="flex size-[72px] items-center justify-center rounded-2xl border border-border-subtle bg-[#eef4ff] text-primary transition-colors group-hover:border-primary group-hover:bg-[#dbeafe]">
                <Icon className="size-8" strokeWidth={2} />
              </div>
              <span className="text-center text-[11px] font-medium leading-tight text-on-surface">
                {service.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
