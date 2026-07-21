import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/db/prisma";
import { profileUser } from "@/lib/data/profile";

export type RfqItemInput = {
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  note?: string;
};

export type CreateRfqInput = {
  customerName?: string;
  customerId?: string;
  items: RfqItemInput[];
};

export type RfqRecord = {
  id: string;
  number: string;
  customerName: string;
  customerId: string | null;
  status: string;
  pdfUrl: string;
  items: RfqItemInput[];
  createdAt: Date;
};

function sanitizeFileName(number: string): string {
  return number.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

async function generateRfqNumber(date = new Date()): Promise<string> {
  const datePart = format(date, "yyyyMMdd");
  const prefix = `RFQ-${datePart}-`;

  const latest = await prisma.rfq.findFirst({
    where: { number: { startsWith: prefix } },
    orderBy: { number: "desc" },
    select: { number: true },
  });

  const nextSequence = latest
    ? Number.parseInt(latest.number.split("-").pop() ?? "0", 10) + 1
    : 1;

  return `${prefix}${String(nextSequence).padStart(3, "0")}`;
}

async function buildRfqPdf(input: {
  number: string;
  customerName: string;
  items: RfqItemInput[];
  createdAt: Date;
}): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = 780;

  function drawLine(text: string, options?: { bold?: boolean; size?: number }) {
    const size = options?.size ?? 11;
    const activeFont = options?.bold ? fontBold : font;
    page.drawText(text, { x: 48, y, size, font: activeFont, color: rgb(0.1, 0.15, 0.25) });
    y -= size + 8;
  }

  drawLine("Request For Quotation", { bold: true, size: 18 });
  y -= 4;
  drawLine("==================");
  y -= 4;
  drawLine(`Nomor: ${input.number}`, { bold: true });
  drawLine(`Customer: ${input.customerName}`);
  drawLine(
    `Tanggal: ${format(input.createdAt, "dd MMMM yyyy", { locale: localeId })}`,
  );
  y -= 8;
  drawLine("Produk", { bold: true, size: 13 });
  y -= 4;

  input.items.forEach((item, index) => {
    drawLine(`${index + 1}. ${item.name}`, { bold: true });
    drawLine(`   Qty: ${item.quantity}`);
    if (item.note?.trim()) {
      drawLine(`   Catatan: ${item.note.trim()}`);
    }
    y -= 4;
    drawLine("------------------");
  });

  return pdfDoc.save();
}

export async function createRfq(input: CreateRfqInput): Promise<RfqRecord> {
  if (!input.items.length) {
    throw new Error("Minimal satu produk diperlukan untuk RFQ.");
  }

  const createdAt = new Date();
  const number = await generateRfqNumber(createdAt);
  const customerName = input.customerName?.trim() || profileUser.name;
  const customerId = input.customerId?.trim() || profileUser.id;

  const pdfBytes = await buildRfqPdf({
    number,
    customerName,
    items: input.items,
    createdAt,
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
      customerName,
      customerId,
      pdfUrl,
      items: input.items,
    },
  });

  return {
    id: rfq.id,
    number: rfq.number,
    customerName: rfq.customerName,
    customerId: rfq.customerId,
    status: rfq.status,
    pdfUrl: rfq.pdfUrl,
    items: rfq.items as RfqItemInput[],
    createdAt: rfq.createdAt,
  };
}

export async function getRfqByNumber(number: string): Promise<RfqRecord | null> {
  const rfq = await prisma.rfq.findUnique({ where: { number } });

  if (!rfq) return null;

  return {
    id: rfq.id,
    number: rfq.number,
    customerName: rfq.customerName,
    customerId: rfq.customerId,
    status: rfq.status,
    pdfUrl: rfq.pdfUrl,
    items: rfq.items as RfqItemInput[],
    createdAt: rfq.createdAt,
  };
}

export async function listRfqs() {
  return prisma.rfq.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}
