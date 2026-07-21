import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Package,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SessionPayload } from "@/lib/auth/types";

type AdminSidebarProps = {
  session: SessionPayload;
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Produk", icon: Package },
  { href: "/admin/categories", label: "Kategori", icon: FolderTree },
  { href: "/admin/rfqs", label: "RFQ", icon: FileText },
  { href: "/admin/users", label: "Pengguna", icon: Users, superadminOnly: true },
];

export function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-6 py-5">
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          IndustrialX
        </p>
        <h1 className="font-heading text-lg font-semibold text-primary">
          Admin Panel
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          if (item.superadminOnly && session.role !== "SUPERADMIN") {
            return null;
          }

          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-3 px-1">
          <p className="text-sm font-medium">{session.name}</p>
          <p className="text-xs text-muted-foreground">{session.email}</p>
          <p className="mt-1 inline-flex rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
            {session.role}
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Keluar
        </Button>
      </div>
    </aside>
  );
}
