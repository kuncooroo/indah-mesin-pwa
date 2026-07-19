"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Home,
  LayoutGrid,
  Menu,
  MessageCircle,
  Search,
  UserCircle,
  ArrowLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";

type AppHeaderProps = {
  variant?: "default" | "back" | "minimal";
  title?: string;
  backHref?: string;
  showSearch?: boolean;
  showMenu?: boolean;
  showAccount?: boolean;
  className?: string;
};

export function AppHeader({
  variant = "default",
  title = "IndustrialX",
  backHref,
  showSearch = true,
  showMenu = true,
  showAccount = false,
  className,
}: AppHeaderProps) {
  const pathname = usePathname();
  const isContact = pathname.startsWith("/kontak");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border-subtle bg-surface px-margin-mobile md:px-margin-desktop",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {variant === "back" && backHref ? (
          <Link
            href={backHref}
            aria-label="Kembali"
            className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : showMenu ? (
          <button
            type="button"
            aria-label="Menu"
            className="rounded-full p-2 text-primary transition-opacity hover:opacity-80"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}
        <h1 className="text-headline-md font-bold text-primary">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {showSearch ? (
          <button
            type="button"
            aria-label="Cari"
            className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container"
          >
            <Search className="h-5 w-5" />
          </button>
        ) : null}
        {showAccount ? (
          <button
            type="button"
            aria-label="Akun"
            className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container"
          >
            <UserCircle className="h-5 w-5" />
          </button>
        ) : null}
        {isContact && variant === "back" ? (
          <button
            type="button"
            aria-label="Menu"
            className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}
      </div>
    </header>
  );
}

export const desktopNavLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/kategori" },
  { label: "Saved", href: "/simpanan" },
  { label: "Contact", href: "/kontak" },
];

export function DesktopNav({ activePath }: { activePath: string }) {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {desktopNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-body-sm transition-colors",
            activePath === link.href || activePath.startsWith(`${link.href}/`)
              ? "font-bold text-primary"
              : "text-on-surface-variant hover:text-primary",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export const bottomNavIcons = {
  home: Home,
  categories: LayoutGrid,
  saved: Bookmark,
  contact: MessageCircle,
};
