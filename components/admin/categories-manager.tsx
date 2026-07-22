"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
import { adminApi, type AdminCategory } from "@/lib/admin/api";

type CategoryForm = {
  slug: string;
  label: string;
  icon: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

const emptyForm: CategoryForm = {
  slug: "",
  label: "",
  icon: "",
  description: "",
  sortOrder: 0,
  isActive: true,
};

export function CategoriesManager() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const getSearchText = useCallback(
    (category: AdminCategory) =>
      [category.label, category.slug, category.icon, category.description]
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
  } = useAdminListState(categories, getSearchText);

  async function loadCategories() {
    setLoading(true);
    try {
      const data = await adminApi.get<AdminCategory[]>("/api/admin/categories");
      setCategories(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memuat kategori");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCategories();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(category: AdminCategory) {
    setEditingId(category.id);
    setForm({
      slug: category.slug,
      label: category.label,
      icon: category.icon ?? "",
      description: category.description ?? "",
      sortOrder: category.sortOrder,
      isActive: category.isActive,
    });
    setOpen(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      icon: form.icon || undefined,
      description: form.description || undefined,
    };

    try {
      if (editingId) {
        await adminApi.patch(`/api/admin/categories/${editingId}`, payload);
        toast.success("Kategori diperbarui");
      } else {
        await adminApi.post("/api/admin/categories", payload);
        toast.success("Kategori ditambahkan");
      }

      setOpen(false);
      await loadCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus kategori ini?")) return;

    try {
      await adminApi.delete(`/api/admin/categories/${id}`);
      toast.success("Kategori dihapus");
      await loadCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menghapus");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Kategori</h1>
          <p className="text-sm text-muted-foreground">
            Kelola kategori produk marketplace.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Tambah Kategori
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <>
              <AdminListToolbar
                search={search}
                onSearchChange={setSearch}
                placeholder="Cari kategori..."
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
                    <th className="pb-3 pr-4 font-medium">Label</th>
                    <th className="pb-3 pr-4 font-medium">Slug</th>
                    <th className="pb-3 pr-4 font-medium">Produk</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((category, index) => (
                    <tr key={category.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 text-muted-foreground">
                        {getRowNumber(page, index, pageSize)}
                      </td>
                      <td className="py-3 pr-4 font-medium">{category.label}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{category.slug}</td>
                      <td className="py-3 pr-4">{category._count?.products ?? 0}</td>
                      <td className="py-3 pr-4">
                        {category.isActive ? "Aktif" : "Nonaktif"}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => openEdit(category)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="destructive"
                            onClick={() => handleDelete(category.id)}
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
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <AdminDialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Kategori" : "Tambah Kategori"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Label</label>
                <Input
                  value={form.label}
                  onChange={(event) => setForm({ ...form, label: event.target.value })}
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
                <label className="text-sm font-medium">Icon (Lucide)</label>
                <Input
                  value={form.icon}
                  onChange={(event) => setForm({ ...form, icon: event.target.value })}
                  placeholder="Package"
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
              <Input
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </div>
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
