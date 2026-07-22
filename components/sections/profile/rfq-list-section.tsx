"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, ClipboardList, Loader2 } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { getProfileData } from "@/lib/profile-store";
import { getRfqHistory, type RfqHistoryEntry } from "@/lib/rfq-history-store";
import { getRfqStatusLabel } from "@/lib/rfq-status";

type RfqListItem = RfqHistoryEntry & {
  source: "local" | "server";
};

export function RfqListSection() {
  const [items, setItems] = useState<RfqListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRfqs() {
      const localItems = getRfqHistory().map((item) => ({
        ...item,
        source: "local" as const,
      }));

      try {
        const profile = getProfileData();
        const response = await fetch(
          `/api/rfq?customerId=${encodeURIComponent(profile.id)}`,
        );
        const payload = await response.json();

        if (response.ok && Array.isArray(payload.data)) {
          const serverItems: RfqListItem[] = payload.data.map(
            (item: {
              number: string;
              companyName: string;
              itemCount: number;
              status: string;
              submittedAt: string;
            }) => ({
              number: item.number,
              companyName: item.companyName,
              itemCount: item.itemCount,
              status: item.status,
              submittedAt: item.submittedAt,
              source: "server" as const,
            }),
          );

          const merged = new Map<string, RfqListItem>();
          [...serverItems, ...localItems].forEach((item) => {
            merged.set(item.number, item);
          });
          setItems(Array.from(merged.values()));
        } else {
          setItems(localItems);
        }
      } catch {
        setItems(localItems);
      } finally {
        setLoading(false);
      }
    }

    loadRfqs();
  }, []);

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink href="/akun" />
          <h1 className="text-[17px] font-bold text-primary">RFQ Saya</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-4">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : items.length ? (
          <div className="space-y-3">
            {items.map((item) => (
              <Link
                key={item.number}
                href={`/simpanan/rfq/${encodeURIComponent(item.number)}/sukses`}
                className="flex items-center justify-between rounded-2xl border border-border-subtle bg-white p-4 shadow-sm transition-colors hover:bg-[#f8fafc]"
              >
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-primary">{item.number}</p>
                  <p className="mt-0.5 text-[12px] text-on-surface-variant">
                    {item.companyName} · {item.itemCount} Produk
                  </p>
                  <p className="mt-1 inline-flex rounded-full bg-[#eff6ff] px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {getRfqStatusLabel(item.status)}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-on-surface-variant" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <ClipboardList className="mx-auto size-10 text-on-surface-variant/50" />
            <p className="mt-3 text-[13px] font-medium text-on-surface-variant">
              Belum ada RFQ yang dikirim.
            </p>
            <Link href="/produk" className="mt-3 inline-flex text-[13px] font-semibold text-primary">
              Jelajahi Produk
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
