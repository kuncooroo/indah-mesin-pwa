import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { isAuthError, requireCatalogSession } from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_SIZE = 5 * 1024 * 1024;

function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function POST(request: Request) {
  const auth = await requireCatalogSession();
  if (isAuthError(auth)) return auth;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("File tidak ditemukan", 422);
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return jsonError("Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.", 422);
    }

    if (file.size > MAX_SIZE) {
      return jsonError("Ukuran file maksimal 5 MB", 422);
    }

    const uploadsDir = path.join(process.cwd(), "public", "assets", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const extension = path.extname(file.name) || ".jpg";
    const baseName = sanitizeFileName(path.basename(file.name, extension));
    const fileName = `${Date.now()}-${baseName}${extension}`;
    const filePath = path.join(uploadsDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    return jsonOk({ url: `/assets/uploads/${fileName}` }, { status: 201 });
  } catch (error) {
    console.error("[admin/upload]", error);
    return jsonError("Gagal mengunggah file", 500);
  }
}
