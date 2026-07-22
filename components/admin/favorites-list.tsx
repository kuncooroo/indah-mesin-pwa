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
import { adminApi, type AdminFavorite } from "@/lib/admin/api";

export function FavoritesList() {
  const [favorites, setFavorites] = useState<AdminFavorite[]>([]);
  const [loading, setLoading] = useState(true);

  const getSearchText = useCallback(
    (favorite: AdminFavorite) =>
      [favorite.customer.name, favorite.customer.email, favorite.product.name]
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
  } = useAdminListState(favorites, getSearchText);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminApi.get<AdminFavorite[]>("/api/admin/favorites");
        setFavorites(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat favorit");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Favorit</h1>
        <p className="text-sm text-muted-foreground">
          Produk yang disimpan pelanggan ke daftar favorit.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Favorit ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <>
              <AdminListToolbar
                search={search}
                onSearchChange={setSearch}
                placeholder="Cari pelanggan atau produk..."
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
                      <th className="pb-3 pr-4 font-medium">Produk</th>
                      <th className="pb-3 pr-4 font-medium">Pelanggan</th>
                      <th className="pb-3 pr-4 font-medium">Email</th>
                      <th className="pb-3 font-medium">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((favorite, index) => (
                      <tr key={favorite.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 text-muted-foreground">
                          {getRowNumber(page, index, pageSize)}
                        </td>
                        <td className="py-3 pr-4 font-medium">
                          {favorite.product.name}
                        </td>
                        <td className="py-3 pr-4">{favorite.customer.name}</td>
                        <td className="py-3 pr-4">{favorite.customer.email}</td>
                        <td className="py-3">
                          {new Date(favorite.createdAt).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!paginated.length ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Favorit tidak ditemukan.
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
