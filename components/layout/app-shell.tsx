"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";

type AppShellProps = {
  children: ReactNode;
};

function shouldHideWhatsAppFab(pathname: string): boolean {
  return pathname.startsWith("/produk/") && pathname !== "/produk";
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const showWhatsAppFab = !shouldHideWhatsAppFab(pathname);

  return (
    <div className="app-background">
      <div className="mobile-app-shell">
        <div className="bg-surface pb-[76px]">{children}</div>
        <BottomNavigation />
        <WhatsAppFab hidden={!showWhatsAppFab} />
      </div>
    </div>
  );
}