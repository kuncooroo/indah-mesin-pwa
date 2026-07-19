import Link from "next/link";
import { Search, Settings } from "lucide-react";

import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-metallic-bg px-margin-mobile pt-8 pb-12 md:px-margin-desktop">
      <div className="relative z-10">
        <h2 className="mb-6 max-w-2xl text-headline-lg-mobile leading-tight text-primary md:text-headline-lg">
          Temukan Solusi Industri <br className="hidden md:block" />
          Terbaik Anda
        </h2>
        <div className="relative max-w-3xl">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-outline" />
          <Input
            type="search"
            placeholder="Cari CNC, Packaging, atau SKU..."
            className="h-12 border-border-subtle bg-white pl-12 text-body-md shadow-sm"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 opacity-10">
        <Settings className="h-[240px] w-[240px] rotate-12 text-primary" />
      </div>
    </section>
  );
}
