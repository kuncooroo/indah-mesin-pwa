"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { adminApi, type AdminCategory, type AdminProduct } from "@/lib/admin/api";

type ProductForm = {
  slug: string;
  sku: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  status: "READY" | "INDENT";
  statusLabel: string;
  priceLabel: string;
  priceNote: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
};

const emptyForm: ProductForm = {
  slug: "",
  sku: "",
  name: "",
  description: "",
  image: "",
  categoryId: "",
  status: "READY",
  statusLabel: "Ready Stock",
  priceLabel: "",
  priceNote: "",
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
};

export function ProductsManager() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const [productData, categoryData] = await Promise.all([
        adminApi.get<AdminProduct[]>("/api/admin/products"),
        adminApi.get<AdminCategory[]>("/api/admin/categories"),
      ]);
      setProducts(productData);
      setCategories(categoryData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? "",
    });
    setOpen(true);
  }

  function openEdit(product: AdminProduct) {
    setEditingId(product.id);
    setForm({
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      description: product.description,
      image: product.image,
      categoryId: product.categoryId,
      status: product.status,
      statusLabel: product.statusLabel,
      priceLabel: product.priceLabel,
      priceNote: product.priceNote ?? "",
      isFeatured: product.isFeatured,
      isActive: product.isActive,
      sortOrder: product.sortOrder,
    });
    setOpen(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      priceNote: form.priceNote || undefined,
    };

    try {
      if (editingId) {
        await adminApi.patch(`/api/admin/products/${editingId}`, payload);
        toast.success("Produk diperbarui");
      } else {
        await adminApi.post("/api/admin/products", payload);
        toast.success("Produk ditambahkan");
      }

      setOpen(false);
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;

    try {
      await adminApi.delete(`/api/admin/products/${id}`);
      toast.success("Produk dihapus");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menghapus");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Produk</h1>
          <p className="text-sm text-muted-foreground">
            Kelola katalog mesin industri.
          </p>
        </div>
        <Button onClick={openCreate} disabled={categories.length === 0}>
          <Plus className="size-4" />
          Tambah Produk
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Nama</th>
                    <th className="pb-3 pr-4 font-medium">SKU</th>
                    <th className="pb-3 pr-4 font-medium">Kategori</th>
                    <th className="pb-3 pr-4 font-medium">Harga</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.slug}</div>
                      </td>
                      <td className="py-3 pr-4">{product.sku}</td>
                      <td className="py-3 pr-4">{product.category?.label ?? "-"}</td>
                      <td className="py-3 pr-4">{product.priceLabel}</td>
                      <td className="py-3 pr-4">
                        {product.isActive ? product.statusLabel : "Nonaktif"}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => openEdit(product)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama</label>
                <Input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(event) => setForm({ ...form, slug: event.target.value })}
                  required
                  disabled={Boolean(editingId)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SKU</label>
                <Input
                  value={form.sku}
                  onChange={(event) => setForm({ ...form, sku: event.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori</label>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  value={form.categoryId}
                  onChange={(event) =>
                    setForm({ ...form, categoryId: event.target.value })
                  }
                  required
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status Stok</label>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as ProductForm["status"],
                    })
                  }
                >
                  <option value="READY">Ready Stock</option>
                  <option value="INDENT">Indent</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Label Status</label>
                <Input
                  value={form.statusLabel}
                  onChange={(event) =>
                    setForm({ ...form, statusLabel: event.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Harga</label>
                <Input
                  value={form.priceLabel}
                  onChange={(event) =>
                    setForm({ ...form, priceLabel: event.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Urutan</label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(event) =>
                    setForm({ ...form, sortOrder: Number(event.target.value) })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea
                className="min-h-24 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">URL Gambar</label>
              <Input
                value={form.image}
                onChange={(event) => setForm({ ...form, image: event.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Catatan Harga</label>
              <Input
                value={form.priceNote}
                onChange={(event) => setForm({ ...form, priceNote: event.target.value })}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(event) =>
                    setForm({ ...form, isFeatured: event.target.checked })
                  }
                />
                Produk unggulan
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm({ ...form, isActive: event.target.checked })
                  }
                />
                Aktif
              </label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
