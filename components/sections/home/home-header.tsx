"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

export function HomeHeader() {
  return (
    <header className="flex items-start justify-between px-4 pb-2 pt-4">
      <div>
        <h1 className="text-[17px] font-bold leading-tight text-primary">
          Solusi Mesin Industri
        </h1>
        <p className="mt-0.5 text-[11px] text-on-surface-variant">
          Terpercaya &amp; Bergaransi Resmi
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/notifikasi"
          aria-label="Notifikasi"
          className="relative flex size-10 items-center justify-center rounded-full border border-border-subtle bg-white text-primary shadow-sm"
        >
          <Bell className="size-[18px]" strokeWidth={2.2} />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-[#ef4444] ring-2 ring-white" />
        </Link>
        <button
          type="button"
          aria-label="Cari produk"
          className="flex size-10 items-center justify-center rounded-full border border-border-subtle bg-white text-primary shadow-sm"
        >
          <Search className="size-[18px]" strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}