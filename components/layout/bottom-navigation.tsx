"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, Newspaper, User } from "lucide-react";

import { cn } from "@/lib/utils";

const leftNavigationItems = [
  { label: "Produk", href: "/produk", icon: LayoutGrid },
  { label: "Berita", href: "/berita", icon: Newspaper },
];

const rightNavigationItems = [
  { label: "Favorit", href: "/simpanan", icon: Heart },
  { label: "Akun", href: "/akun", icon: User },
];

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/produk") {
    return pathname === "/produk" || pathname.startsWith("/produk/");
  }
  if (href === "/berita") {
    return pathname === "/berita" || pathname.startsWith("/berita/");
  }
  if (href === "/simpanan") {
    return pathname === "/simpanan" || pathname.startsWith("/simpanan/");
  }
  return pathname.startsWith(href);
}

function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "bottom-navigation-item relative min-w-[56px] text-[11px]",
        isActive && "bottom-navigation-item-active",
      )}
    >
      <Icon
        strokeWidth={isActive ? 2.4 : 1.9}
        className="size-5"
        fill={
          isActive &&
          (href === "/simpanan" || href === "/akun" || href === "/berita")
            ? "currentColor"
            : "none"
        }
      />
      <span>{label}</span>
      {isActive ? (
        <span className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
      ) : null}
    </Link>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";

  return (
    <nav className="bottom-navigation" aria-label="Navigasi utama">
      <svg
        className="bottom-navigation-shape"
        viewBox="0 0 400 88"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,88 L0,18 Q0,8 10,8 L148,8 Q168,8 178,30 Q188,52 200,52 Q212,52 222,30 Q232,8 252,8 L390,8 Q400,8 400,18 L400,88 Z"
          fill="currentColor"
        />
      </svg>

      <div className="bottom-navigation-content">
        <div className="bottom-navigation-side">
          {leftNavigationItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={isNavActive(pathname, item.href)}
            />
          ))}
        </div>

        <div className="bottom-navigation-side">
          {rightNavigationItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={isNavActive(pathname, item.href)}
            />
          ))}
        </div>
      </div>

      <Link
        href="/"
        aria-label="Beranda"
        aria-current={isHomeActive ? "page" : undefined}
        className={cn(
          "bottom-navigation-fab",
          isHomeActive && "bottom-navigation-fab-active",
        )}
      >
        <Home
          className="size-7 text-white"
          strokeWidth={2.2}
          fill={isHomeActive ? "currentColor" : "none"}
        />
      </Link>
    </nav>
  );
}
