"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

type ConditionalShellProps = {
  children: ReactNode;
};

export function ConditionalShell({ children }: ConditionalShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
