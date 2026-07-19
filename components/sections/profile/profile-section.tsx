"use client";

import Link from "next/link";
import {
  Bell,
  CircleHelp,
  ClipboardList,
  CreditCard,
  Heart,
  LogOut,
  ShieldCheck,
  Settings,
  SquarePen,
  User,
} from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import {
  profileMenuItems,
  profileQuickActions,
  profileUser,
} from "@/lib/data/profile";
import type { ProfileMenuItem } from "@/lib/data/profile";

function MenuIcon({ icon }: { icon: ProfileMenuItem["icon"] }) {
  const className = "size-5";

  switch (icon) {
    case "shield":
      return <ShieldCheck className={className} strokeWidth={2} />;
    case "credit-card":
      return <CreditCard className={className} strokeWidth={2} />;
    case "bell":
      return <Bell className={className} strokeWidth={2} />;
    case "settings":
      return <Settings className={className} strokeWidth={2} />;
    case "help":
      return <CircleHelp className={className} strokeWidth={2} />;
    case "logout":
      return <LogOut className={className} strokeWidth={2} />;
  }
}

function QuickActionIcon({ icon }: { icon: "user" | "heart" | "orders" }) {
  const className = "size-6";

  if (icon === "heart") return <Heart className={className} strokeWidth={2} />;
  if (icon === "orders") {
    return <ClipboardList className={className} strokeWidth={2} />;
  }
  return <User className={className} strokeWidth={2} />;
}

export function ProfileSection() {
  function handleMenuClick(item: ProfileMenuItem) {
    if (item.action === "logout") {
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        window.location.href = "/";
      }
    }
  }

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink />
          <h1 className="text-[18px] font-bold text-primary">Profil Saya</h1>
          <button
            type="button"
            aria-label="Edit profil"
            className="flex size-10 items-center justify-center rounded-full bg-[#eff6ff] text-primary"
          >
            <SquarePen className="size-[18px]" strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="px-4 pt-8">
        <section className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-[120px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#94a3b8] to-[#64748b] ring-[5px] ring-[#eff6ff]">
            <User className="size-14 text-white/90" strokeWidth={1.8} />
          </div>
          <h2 className="mt-5 text-[22px] font-bold text-primary">
            {profileUser.name}
          </h2>
          <p className="mt-1.5 text-[14px] text-on-surface-variant">
            ID: {profileUser.id}
          </p>
        </section>

        <section className="mb-8 overflow-hidden rounded-2xl bg-[#eef4ff]">
          <div className="grid grid-cols-3 divide-x divide-[#dbeafe]">
            {profileQuickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="flex flex-col items-center gap-2.5 py-5 text-primary transition-colors hover:bg-[#dbeafe]/40"
              >
                <QuickActionIcon icon={action.icon} />
                <span className="text-[13px] font-semibold">{action.label}</span>
              </Link>
            ))}
          </div>
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

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMenuClick(item)}
                className="flex w-full items-center gap-4 rounded-xl px-1 py-4 text-left transition-colors hover:bg-[#f8fafc]"
              >
                {content}
              </button>
            );
          })}
        </section>
      </main>
    </div>
  );
}
