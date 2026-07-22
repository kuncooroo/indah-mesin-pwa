"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CircleHelp,
  ClipboardList,
  Heart,
  LogOut,
  ShieldCheck,
  Settings,
  SquarePen,
  User,
} from "lucide-react";
import { BackLink } from "@/components/shared/back-link";
import { profileMenuItems } from "@/lib/data/profile";
import type { ProfileMenuItem } from "@/lib/data/profile";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

function MenuIcon({ icon }: { icon: ProfileMenuItem["icon"] }) {
  const className = "size-5";

  switch (icon) {
    case "shield":
      return <ShieldCheck className={className} strokeWidth={2} />;
    case "settings":
      return <Settings className={className} strokeWidth={2} />;
    case "help":
      return <CircleHelp className={className} strokeWidth={2} />;
    case "logout":
      return <LogOut className={className} strokeWidth={2} />;
  }
}

export function ProfileSection() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/auth/me", { credentials: "include" });

        if (response.ok) {
          const payload = (await response.json()) as {
            data?: { user: SessionUser };
          };
          if (payload.data?.user.role === "CUSTOMER") {
            setUser(payload.data.user);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    void loadSession();
  }, []);

  async function handleLogout() {
    if (!confirm("Apakah Anda yakin ingin keluar?")) return;

    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "/akun/login";
  }

  if (loading) {
    return (
      <div className="pb-8 pt-24 text-center text-sm text-on-surface-variant">
        Memuat profil...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pb-8">
        <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <BackLink />
            <h1 className="text-[18px] font-bold text-primary">Profil Saya</h1>
            <span className="size-10" aria-hidden="true" />
          </div>
        </header>

        <main className="flex flex-col items-center px-4 pt-16 text-center">
          <div className="flex size-[120px] items-center justify-center rounded-full bg-gradient-to-br from-[#94a3b8] to-[#64748b] ring-[5px] ring-[#eff6ff]">
            <User className="size-14 text-white/90" strokeWidth={1.8} />
          </div>
          <h2 className="mt-5 text-[22px] font-bold text-primary">
            Masuk ke IndustrialX
          </h2>
          <p className="mt-2 max-w-xs text-[14px] text-on-surface-variant">
            Kelola RFQ, favorit, dan notifikasi dengan akun Anda.
          </p>
          <div className="mt-6 flex w-full max-w-xs flex-col gap-3">
            <Link
              href="/akun/login"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white"
            >
              Masuk
            </Link>
            <Link
              href="/akun/register"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink />
          <h1 className="text-[18px] font-bold text-primary">Profil Saya</h1>
          <Link
            href="/akun/edit"
            aria-label="Edit profil"
            className="flex size-10 items-center justify-center rounded-full bg-[#eff6ff] text-primary"
          >
            <SquarePen className="size-[18px]" strokeWidth={2} />
          </Link>
        </div>
      </header>

      <main className="px-4 pt-8">
        <section className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-[120px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#94a3b8] to-[#64748b] ring-[5px] ring-[#eff6ff]">
            <User className="size-14 text-white/90" strokeWidth={1.8} />
          </div>
          <h2 className="mt-5 text-[22px] font-bold text-primary">{user.name}</h2>
          <p className="mt-1.5 text-[14px] text-on-surface-variant">{user.email}</p>
        </section>

        <section className="mb-8 flex overflow-hidden rounded-2xl border border-[#dbeafe] bg-[#eff6ff]">
          <Link
            href="/akun/rfq"
            className="flex flex-1 flex-col items-center gap-2 py-4 transition-colors hover:bg-[#dbeafe]/50"
          >
            <ClipboardList className="size-6 text-primary" strokeWidth={1.8} />
            <span className="text-[12px] font-semibold text-primary">RFQ Saya</span>
          </Link>
          <span className="my-4 w-px bg-[#bfdbfe]" aria-hidden="true" />
          <Link
            href="/favorit"
            className="flex flex-1 flex-col items-center gap-2 py-4 transition-colors hover:bg-[#dbeafe]/50"
          >
            <Heart className="size-6 text-primary" strokeWidth={1.8} />
            <span className="text-[12px] font-semibold text-primary">Favorit</span>
          </Link>
        </section>

        <section className="space-y-1">
          {profileMenuItems.map((item) => {
            const content = (
              <>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-[#eff6ff] text-primary">
                  <MenuIcon icon={item.icon} />
                </span>
                <span className="text-[15px] font-medium text-primary">
                  {item.label}
                </span>
              </>
            );

            if (item.action === "logout") {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-4 rounded-xl px-1 py-4 text-left transition-colors hover:bg-[#f8fafc]"
                >
                  {content}
                </button>
              );
            }

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-4 rounded-xl px-1 py-4 transition-colors hover:bg-[#f8fafc]"
                >
                  {content}
                </Link>
              );
            }

            return null;
          })}
        </section>
      </main>
    </div>
  );
}
