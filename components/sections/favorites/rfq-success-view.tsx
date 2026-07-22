"use client";

import Link from "next/link";
import { CheckCircle2, FileDown, MessageCircle } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { getRfqStatusLabel } from "@/lib/rfq-status";
import { rfqWhatsAppMessage, waUrl } from "@/lib/whatsapp";

type RfqSuccessViewProps = {
  number: string;
  pdfUrl: string;
  companyName: string;
  picName: string;
  status: string;
};

export function RfqSuccessView({
  number,
  pdfUrl,
  companyName,
  picName,
  status,
}: RfqSuccessViewProps) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  const waHref = waUrl(
    rfqWhatsAppMessage({
      customerName: picName,
      companyName,
      rfqNumber: number,
      pdfUrl,
      origin,
    }),
  );

  return (
    <div className="pb-2">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <BackLink href="/simpanan" />
          <h1 className="text-[16px] font-bold text-primary">RFQ Terkirim</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-8">
        <section className="rounded-3xl border border-border-subtle bg-white p-6 text-center shadow-sm">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#ecfdf5] text-[#059669]">
            <CheckCircle2 className="size-8" strokeWidth={2} />
          </span>
          <h2 className="mt-4 text-[20px] font-bold text-primary">
            RFQ berhasil dikirim
          </h2>
          <p className="mt-2 text-[13px] text-on-surface-variant">
            Tim sales kami akan meninjau permintaan Anda.
          </p>
          <p className="mt-4 rounded-2xl bg-[#eff6ff] px-4 py-3 text-[18px] font-bold tracking-wide text-primary">
            {number}
          </p>
          <p className="mt-3 inline-flex rounded-full bg-[#f1f5f9] px-3 py-1 text-[12px] font-semibold text-primary">
            Status: {getRfqStatusLabel(status)}
          </p>
          <p className="mt-2 text-[12px] text-on-surface-variant">
            {companyName} · PIC: {picName}
          </p>
        </section>

        <section className="mt-6 space-y-3">
          <Link
            href="/akun/rfq"
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-[14px] font-semibold text-white transition-colors hover:bg-primary-container"
          >
            Lihat Status
          </Link>

          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-white text-[14px] font-semibold text-primary transition-colors hover:bg-[#eff6ff]"
          >
            <FileDown className="size-4" strokeWidth={2.2} />
            Download PDF RFQ
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-white text-[14px] font-semibold text-primary transition-colors hover:bg-[#f8fafc]"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            Hubungi Sales
          </a>
        </section>

        <Link
          href="/produk"
          className="mt-6 block text-center text-[13px] font-semibold text-primary"
        >
          Lanjut Belanja
        </Link>
      </main>
    </div>
  );
}
