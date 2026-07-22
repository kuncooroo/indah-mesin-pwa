"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
};

export function ImageUploadField({
  value,
  onChange,
  label = "Gambar",
  required = false,
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (JPG, PNG, WebP, GIF)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5 MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const payload = (await response.json()) as
        | { data: { url: string } }
        | { error: string };

      if (!response.ok) {
        throw new Error("error" in payload ? payload.error : "Upload gagal");
      }

      const successPayload = payload as { data: { url: string } };
      onChange(successPayload.data.url);
      toast.success("Gambar berhasil diunggah");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => void handleFileChange(event)}
      />

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <div className="relative h-40 w-full bg-muted">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex gap-2 border-t border-border p-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              Ganti Gambar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => onChange("")}
            >
              Hapus
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground transition-colors hover:bg-muted/50 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Mengunggah...
            </>
          ) : (
            <>
              <Upload className="size-5" />
              Klik untuk unggah gambar
            </>
          )}
        </button>
      )}

      {!value && required ? (
        <p className="text-xs text-muted-foreground">Gambar wajib diunggah.</p>
      ) : null}
    </div>
  );
}
