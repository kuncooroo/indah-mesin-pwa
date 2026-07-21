"use client";

import Link from "next/link";
import { CheckCircle2, FileDown, MessageCircle } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { rfqWhatsAppMessage, waUrl } from "@/lib/whatsapp";

type RfqSuccessViewProps = {
  number: string;
  pdfUrl: string;
  customerName: string;
};

export function RfqSuccessView({
  number,
  pdfUrl,
  customerName,
}: RfqSuccessViewProps) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const absolutePdfUrl = origin ? `${origin}${pdfUrl}` : pdfUrl;

  const waHref = waUrl(
    rfqWhatsAppMessage({
      customerName,
      rfqNumber: number,
      pdfUrl,
      origin,
    }),
  );

  return (
    <div className="pb-36">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink href="/simpanan" />
          <h1 className="text-[16px] font-bold text-primary">Permintaan Penawaran</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-8">
        <section className="rounded-3xl border border-border-subtle bg-white p-6 text-center shadow-sm">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#ecfdf5] text-[#059669]">
            <CheckCircle2 className="size-8" strokeWidth={2} />
          </span>
          <h2 className="mt-4 text-[20px] font-bold text-primary">
            Permintaan berhasil dibuat
          </h2>
          <p className="mt-2 text-[13px] text-on-surface-variant">
            Nomor RFQ Anda siap dibagikan ke admin.
          </p>
          <p className="mt-4 rounded-2xl bg-[#eff6ff] px-4 py-3 text-[18px] font-bold tracking-wide text-primary">
            {number}
          </p>
          <p className="mt-2 text-[12px] text-on-surface-variant">
            Customer: {customerName}
          </p>
        </section>

        <section className="mt-6 space-y-3">
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-white text-[14px] font-semibold text-primary transition-colors hover:bg-[#eff6ff]"
          >
            <FileDown className="size-4" strokeWidth={2.2} />
            Download PDF
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-[14px] font-semibold text-white transition-colors hover:bg-primary-container"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            Hubungi Admin WA
          </a>
        </section>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-on-surface-variant">
          PDF berisi daftar produk, jumlah, dan catatan. Admin dapat membuka dashboard
          untuk menindaklanjuti permintaan Anda.
        </p>
        <p className="mt-2 break-all text-center text-[10px] text-on-surface-variant/80">
          {absolutePdfUrl}
        </p>

        <Link
          href="/produk"
          className="mt-6 block text-center text-[13px] font-semibold text-primary"
        >
          Kembali ke Produk
        </Link>
      </main>
    </div>
  );
}
