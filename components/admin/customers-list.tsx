"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AdminListToolbar,
  getRowNumber,
  useAdminListState,
} from "@/lib/admin/list-utils";
import { adminApi, type AdminCustomer } from "@/lib/admin/api";

export function CustomersList() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  const getSearchText = useCallback(
    (customer: AdminCustomer) =>
      [customer.name, customer.email, customer.phone]
        .filter(Boolean)
        .join(" "),
    [],
  );

  const {
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    paginated,
    filtered,
    pageSize,
  } = useAdminListState(customers, getSearchText);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminApi.get<AdminCustomer[]>("/api/admin/customers");
        setCustomers(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat pelanggan");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Pelanggan (User PWA)</h1>
        <p className="text-sm text-muted-foreground">
          Daftar akun pelanggan yang terdaftar di website.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <>
              <AdminListToolbar
                search={search}
                onSearchChange={setSearch}
                placeholder="Cari pelanggan..."
                page={page}
                totalPages={totalPages}
                totalItems={filtered.length}
                pageSize={pageSize}
                onPageChange={setPage}
              />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium w-10">No</th>
                      <th className="pb-3 pr-4 font-medium">Nama</th>
                      <th className="pb-3 pr-4 font-medium">Email</th>
                      <th className="pb-3 pr-4 font-medium">Telepon</th>
                      <th className="pb-3 pr-4 font-medium">Favorit</th>
                      <th className="pb-3 pr-4 font-medium">RFQ</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((customer, index) => (
                      <tr key={customer.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 text-muted-foreground">
                          {getRowNumber(page, index, pageSize)}
                        </td>
                        <td className="py-3 pr-4 font-medium">{customer.name}</td>
                        <td className="py-3 pr-4">{customer.email}</td>
                        <td className="py-3 pr-4">{customer.phone ?? "—"}</td>
                        <td className="py-3 pr-4">{customer._count.favorites}</td>
                        <td className="py-3 pr-4">{customer._count.rfqs}</td>
                        <td className="py-3">
                          {customer.isActive ? "Aktif" : "Nonaktif"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!paginated.length ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Pelanggan tidak ditemukan.
                  </p>
                ) : null}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
