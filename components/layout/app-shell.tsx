"use client";

import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/bottom-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-background">
      <div className="mobile-app-shell">
        <div className="bg-white pb-[76px]">{children}</div>
        <BottomNavigation />
      </div>
    </div>
  );
}