import Link from "next/link";
import {
  FileText,
  FolderTree,
  Heart,
  HelpCircle,
  MessageSquare,
  Newspaper,
  Package,
  UserCircle,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dashboardService } from "@/lib/services/auth.service";
import { getSessionFromCookie } from "@/lib/auth/session";
import { isSuperAdmin } from "@/lib/auth/permissions";

type DashboardRow = {
  no: number;
  label: string;
  value: number;
  href: string;
  icon: typeof Package;
};

export default async function AdminDashboardPage() {
  const [stats, session] = await Promise.all([
    dashboardService.getStats(),
    getSessionFromCookie(),
  ]);

  const rows: DashboardRow[] = [
    { no: 1, label: "Produk", value: stats.products, href: "/admin/products", icon: Package },
    { no: 2, label: "Kategori", value: stats.categories, href: "/admin/categories", icon: FolderTree },
    { no: 3, label: "Artikel", value: stats.articles, href: "/admin/articles", icon: Newspaper },
    { no: 4, label: "Ulasan", value: stats.reviews, href: "/admin/reviews", icon: MessageSquare },
    { no: 5, label: "FAQ", value: stats.faqs, href: "/admin/faqs", icon: HelpCircle },
    { no: 6, label: "RFQ", value: stats.rfqs, href: "/admin/rfqs", icon: FileText },
    { no: 7, label: "Favorit", value: stats.favorites, href: "/admin/favorites", icon: Heart },
    { no: 8, label: "Pelanggan", value: stats.customers, href: "/admin/customers", icon: UserCircle },
  ];

  if (isSuperAdmin(session)) {
    rows.push({
      no: 9,
      label: "Admin",
      value: stats.users,
      href: "/admin/users",
      icon: Users,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan modul IndustrialX Marketplace.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Modul</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium w-12">No</th>
                  <th className="pb-3 pr-4 font-medium">Modul</th>
                  <th className="pb-3 pr-4 font-medium">Total Data</th>
                  <th className="pb-3 font-medium">Kelola</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.href} className="border-b last:border-0">
                    <td className="py-3 pr-4 text-muted-foreground">{row.no}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2 font-medium">
                        <row.icon className="size-4 text-primary" />
                        {row.label}
                      </div>
                    </td>
                    <td className="py-3 pr-4">{row.value}</td>
                    <td className="py-3">
                      <Link
                        href={row.href}
                        className="font-medium text-primary hover:underline"
                      >
                        Buka halaman
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
