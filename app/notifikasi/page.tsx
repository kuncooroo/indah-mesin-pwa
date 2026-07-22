import Link from "next/link";

import { BackLink } from "@/components/shared/back-link";
import { NotificationsList } from "@/components/sections/notifications/notifications-list";

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
        <NotificationsList />

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
