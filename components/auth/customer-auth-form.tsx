"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "register";

type CustomerAuthFormProps = {
  mode: AuthMode;
};

export function CustomerAuthForm({ mode }: CustomerAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showManualForm, setShowManualForm] = useState(mode === "register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    const messages: Record<string, string> = {
      google_not_configured: "Login Google belum dikonfigurasi.",
      google_denied: "Login Google dibatalkan.",
      google_invalid: "Sesi Google tidak valid.",
      google_failed: "Login Google gagal.",
    };

    toast.error(messages[error] ?? decodeURIComponent(error));
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        mode === "login"
          ? "/api/auth/customer/login"
          : "/api/auth/customer/register";

      const body =
        mode === "login"
          ? { email, password }
          : { name, email, password, phone: phone || undefined };

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const payload = (await response.json()) as {
        data?: unknown;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Autentikasi gagal");
      }

      toast.success(mode === "login" ? "Berhasil masuk" : "Akun berhasil dibuat");
      router.push("/akun");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Autentikasi gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <GoogleSignInButton />

      <p className="text-center text-xs text-muted-foreground">
        Pilih akun Google yang sudah login di browser Anda — tanpa perlu
        mengetik email/password Google.
      </p>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border-subtle" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">atau</span>
        </div>
      </div>

      {mode === "login" && !showManualForm ? (
        <button
          type="button"
          onClick={() => setShowManualForm(true)}
          className="w-full text-center text-sm font-semibold text-primary hover:underline"
        >
          Masuk dengan email & password
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" ? (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nama Lengkap
              </label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="user@industrialx.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={mode === "register" ? 8 : 6}
            />
          </div>

          {mode === "register" ? (
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                No. Telepon (opsional)
              </label>
              <Input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
              />
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Memproses..."
              : mode === "login"
                ? "Masuk"
                : "Daftar"}
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            Belum punya akun?{" "}
            <Link href="/akun/register" className="font-semibold text-primary">
              Daftar
            </Link>
          </>
        ) : (
          <>
            Sudah punya akun?{" "}
            <Link href="/akun/login" className="font-semibold text-primary">
              Masuk
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
