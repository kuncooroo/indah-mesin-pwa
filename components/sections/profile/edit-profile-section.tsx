"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Camera, User } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { profileUser } from "@/lib/data/profile";
import { getProfileData, saveProfileData, type Gender } from "@/lib/profile-store";
import { cn } from "@/lib/utils";

export function EditProfileSection() {
  const router = useRouter();
  const [form, setForm] = useState(profileUser);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getProfileData());
  }, []);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveProfileData(form);
    setSaved(true);
    window.setTimeout(() => router.push("/akun"), 800);
  }

  return (
    <div className="pb-10">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 px-4 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BackLink href="/akun" />
          <h1 className="text-[18px] font-bold text-primary">Edit Profil</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-6">
        <section className="mb-6 flex flex-col items-center">
          <div className="relative">
            <div className="flex size-[110px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#94a3b8] to-[#64748b] ring-[5px] ring-[#eff6ff]">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt={form.name}
                  className="size-full object-cover"
                />
              ) : (
                <User className="size-14 text-white/90" strokeWidth={1.8} />
              )}
            </div>
            <button
              type="button"
              aria-label="Ubah foto profil"
              className="absolute right-1 bottom-1 flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-md"
            >
              <Camera className="size-4" strokeWidth={2.2} />
            </button>
          </div>

          <div className="mt-4 w-full rounded-2xl bg-surface-container px-4 py-3 text-center">
            <p className="text-[16px] font-bold text-primary">{form.name}</p>
            <p className="mt-0.5 text-[12px] text-on-surface-variant">ID: {form.id}</p>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold text-on-surface">
              Nama Lengkap
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border-subtle bg-[#f8fafc] px-4 text-[13px] text-primary outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold text-on-surface">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border-subtle bg-[#f8fafc] px-4 text-[13px] text-primary outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold text-on-surface">
              Nomor HP
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="h-12 w-full rounded-2xl border border-border-subtle bg-[#f8fafc] px-4 text-[13px] text-primary outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold text-on-surface">
              Tanggal Lahir
            </span>
            <input
              type="text"
              value={form.dateOfBirth}
              onChange={(event) => updateField("dateOfBirth", event.target.value)}
              placeholder="DD / MM / YYYY"
              className="h-12 w-full rounded-2xl border border-border-subtle bg-[#f8fafc] px-4 text-[13px] text-primary outline-none"
            />
          </label>

          <div>
            <span className="mb-2 block text-[12px] font-semibold text-on-surface">
              Jenis Kelamin
            </span>
            <div className="grid grid-cols-2 gap-3">
              {([
                { value: "male", label: "Laki-laki" },
                { value: "female", label: "Perempuan" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("gender", option.value as Gender)}
                  className={cn(
                    "flex h-12 items-center justify-center gap-2 rounded-2xl border text-[13px] font-semibold transition-colors",
                    form.gender === option.value
                      ? "border-primary bg-[#eff6ff] text-primary"
                      : "border-border-subtle bg-[#f8fafc] text-on-surface-variant",
                  )}
                >
                  <span
                    className={cn(
                      "size-4 rounded-full border-2",
                      form.gender === option.value
                        ? "border-primary bg-primary"
                        : "border-border-subtle bg-white",
                    )}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {saved ? (
            <p className="text-center text-[12px] font-medium text-[#16a34a]">
              Profil berhasil diperbarui.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-primary-container"
          >
            Perbarui Profil
          </button>
        </form>
      </main>
    </div>
  );
}
