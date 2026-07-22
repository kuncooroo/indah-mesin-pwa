"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";

export function FavoritesHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <BackLink />
        <h1 className="text-[17px] font-bold text-primary">Keranjang RFQ</h1>
        <Link
          href="/akun/rfq"
          aria-label="RFQ Saya"
          className="flex size-9 items-center justify-center rounded-full bg-surface-container text-primary"
        >
          <ClipboardList className="size-[18px]" strokeWidth={2.2} />
        </Link>
      </div>
    </header>
  );
}
