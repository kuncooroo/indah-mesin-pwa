"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileDown,
  MapPin,
  Search,
  User,
} from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { ProductThumb } from "@/components/shared/product-thumb";
import { samplePurchaseOrder } from "@/lib/data/purchase-order";
import { cn } from "@/lib/utils";

function PoStatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-2.5 py-1 text-[11px] font-semibold text-[#b45309]">
      <Clock3 className="size-3.5" strokeWidth={2.2} />
      {label}
    </span>
  );
}

export function PurchaseOrderSummary() {
  const [confirmed, setConfirmed] = useState(false);
  const order = samplePurchaseOrder;

  function handleConfirm() {
    if (confirm("Konfirmasi Purchase Order ini?")) {
      setConfirmed(true);
    }
  }

  return (
    <div className="pb-36">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <BackLink href="/simpanan" />
          <h1 className="text-[15px] font-bold text-primary">
            Ringkasan Purchase Order
          </h1>
          <button
            type="button"
            aria-label="Cari"
            className="flex size-9 items-center justify-center rounded-full text-primary"
          >
            <Search className="size-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <main className="space-y-4 px-4 pt-4">
        <section className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-primary">
                <ClipboardList className="size-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="text-[16px] font-bold text-primary">{order.number}</p>
                <p className="mt-0.5 text-[12px] text-on-surface-variant">
                  {order.dateLabel}
                </p>
              </div>
            </div>
            <PoStatusBadge label={confirmed ? "Dikonfirmasi" : order.statusLabel} />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <article className="rounded-2xl border border-border-subtle bg-white p-3.5 shadow-sm">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#eff6ff] text-primary">
                <User className="size-4" strokeWidth={2} />
              </span>
              <p className="text-[12px] font-semibold text-on-surface-variant">
                Pemesan
              </p>
            </div>
            <p className="text-[13px] font-bold leading-snug text-primary">
              {order.customer.name}
            </p>
            <p className="mt-1.5 text-[11px] text-on-surface-variant">
              {order.customer.phone}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-on-surface-variant">
              {order.customer.email}
            </p>
          </article>

          <article className="rounded-2xl border border-border-subtle bg-white p-3.5 shadow-sm">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#eff6ff] text-primary">
                <MapPin className="size-4" strokeWidth={2} />
              </span>
              <p className="text-[12px] font-semibold text-on-surface-variant">
                Pengiriman
              </p>
            </div>
            <p className="text-[13px] font-bold leading-snug text-primary">
              {order.shipping.location}
            </p>
            <p className="mt-2 text-[11px] text-on-surface-variant">
              Estimasi tiba
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-primary">
              <Calendar className="size-3.5" strokeWidth={2} />
              {order.shipping.estimatedArrivalLabel}
            </p>
          </article>
        </section>

        <section>
          <h2 className="mb-3 text-[14px] font-bold text-primary">Daftar Item</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <article
                key={item.id}
                className="flex gap-3 rounded-2xl border border-border-subtle bg-white p-3 shadow-sm"
              >
                <Link
                  href={`/produk/${item.slug}`}
                  className="block size-[72px] shrink-0 overflow-hidden rounded-xl"
                >
                  <ProductThumb className="size-full" iconClassName="size-8" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/produk/${item.slug}`}>
                    <h3 className="line-clamp-2 text-[13px] font-bold leading-snug text-primary">
                      {item.name}
                    </h3>
                  </Link>
                  <span className="mt-1.5 inline-flex rounded-md bg-[#eff6ff] px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {item.categoryLabel}
                  </span>
                  <div className="mt-2.5 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-on-surface-variant">Qty</p>
                      <p className="text-[12px] font-bold text-primary">
                        {item.quantityLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-on-surface-variant">Harga</p>
                      <p className="text-[12px] font-bold text-primary">
                        {item.unitPriceLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-[14px] font-bold text-primary">Rincian Biaya</h2>
          <dl className="space-y-2.5 text-[12px]">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-on-surface-variant">Subtotal</dt>
              <dd className="font-semibold text-primary">
                {order.costSummary.subtotalLabel}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-on-surface-variant">Ongkir</dt>
              <dd className="font-semibold text-primary">
                {order.costSummary.shippingLabel}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-on-surface-variant">PPN 11%</dt>
              <dd className="font-semibold text-primary">
                {order.costSummary.taxLabel}
              </dd>
            </div>
            <div className="border-t border-border-subtle pt-3">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-[13px] font-bold text-primary">Total</dt>
                <dd className="text-[18px] font-bold text-primary">
                  {order.costSummary.totalLabel}
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-[13px] font-bold text-primary">Catatan</h2>
          <p className="text-[12px] leading-relaxed text-on-surface-variant">
            {order.notes}
          </p>
        </section>
      </main>

      <div className="fixed bottom-24 left-0 right-0 z-40 mx-auto w-full max-w-[480px] border-t border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={order.pdfHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-white text-[13px] font-semibold text-primary transition-colors hover:bg-[#eff6ff]"
          >
            <FileDown className="size-4" strokeWidth={2.2} />
            Unduh PDF
          </a>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={confirmed}
            className={cn(
              "inline-flex h-12 items-center justify-center gap-2 rounded-2xl text-[13px] font-semibold text-white transition-colors",
              confirmed
                ? "bg-[#64748b]"
                : "bg-primary hover:bg-primary-container",
            )}
          >
            <CheckCircle2 className="size-4" strokeWidth={2.2} />
            {confirmed ? "Terkonfirmasi" : "Konfirmasi"}
          </button>
        </div>
      </div>
    </div>
  );
}
