"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { BackLink } from "@/components/shared/back-link";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export function NotificationsList() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await fetch("/api/notifications", {
          credentials: "include",
        });

        if (response.status === 401) {
          setUnauthorized(true);
          return;
        }

        const payload = (await response.json()) as {
          data?: NotificationItem[];
        };

        setNotifications(payload.data ?? []);
      } finally {
        setLoading(false);
      }
    }

    void loadNotifications();
  }, []);

  async function markRead(id: string) {
    await fetch(`/api/notifications/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });

    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isRead: true } : item,
      ),
    );
  }

  if (loading) {
    return (
      <p className="py-12 text-center text-sm text-on-surface-variant">
        Memuat notifikasi...
      </p>
    );
  }

  if (unauthorized) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-on-surface-variant">
          Masuk untuk melihat notifikasi Anda.
        </p>
        <Link
          href="/akun/login"
          className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white"
        >
          Masuk
        </Link>
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <p className="py-12 text-center text-sm text-on-surface-variant">
        Belum ada notifikasi.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm"
          onClick={() => {
            if (!item.isRead) void markRead(item.id);
          }}
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
                {!item.isRead ? (
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[#ef4444]" />
                ) : null}
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                {item.message}
              </p>
              <p className="mt-2 text-[11px] text-on-surface-variant/80">
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                  locale: localeId,
                })}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
