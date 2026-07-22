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
import { adminApi, type AdminFaq } from "@/lib/admin/api";

type FaqForm = {
  category: AdminFaq["category"];
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
};

const emptyForm: FaqForm = {
  category: "UMUM",
  question: "",
  answer: "",
  sortOrder: 0,
  isActive: true,
};

const categoryOptions = [
  { value: "UMUM", label: "Umum" },
  { value: "AKUN", label: "Akun" },
  { value: "LAYANAN", label: "Layanan" },
  { value: "PEMESANAN", label: "Pemesanan" },
] as const;

export function FaqsManager() {
  const [faqs, setFaqs] = useState<AdminFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FaqForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const getSearchText = useCallback(
    (faq: AdminFaq) => [faq.question, faq.answer, faq.category].join(" "),
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
  } = useAdminListState(faqs, getSearchText);

  async function loadFaqs() {
    setLoading(true);
    try {
      const data = await adminApi.get<AdminFaq[]>("/api/admin/faqs");
      setFaqs(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memuat FAQ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFaqs();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(faq: AdminFaq) {
    setEditingId(faq.id);
    setForm({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sortOrder,
      isActive: faq.isActive,
    });
    setOpen(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await adminApi.patch(`/api/admin/faqs/${editingId}`, form);
        toast.success("FAQ diperbarui");
      } else {
        await adminApi.post("/api/admin/faqs", form);
        toast.success("FAQ ditambahkan");
      }

      setOpen(false);
      await loadFaqs();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan FAQ");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus FAQ ini?")) return;

    try {
      await adminApi.delete(`/api/admin/faqs/${id}`);
      toast.success("FAQ dihapus");
      await loadFaqs();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menghapus FAQ");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">FAQ</h1>
          <p className="text-sm text-muted-foreground">
            Kelola pertanyaan yang sering diajukan.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Tambah FAQ
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar FAQ ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <>
              <AdminListToolbar
                search={search}
                onSearchChange={setSearch}
                placeholder="Cari FAQ..."
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
                      <th className="pb-3 pr-4 font-medium">Pertanyaan</th>
                      <th className="pb-3 pr-4 font-medium">Kategori</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((faq, index) => (
                      <tr key={faq.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 text-muted-foreground">
                          {getRowNumber(page, index, pageSize)}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="font-medium">{faq.question}</div>
                          <div className="line-clamp-1 text-xs text-muted-foreground">
                            {faq.answer}
                          </div>
                        </td>
                        <td className="py-3 pr-4">{faq.category}</td>
                        <td className="py-3 pr-4">
                          {faq.isActive ? "Aktif" : "Nonaktif"}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button
                              size="icon-sm"
                              variant="outline"
                              onClick={() => openEdit(faq)}
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              onClick={() => void handleDelete(faq.id)}
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
                    FAQ tidak ditemukan.
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
            <DialogTitle>{editingId ? "Edit FAQ" : "Tambah FAQ"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as FaqForm["category"] })
              }
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Input
              placeholder="Pertanyaan"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              required
            />
            <textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              placeholder="Jawaban"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Urutan"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({ ...form, sortOrder: Number.parseInt(e.target.value, 10) || 0 })
              }
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
