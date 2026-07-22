import { format } from "date-fns";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/db/prisma";
import { buildRequestPdf } from "@/lib/documents/pdf-builder";
import type { CreateRfqPayload } from "@/lib/validations/rfq";
import { PURCHASE_ESTIMATE_OPTIONS } from "@/lib/validations/rfq";

export type RfqItemInput = {
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  note?: string;
};

export type RfqRecord = {
  id: string;
  number: string;
  customerId: string | null;
  status: string;
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  purchaseEstimate: string | null;
  budget: string | null;
  generalNote: string | null;
  pdfUrl: string;
  items: RfqItemInput[];
  submittedAt: Date;
  createdAt: Date;
};

function sanitizeFileName(number: string): string {
  return number.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

async function generateRfqNumber(date = new Date()): Promise<string> {
  const year = format(date, "yyyy");
  const prefix = `RFQ-${year}`;

  const latest = await prisma.rfq.findFirst({
    where: { number: { startsWith: prefix } },
    orderBy: { number: "desc" },
    select: { number: true },
  });

  const nextSequence = latest
    ? Number.parseInt(latest.number.slice(prefix.length), 10) + 1
    : 1;

  return `${prefix}${String(nextSequence).padStart(6, "0")}`;
}

function purchaseEstimateLabel(value: string | null | undefined): string {
  if (!value) return "-";
  return (
    PURCHASE_ESTIMATE_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

async function buildRfqPdf(input: {
  number: string;
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  purchaseEstimate: string | null;
  budget: string | null;
  generalNote: string | null;
  items: RfqItemInput[];
  createdAt: Date;
}): Promise<Uint8Array> {
  const productIds = input.items
    .map((item) => item.productId)
    .filter((id): id is string => Boolean(id));

  const products = productIds.length
    ? await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, sku: true },
      })
    : [];

  const skuById = new Map(products.map((product) => [product.id, product.sku]));

  return buildRequestPdf({
    number: input.number,
    companyName: input.companyName,
    picName: input.picName,
    email: input.email,
    phone: input.phone,
    address: input.address,
    city: input.city,
    province: input.province,
    country: input.country,
    purchaseEstimateLabel: purchaseEstimateLabel(input.purchaseEstimate),
    budget: input.budget,
    generalNote: input.generalNote,
    items: input.items.map((item) => ({
      sku: skuById.get(item.productId) ?? item.slug.toUpperCase().slice(0, 16),
      name: item.name,
      quantity: item.quantity,
      unit: "Unit",
      note: item.note,
    })),
    createdAt: input.createdAt,
  });
}

function mapRfqRecord(rfq: {
  id: string;
  number: string;
  customerId: string | null;
  customerName?: string | null;
  status: string;
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  purchaseEstimate: string | null;
  budget: string | null;
  generalNote: string | null;
  pdfUrl: string;
  items: unknown;
  submittedAt: Date;
  createdAt: Date;
}): RfqRecord {
  const picName = rfq.picName.trim() || rfq.customerName?.trim() || "Customer";
  const companyName = rfq.companyName.trim() || rfq.customerName?.trim() || "Perusahaan";

  return {
    id: rfq.id,
    number: rfq.number,
    customerId: rfq.customerId,
    status: rfq.status,
    companyName,
    picName,
    email: rfq.email,
    phone: rfq.phone,
    address: rfq.address,
    city: rfq.city,
    province: rfq.province,
    country: rfq.country,
    purchaseEstimate: rfq.purchaseEstimate,
    budget: rfq.budget,
    generalNote: rfq.generalNote,
    pdfUrl: rfq.pdfUrl,
    items: rfq.items as RfqItemInput[],
    submittedAt: rfq.submittedAt,
    createdAt: rfq.createdAt,
  };
}

export async function createRfq(input: CreateRfqPayload): Promise<RfqRecord> {
  if (!input.items.length) {
    throw new Error("Minimal satu produk diperlukan untuk RFQ.");
  }

  const submittedAt = new Date();
  const number = await generateRfqNumber(submittedAt);

  const pdfBytes = await buildRfqPdf({
    number,
    companyName: input.companyName,
    picName: input.picName,
    email: input.email,
    phone: input.phone,
    address: input.address,
    city: input.city,
    province: input.province,
    country: input.country,
    purchaseEstimate: input.purchaseEstimate,
    budget: input.budget ?? null,
    generalNote: input.generalNote ?? null,
    items: input.items,
    createdAt: submittedAt,
  });

  const downloadsDir = path.join(
    process.cwd(),
    "public",
    "assets",
    "downloads",
    "rfq",
  );
  await mkdir(downloadsDir, { recursive: true });

  const fileName = `${sanitizeFileName(number)}.pdf`;
  const filePath = path.join(downloadsDir, fileName);
  await writeFile(filePath, pdfBytes);

  const pdfUrl = `/assets/downloads/rfq/${fileName}`;

  const rfq = await prisma.rfq.create({
    data: {
      number,
      customerId: input.customerId?.trim() || null,
      status: "SUBMITTED",
      companyName: input.companyName.trim(),
      picName: input.picName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      address: input.address.trim(),
      city: input.city.trim(),
      province: input.province.trim(),
      country: input.country.trim(),
      purchaseEstimate: input.purchaseEstimate,
      budget: input.budget?.trim() || null,
      generalNote: input.generalNote?.trim() || null,
      attachments: input.attachments ?? [],
      pdfUrl,
      items: input.items,
      submittedAt,
      rfqItems: {
        create: input.items.map((item, index) => ({
          productId: item.productId || null,
          productName: item.name,
          productSlug: item.slug,
          quantity: item.quantity,
          note: item.note?.trim() || null,
          sortOrder: index,
        })),
      },
    },
    include: { rfqItems: true },
  });

  return mapRfqRecord(rfq);
}

export async function getRfqByNumber(number: string): Promise<RfqRecord | null> {
  const rfq = await prisma.rfq.findUnique({ where: { number } });
  if (!rfq) return null;
  return mapRfqRecord(rfq);
}

export async function listRfqs(customerId?: string) {
  return prisma.rfq.findMany({
    where: customerId ? { customerId } : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}
