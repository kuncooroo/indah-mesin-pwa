"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import {
  AdminListToolbar,
  getRowNumber,
  useAdminListState,
} from "@/lib/admin/list-utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminDialogContent } from "@/components/admin/admin-dialog-content";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { adminApi, type AdminProduct, type AdminReview } from "@/lib/admin/api";

type ReviewForm = {
  productId: string;
  authorName: string;
  company: string;
  rating: number;
  review: string;
  image: string;
  dateLabel: string;
  isActive: boolean;
  sortOrder: number;
};

const emptyForm: ReviewForm = {
  productId: "",
  authorName: "",
  company: "",
  rating: 5,
  review: "",
  image: "",
  dateLabel: "",
  isActive: true,
  sortOrder: 0,
};

export function ReviewsManager() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ReviewForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const getSearchText = useCallback(
    (review: AdminReview) =>
      [
        review.authorName,
        review.company,
        review.review,
        review.product?.name,
      ]
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
  } = useAdminListState(reviews, getSearchText);

  async function loadData() {
    setLoading(true);
    try {
      const [reviewData, productData] = await Promise.all([
        adminApi.get<AdminReview[]>("/api/admin/reviews"),
        adminApi.get<AdminProduct[]>("/api/admin/products"),
      ]);
      setReviews(reviewData);
      setProducts(productData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memuat ulasan");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(review: AdminReview) {
    setEditingId(review.id);
    setForm({
      productId: review.productId ?? "",
      authorName: review.authorName,
      company: review.company,
      rating: review.rating,
      review: review.review,
      image: review.image ?? "",
      dateLabel: review.dateLabel ?? "",
      isActive: review.isActive,
      sortOrder: review.sortOrder,
    });
    setOpen(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      productId: form.productId || null,
      image: form.image || null,
      dateLabel: form.dateLabel || null,
    };

    try {
      if (editingId) {
        await adminApi.patch(`/api/admin/reviews/${editingId}`, payload);
        toast.success("Ulasan diperbarui");
      } else {
        await adminApi.post("/api/admin/reviews", payload);
        toast.success("Ulasan ditambahkan");
      }

      setOpen(false);
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan ulasan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus ulasan ini?")) return;

    try {
      await adminApi.delete(`/api/admin/reviews/${id}`);
      toast.success("Ulasan dihapus");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menghapus ulasan");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Ulasan Produk</h1>
          <p className="text-sm text-muted-foreground">
            Kelola testimoni dan ulasan pelanggan.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Tambah Ulasan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Ulasan ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <>
              <AdminListToolbar
                search={search}
                onSearchChange={setSearch}
                placeholder="Cari ulasan..."
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
                      <th className="pb-3 pr-4 font-medium">Penulis</th>
                      <th className="pb-3 pr-4 font-medium">Perusahaan</th>
                      <th className="pb-3 pr-4 font-medium">Produk</th>
                      <th className="pb-3 pr-4 font-medium">Rating</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((review, index) => (
                      <tr key={review.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 text-muted-foreground">
                          {getRowNumber(page, index, pageSize)}
                        </td>
                        <td className="py-3 pr-4 font-medium">{review.authorName}</td>
                        <td className="py-3 pr-4">{review.company}</td>
                        <td className="py-3 pr-4">{review.product?.name ?? "-"}</td>
                        <td className="py-3 pr-4">{review.rating}/5</td>
                        <td className="py-3 pr-4">
                          {review.isActive ? "Aktif" : "Nonaktif"}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button
                              size="icon-sm"
                              variant="outline"
                              onClick={() => openEdit(review)}
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              onClick={() => void handleDelete(review.id)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!paginated.length ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Ulasan tidak ditemukan.
                  </p>
                ) : null}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <AdminDialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Ulasan" : "Tambah Ulasan"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
            >
              <option value="">Tanpa produk spesifik</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <Input
              placeholder="Nama penulis"
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              required
            />
            <Input
              placeholder="Perusahaan"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
            />
            <Input
              type="number"
              min={1}
              max={5}
              placeholder="Rating (1-5)"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number.parseInt(e.target.value, 10) || 5 })
              }
            />
            <textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              placeholder="Ulasan"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              required
            />
            <ImageUploadField
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              label="Foto (opsional)"
            />
            <Input
              placeholder="Label tanggal (opsional, contoh: Jan 2026)"
              value={form.dateLabel}
              onChange={(e) => setForm({ ...form, dateLabel: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
              Aktif
            </label>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </AdminDialogContent>
      </Dialog>
    </div>
  );
}
