"use client";

import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { SessionPayload } from "@/lib/auth/types";

type AdminShellProps = {
  session: SessionPayload;
  children: ReactNode;
};

export function AdminShell({ session, children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar session={session} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
