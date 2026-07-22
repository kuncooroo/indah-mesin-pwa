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
import { adminApi, type AdminArticle } from "@/lib/admin/api";

type ArticleForm = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: AdminArticle["category"];
  categoryLabel: string;
  image: string;
  featured: boolean;
  isActive: boolean;
  publishedAt: string;
};

const emptyForm: ArticleForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "ARTIKEL",
  categoryLabel: "Artikel",
  image: "",
  featured: false,
  isActive: true,
  publishedAt: new Date().toISOString().slice(0, 10),
};

const categoryOptions = [
  { value: "ARTIKEL", label: "Artikel" },
  { value: "TIPS_MESIN", label: "Tips Mesin" },
  { value: "TEKNOLOGI", label: "Teknologi" },
  { value: "EVENT", label: "Event" },
] as const;

export function ArticlesManager() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const getSearchText = useCallback(
    (article: AdminArticle) =>
      [article.title, article.slug, article.categoryLabel, article.excerpt]
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
  } = useAdminListState(articles, getSearchText);

  async function loadArticles() {
    setLoading(true);
    try {
      const data = await adminApi.get<AdminArticle[]>("/api/admin/articles");
      setArticles(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadArticles();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(article: AdminArticle) {
    setEditingId(article.id);
    setForm({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      categoryLabel: article.categoryLabel,
      image: article.image,
      featured: article.featured,
      isActive: article.isActive,
      publishedAt: article.publishedAt.slice(0, 10),
    });
    setOpen(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        publishedAt: new Date(form.publishedAt).toISOString(),
      };

      if (editingId) {
        await adminApi.patch(`/api/admin/articles/${editingId}`, payload);
        toast.success("Artikel diperbarui");
      } else {
        await adminApi.post("/api/admin/articles", payload);
        toast.success("Artikel ditambahkan");
      }

      setOpen(false);
      await loadArticles();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan artikel");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus artikel ini?")) return;

    try {
      await adminApi.delete(`/api/admin/articles/${id}`);
      toast.success("Artikel dihapus");
      await loadArticles();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menghapus artikel");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Artikel / Berita</h1>
          <p className="text-sm text-muted-foreground">
            Kelola konten artikel dan berita website.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Tambah Artikel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Artikel ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <>
              <AdminListToolbar
                search={search}
                onSearchChange={setSearch}
                placeholder="Cari artikel..."
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
                      <th className="pb-3 pr-4 font-medium">Judul</th>
                      <th className="pb-3 pr-4 font-medium">Kategori</th>
                      <th className="pb-3 pr-4 font-medium">Slug</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((article, index) => (
                      <tr key={article.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 text-muted-foreground">
                          {getRowNumber(page, index, pageSize)}
                        </td>
                        <td className="py-3 pr-4 font-medium">{article.title}</td>
                        <td className="py-3 pr-4">{article.categoryLabel}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{article.slug}</td>
                        <td className="py-3 pr-4">
                          {!article.isActive
                            ? "Nonaktif"
                            : article.featured
                              ? "Unggulan"
                              : "Aktif"}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button
                              size="icon-sm"
                              variant="outline"
                              onClick={() => openEdit(article)}
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              onClick={() => void handleDelete(article.id)}
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
                    Artikel tidak ditemukan.
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
            <DialogTitle>{editingId ? "Edit Artikel" : "Tambah Artikel"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Slug (contoh: tips-retort)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />
            <Input
              placeholder="Judul"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Input
              placeholder="Ringkasan"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
            <textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              placeholder="Konten"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                className="border-input bg-background h-10 rounded-md border px-3 text-sm"
                value={form.category}
                onChange={(e) => {
                  const category = e.target.value as ArticleForm["category"];
                  const label =
                    categoryOptions.find((o) => o.value === category)?.label ?? "Artikel";
                  setForm({ ...form, category, categoryLabel: label });
                }}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                required
              />
            </div>
            <ImageUploadField
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              required
            />
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Unggulan
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
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
        </AdminDialogContent>
      </Dialog>
    </div>
  );
}
