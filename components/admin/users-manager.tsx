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
import { adminApi, type AdminUser } from "@/lib/admin/api";

type UserForm = {
  email: string;
  name: string;
  password: string;
  role: "SUPERADMIN" | "ADMIN";
  isActive: boolean;
};

const emptyForm: UserForm = {
  email: "",
  name: "",
  password: "",
  role: "ADMIN",
  isActive: true,
};

export function UsersManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await adminApi.get<AdminUser[]>("/api/admin/users");
      setUsers(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memuat pengguna");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(user: AdminUser) {
    setEditingId(user.id);
    setForm({
      email: user.email,
      name: user.name,
      password: "",
      role: user.role,
      isActive: user.isActive,
    });
    setOpen(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        const payload: Record<string, unknown> = {
          email: form.email,
          name: form.name,
          role: form.role,
          isActive: form.isActive,
        };
        if (form.password) {
          payload.password = form.password;
        }
        await adminApi.patch(`/api/admin/users/${editingId}`, payload);
        toast.success("Pengguna diperbarui");
      } else {
        await adminApi.post("/api/admin/users", form);
        toast.success("Pengguna ditambahkan");
      }

      setOpen(false);
      await loadUsers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus pengguna ini?")) return;

    try {
      await adminApi.delete(`/api/admin/users/${id}`);
      toast.success("Pengguna dihapus");
      await loadUsers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menghapus");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Pengguna</h1>
          <p className="text-sm text-muted-foreground">
            Kelola akun admin dan superadmin.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Tambah Pengguna
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
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
                    <th className="pb-3 pr-4 font-medium">Email</th>
                    <th className="pb-3 pr-4 font-medium">Role</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">{user.name}</td>
                      <td className="py-3 pr-4">{user.email}</td>
                      <td className="py-3 pr-4">{user.role}</td>
                      <td className="py-3 pr-4">
                        {user.isActive ? "Aktif" : "Nonaktif"}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => openEdit(user)}
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Pengguna" : "Tambah Pengguna"}
            </DialogTitle>
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
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  value={form.role}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      role: event.target.value as UserForm["role"],
                    })
                  }
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPERADMIN">Superadmin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Password {editingId ? "(kosongkan jika tidak diubah)" : ""}
                </label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                  required={!editingId}
                  minLength={8}
                />
              </div>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
