import Link from "next/link";
import { Bell } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";

const notifications = [
  {
    id: "notif-1",
    title: "PO Anda sedang ditinjau",
    message: "Purchase Order PO-2024-0056 sedang dalam proses review tim sales.",
    time: "2 jam lalu",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Promo Retort Batch #1",
    message: "Diskon 10% untuk unit retort pertama berlaku hingga akhir bulan.",
    time: "1 hari lalu",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Produk favorit tersedia",
    message: "Retort Sterilisasi Horizontal RH-1200 kembali ready stock.",
    time: "3 hari lalu",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className="page-rise pb-8">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink href="/" />
          <h1 className="text-[17px] font-bold text-primary">Notifikasi</h1>
          <span className="size-9" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-4">
        <div className="space-y-3">
          {notifications.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-primary">
                  <Bell className="size-4" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-[13px] font-bold text-primary">
                      {item.title}
                    </h2>
                    {item.unread ? (
                      <span className="mt-1 size-2 shrink-0 rounded-full bg-[#ef4444]" />
                    ) : null}
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                    {item.message}
                  </p>
                  <p className="mt-2 text-[11px] text-on-surface-variant/80">
                    {item.time}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-[12px] text-on-surface-variant">
          Lihat semua pembaruan di{" "}
          <Link href="/berita" className="font-semibold text-primary">
            halaman Berita
          </Link>
        </p>
      </main>
    </div>
  );
}
