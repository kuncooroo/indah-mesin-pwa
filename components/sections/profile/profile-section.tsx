"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CircleHelp,
  LogOut,
  ShieldCheck,
  Settings,
  SquarePen,
  User,
} from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { profileMenuItems, profileUser } from "@/lib/data/profile";
import type { ProfileMenuItem } from "@/lib/data/profile";
import { getProfileData } from "@/lib/profile-store";

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
  const [user, setUser] = useState(profileUser);

  useEffect(() => {
    setUser(getProfileData());
  }, []);

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
          <p className="mt-1.5 text-[14px] text-on-surface-variant">ID: {user.id}</p>
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
