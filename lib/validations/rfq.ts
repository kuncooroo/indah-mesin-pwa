import { z } from "zod";

export const rfqItemSchema = z.object({
  productId: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().min(1).max(9999),
  note: z.string().max(500).optional(),
});

export const purchaseEstimateSchema = z.enum([
  "THIS_WEEK",
  "THIS_MONTH",
  "THREE_MONTHS",
  "UNKNOWN",
]);

export const rfqAttachmentSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.enum(["LAYOUT", "DRAWING", "SPECIFICATION"]),
  fileUrl: z.string().optional(),
});

export const createRfqSchema = z.object({
  customerId: z.string().max(64).optional(),
  companyName: z.string().min(2, "Nama perusahaan wajib diisi.").max(200),
  picName: z.string().min(2, "Nama PIC wajib diisi.").max(120),
  email: z.string().email("Email tidak valid."),
  phone: z.string().min(8, "No WhatsApp wajib diisi.").max(30),
  address: z.string().min(5, "Alamat wajib diisi.").max(500),
  city: z.string().min(2, "Kota wajib diisi.").max(100),
  province: z.string().min(2, "Provinsi wajib diisi.").max(100),
  country: z.string().min(2).max(100).default("Indonesia"),
  purchaseEstimate: purchaseEstimateSchema,
  budget: z.string().max(100).optional(),
  generalNote: z.string().max(2000).optional(),
  attachments: z.array(rfqAttachmentSchema).optional(),
  items: z.array(rfqItemSchema).min(1, "Minimal satu produk di keranjang RFQ."),
});

export type CreateRfqPayload = z.infer<typeof createRfqSchema>;

export const PURCHASE_ESTIMATE_OPTIONS = [
  { value: "THIS_WEEK", label: "Minggu ini" },
  { value: "THIS_MONTH", label: "Bulan ini" },
  { value: "THREE_MONTHS", label: "3 Bulan lagi" },
  { value: "UNKNOWN", label: "Belum tahu" },
] as const;
