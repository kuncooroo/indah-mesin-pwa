"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FileText, Loader2, Upload } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import type { FavoriteItem } from "@/lib/data/favorites";
import { clearRfqCart, getRfqCartItems } from "@/lib/rfq-cart-store";
import { getProfileData } from "@/lib/profile-store";
import { addRfqToHistory } from "@/lib/rfq-history-store";
import { PURCHASE_ESTIMATE_OPTIONS } from "@/lib/validations/rfq";
import { cn } from "@/lib/utils";

type AttachmentDraft = {
  fileName: string;
  fileType: "LAYOUT" | "DRAWING" | "SPECIFICATION";
};

export function RfqRequestForm() {
  const router = useRouter();
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [picName, setPicName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("Indonesia");
  const [purchaseEstimate, setPurchaseEstimate] = useState<
    "THIS_WEEK" | "THIS_MONTH" | "THREE_MONTHS" | "UNKNOWN"
  >("THIS_MONTH");
  const [budget, setBudget] = useState("");
  const [generalNote, setGeneralNote] = useState("");
  const [attachments, setAttachments] = useState<AttachmentDraft[]>([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  useEffect(() => {
    const cartItems = getRfqCartItems();
    setItems(cartItems);

    const profile = getProfileData();
    setPicName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone.replace(/\s/g, ""));

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!items.length) {
      router.replace("/simpanan");
    }
  }, [hydrated, items.length, router]);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: AttachmentDraft["fileType"],
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setAttachments((current) => [
      ...current.filter((item) => item.fileType !== fileType),
      { fileName: file.name, fileType },
    ]);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!items.length || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const profile = getProfileData();
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: profile.id,
          companyName,
          picName,
          email,
          phone,
          address,
          city,
          province,
          country,
          purchaseEstimate,
          budget: budget.trim() || undefined,
          generalNote: generalNote.trim() || undefined,
          attachments,
          items: items.map((item) => ({
            productId: item.id,
            slug: item.slug,
            name: item.name,
            quantity: item.quantity,
            note: item.note.trim() || undefined,
          })),
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Gagal mengirim RFQ.");
      }

      addRfqToHistory({
        number: payload.data.number,
        companyName: payload.data.companyName,
        itemCount: payload.data.itemCount,
        status: payload.data.status,
        submittedAt: payload.data.submittedAt,
      });

      clearRfqCart();
      router.push(
        `/simpanan/rfq/${encodeURIComponent(payload.data.number)}/sukses`,
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal mengirim RFQ.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!hydrated || !items.length) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <BackLink href="/simpanan" />
          <h1 className="text-[17px] font-bold text-primary">Permintaan Penawaran</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <form id="rfq-submit-form" onSubmit={handleSubmit} className="px-4 pt-4 pb-8">
        <section className="space-y-3">
          <h2 className="text-[13px] font-semibold text-primary">Informasi Perusahaan</h2>

          <label className="block space-y-1">
            <span className="text-[11px] font-medium text-on-surface-variant">
              Nama Perusahaan
            </span>
            <input
              required
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
              placeholder="PT Nusantara Food"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-[11px] font-medium text-on-surface-variant">Nama PIC</span>
            <input
              required
              value={picName}
              onChange={(event) => setPicName(event.target.value)}
              className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
            />
          </label>

          <div className="grid grid-cols-1 gap-3">
            <label className="block space-y-1">
              <span className="text-[11px] font-medium text-on-surface-variant">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-[11px] font-medium text-on-surface-variant">
                No WhatsApp
              </span>
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-[11px] font-medium text-on-surface-variant">Alamat</span>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-xl border border-border-subtle bg-white px-3 py-2 text-[13px] outline-none focus:border-primary"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="text-[11px] font-medium text-on-surface-variant">Kota</span>
              <input
                required
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-[11px] font-medium text-on-surface-variant">Provinsi</span>
              <input
                required
                value={province}
                onChange={(event) => setProvince(event.target.value)}
                className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-[11px] font-medium text-on-surface-variant">Negara</span>
            <input
              required
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
            />
          </label>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-[13px] font-semibold text-primary">Estimasi Pembelian</h2>
          <div className="space-y-2">
            {PURCHASE_ESTIMATE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border-subtle bg-white px-3 py-2.5"
              >
                <input
                  type="radio"
                  name="purchaseEstimate"
                  value={option.value}
                  checked={purchaseEstimate === option.value}
                  onChange={() => setPurchaseEstimate(option.value)}
                  className="size-4 accent-primary"
                />
                <span className="text-[13px] text-primary">{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="mt-6 space-y-3">
          <label className="block space-y-1">
            <span className="text-[11px] font-medium text-on-surface-variant">
              Budget (Opsional)
            </span>
            <input
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className="h-11 w-full rounded-xl border border-border-subtle bg-white px-3 text-[13px] outline-none focus:border-primary"
              placeholder="Contoh: Rp 500 juta - 1 miliar"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-[11px] font-medium text-on-surface-variant">Catatan Umum</span>
            <textarea
              rows={3}
              value={generalNote}
              onChange={(event) => setGeneralNote(event.target.value)}
              className="w-full rounded-xl border border-border-subtle bg-white px-3 py-2 text-[13px] outline-none focus:border-primary"
              placeholder="Kebutuhan teknis, timeline, atau informasi tambahan..."
            />
          </label>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-[13px] font-semibold text-primary">Upload File</h2>
          {(
            [
              ["LAYOUT", "Layout Pabrik"],
              ["DRAWING", "Drawing"],
              ["SPECIFICATION", "Spesifikasi"],
            ] as const
          ).map(([type, label]) => {
            const selected = attachments.find((item) => item.fileType === type);

            return (
              <label
                key={type}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-border-subtle bg-white px-3 py-3"
              >
                <div className="flex items-center gap-2">
                  <Upload className="size-4 text-primary" strokeWidth={2.2} />
                  <div>
                    <p className="text-[12px] font-semibold text-primary">{label}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      {selected?.fileName ?? "Pilih file (opsional)"}
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => handleFileChange(event, type)}
                />
              </label>
            );
          })}
        </section>

        <section className="mt-6 rounded-2xl border border-border-subtle bg-white p-4">
          <h2 className="text-[13px] font-bold text-primary">Ringkasan Produk</h2>
          <div className="mt-3 space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 border-b border-border-subtle/70 pb-2 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-primary">{item.name}</p>
                  {item.note.trim() ? (
                    <p className="mt-0.5 text-[10px] text-on-surface-variant">
                      Catatan: {item.note}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 text-[12px] font-bold text-primary">Qty {item.quantity}</p>
              </div>
            ))}
          </div>
          <Link
            href="/simpanan"
            className="mt-3 inline-flex text-[11px] font-semibold text-primary underline-offset-2 hover:underline"
          >
            Ubah keranjang RFQ
          </Link>
        </section>

        {error ? (
          <p className="mt-4 rounded-xl bg-[#fef2f2] px-3 py-2 text-[12px] text-[#b91c1c]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 pb-2">
          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(0,35,111,0.28)] transition-colors",
              submitting ? "bg-[#64748b]" : "bg-primary hover:bg-primary-container",
            )}
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2.2} />
            ) : (
              <FileText className="size-[18px]" strokeWidth={2} />
            )}
            {submitting ? "Mengirim..." : `Kirim RFQ (${totalItems} Item)`}
          </button>
        </div>
      </form>
    </div>
  );
}
