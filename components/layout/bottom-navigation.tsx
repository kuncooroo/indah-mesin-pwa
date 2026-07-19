"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Home, LayoutGrid, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/kategori", icon: LayoutGrid },
  { label: "Saved", href: "/simpanan", icon: Bookmark },
  { label: "Contact", href: "/kontak", icon: MessageCircle },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bottom-navigation" aria-label="Navigasi utama">
      <div className="grid grid-cols-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "bottom-navigation-item",
                isActive && "bottom-navigation-item-active",
              )}
            >
              <Icon
                strokeWidth={isActive ? 2.4 : 1.9}
                className="h-[22px] w-[22px]"
                fill={isActive ? "currentColor" : "none"}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
