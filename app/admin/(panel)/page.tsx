import { FolderTree, Package, Sparkles, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dashboardService } from "@/lib/services/auth.service";
import { getSessionFromCookie } from "@/lib/auth/session";
import { isSuperAdmin } from "@/lib/auth/permissions";

export default async function AdminDashboardPage() {
  const [stats, session] = await Promise.all([
    dashboardService.getStats(),
    getSessionFromCookie(),
  ]);

  const cards = [
    { label: "Total Produk", value: stats.products, icon: Package },
    { label: "Produk Unggulan", value: stats.featuredProducts, icon: Sparkles },
    { label: "Kategori", value: stats.categories, icon: FolderTree },
  ];

  if (isSuperAdmin(session)) {
    cards.push({ label: "Pengguna Admin", value: stats.users, icon: Users });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan katalog IndustrialX Marketplace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
