import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFPage,
  type PDFFont,
  type RGB,
} from "pdf-lib";

const BRAND = "INDUSTRIALX";
const VENDOR = {
  name: "IndustrialX Marketplace",
  dept: "Industrial Solutions Department",
  address: "Jl. Industri Raya No. 88, Jakarta Selatan 12530, Indonesia",
  phone: "+62 812-1757-6760",
  email: "sales@industrialx.com",
  website: "www.industrialx.com",
};

const PRIMARY: RGB = rgb(0.102, 0.212, 0.451);
const PRIMARY_LIGHT: RGB = rgb(0.91, 0.94, 0.98);
const TEXT: RGB = rgb(0.12, 0.14, 0.18);
const MUTED: RGB = rgb(0.45, 0.48, 0.52);
const WHITE: RGB = rgb(1, 1, 1);
const BORDER: RGB = rgb(0.85, 0.88, 0.92);

export type DocumentItem = {
  sku?: string;
  name: string;
  description?: string;
  quantity: number;
  unit?: string;
  note?: string;
  unitPriceLabel?: string;
  totalPriceLabel?: string;
};

type PdfCtx = {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  y: number;
};

function ctx(page: PDFPage, font: PDFFont, fontBold: PDFFont): PdfCtx {
  return { page, font, fontBold, y: 812 };
}

function text(
  c: PdfCtx,
  value: string,
  opts?: { x?: number; y?: number; size?: number; bold?: boolean; color?: RGB; maxWidth?: number },
) {
  const size = opts?.size ?? 9;
  const content = opts?.maxWidth ? value.slice(0, opts.maxWidth) : value;
  c.page.drawText(content, {
    x: opts?.x ?? 40,
    y: opts?.y ?? c.y,
    size,
    font: opts?.bold ? c.fontBold : c.font,
    color: opts?.color ?? TEXT,
  });
  if (!opts?.y) c.y -= size + 5;
}

function line(c: PdfCtx, y?: number) {
  const ly = y ?? c.y;
  c.page.drawLine({
    start: { x: 40, y: ly },
    end: { x: 555, y: ly },
    thickness: 1,
    color: BORDER,
  });
  if (!y) c.y -= 10;
}

function headerBand(c: PdfCtx, title: string, subtitle: string, meta: [string, string][]) {
  c.page.drawRectangle({ x: 0, y: 770, width: 595, height: 72, color: PRIMARY_LIGHT });
  text(c, title, { x: 40, y: 818, size: 16, bold: true, color: PRIMARY });
  text(c, subtitle, { x: 40, y: 800, size: 9, color: MUTED });

  text(c, BRAND, { x: 400, y: 818, size: 14, bold: true, color: PRIMARY });
  text(c, VENDOR.dept, { x: 400, y: 804, size: 8, color: MUTED });

  let my = 788;
  meta.forEach(([label, value]) => {
    text(c, label, { x: 400, y: my, size: 7, color: MUTED });
    text(c, value, { x: 470, y: my, size: 8, bold: true, color: TEXT });
    my -= 12;
  });

  c.y = 755;
}

function partyColumns(
  c: PdfCtx,
  leftTitle: string,
  leftLines: string[],
  rightTitle: string,
  rightLines: string[],
) {
  text(c, leftTitle, { x: 40, y: c.y, size: 8, bold: true, color: PRIMARY });
  text(c, rightTitle, { x: 300, y: c.y, size: 8, bold: true, color: PRIMARY });
  c.y -= 14;

  const max = Math.max(leftLines.length, rightLines.length);
  for (let i = 0; i < max; i += 1) {
    if (leftLines[i]) text(c, leftLines[i], { x: 40, y: c.y, size: 8 });
    if (rightLines[i]) text(c, rightLines[i], { x: 300, y: c.y, size: 8 });
    c.y -= 11;
  }
  c.y -= 6;
}

function tableHeader(c: PdfCtx, cols: { label: string; x: number; w?: number }[]) {
  c.page.drawRectangle({ x: 40, y: c.y - 4, width: 515, height: 18, color: PRIMARY });
  cols.forEach((col) => {
    text(c, col.label, {
      x: col.x,
      y: c.y,
      size: 7,
      bold: true,
      color: WHITE,
    });
  });
  c.y -= 22;
}

function tableRow(c: PdfCtx, cols: { value: string; x: number; bold?: boolean }[], height = 28) {
  c.page.drawRectangle({
    x: 40,
    y: c.y - height + 8,
    width: 515,
    height,
    borderColor: BORDER,
    borderWidth: 0.5,
  });
  cols.forEach((col) => {
    text(c, col.value, {
      x: col.x,
      y: c.y - 6,
      size: 7,
      bold: col.bold,
      maxWidth: 80,
    });
  });
  c.y -= height + 2;
}

function summaryBox(c: PdfCtx, rows: [string, string][], totalLabel: string, totalValue: string) {
  const boxX = 340;
  let boxY = c.y;
  rows.forEach(([label, value], index) => {
    text(c, label, { x: boxX, y: boxY - index * 14, size: 8, color: MUTED });
    text(c, value, { x: 470, y: boxY - index * 14, size: 8, bold: true });
  });
  const totalY = boxY - rows.length * 14 - 8;
  c.page.drawRectangle({ x: boxX - 8, y: totalY - 18, width: 215, height: 22, color: PRIMARY });
  text(c, totalLabel, { x: boxX, y: totalY - 6, size: 8, bold: true, color: WHITE });
  text(c, totalValue, { x: 430, y: totalY - 6, size: 9, bold: true, color: WHITE });
  c.y = totalY - 30;
}

function footerBlock(c: PdfCtx, lines: string[]) {
  c.y = Math.max(c.y, 90);
  line(c);
  lines.forEach((l) => text(c, l, { size: 7, color: MUTED }));
}

function signatureBlock(c: PdfCtx, preparedBy: string, title: string) {
  c.y = Math.min(c.y, 130);
  text(c, "Authorized By", { size: 8, bold: true, color: PRIMARY });
  c.y -= 28;
  line(c, c.y);
  c.y -= 14;
  text(c, preparedBy, { size: 9, bold: true });
  text(c, title, { size: 8, color: MUTED });
  text(c, "COMPANY STAMP", {
    x: 420,
    y: c.y + 20,
    size: 7,
    color: MUTED,
  });
  c.page.drawRectangle({
    x: 420,
    y: c.y - 10,
    width: 120,
    height: 50,
    borderColor: BORDER,
    borderWidth: 1,
  });
}

export async function buildRequestPdf(input: {
  number: string;
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  purchaseEstimateLabel: string;
  budget: string | null;
  generalNote: string | null;
  items: DocumentItem[];
  createdAt: Date;
}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const c = ctx(page, font, fontBold);

  const dateLabel = format(input.createdAt, "dd MMMM yyyy", { locale: localeId });

  headerBand(c, "REQUEST FOR QUOTATION (RFQ)", "Permintaan Penawaran Harga", [
    ["RFQ NUMBER", input.number],
    ["DATE ISSUED", dateLabel],
  ]);

  text(c, "Kami mohon penawaran harga terbaik untuk barang/layanan sesuai kebutuhan kami.", {
    size: 8,
    color: MUTED,
  });
  c.y -= 4;

  partyColumns(
    c,
    "FROM (BUYER)",
    [
      input.companyName,
      `Attn: ${input.picName}`,
      `${input.address}, ${input.city}`,
      `${input.province}, ${input.country}`,
      input.phone,
      input.email,
    ],
    "TO (VENDOR)",
    [
      VENDOR.name,
      VENDOR.dept,
      VENDOR.address,
      VENDOR.email,
      VENDOR.phone,
      VENDOR.website,
    ],
  );

  tableHeader(c, [
    { label: "NO", x: 44 },
    { label: "SKU / CODE", x: 62 },
    { label: "DESCRIPTION", x: 130 },
    { label: "QTY", x: 300 },
    { label: "UNIT", x: 330 },
    { label: "REQUEST DETAILS", x: 370 },
  ]);

  input.items.forEach((item, index) => {
    tableRow(c, [
      { value: String(index + 1), x: 44 },
      { value: item.sku ?? "-", x: 62 },
      { value: item.name, x: 130, bold: true },
      { value: String(item.quantity), x: 300 },
      { value: item.unit ?? "Unit", x: 330 },
      { value: item.note?.trim() || "Spesifikasi standar", x: 370 },
    ]);
  });

  c.y -= 6;
  text(c, "Request Information", { size: 9, bold: true, color: PRIMARY });
  c.y -= 2;
  text(c, `Expected Delivery: ${input.purchaseEstimateLabel}`, { size: 8 });
  text(c, `Budget (Est.): ${input.budget?.trim() || "TBD"}`, { size: 8 });
  text(c, "Payment Terms: By agreement", { size: 8 });
  text(c, "Currency: IDR", { size: 8 });
  if (input.generalNote?.trim()) {
    text(c, `Notes: ${input.generalNote.trim()}`, { size: 8 });
  }

  summaryBox(
    c,
    [
      ["Subtotal (Est.)", input.budget?.trim() || "TBD"],
      ["Logistics / Delivery (Est.)", "TBD"],
      ["Installation (Est.)", "TBD"],
    ],
    "TOTAL EST. BUDGET",
    input.budget?.trim() || "TBD",
  );

  text(c, "Terms: Dokumen ini bukan Purchase Order. Penawaran akan dievaluasi berdasarkan spesifikasi dan lead time.", {
    size: 7,
    color: MUTED,
  });
  signatureBlock(c, input.picName, "Procurement / PIC");
  footerBlock(c, [
    "GENERATED VIA INDUSTRIALX DIGITAL PROCUREMENT PLATFORM",
    `${BRAND} · ${VENDOR.email} · ${VENDOR.phone}`,
  ]);

  return pdf.save();
}

export async function buildQuotationPdf(input: {
  number: string;
  rfqNumber: string;
  companyName: string;
  picName: string;
  validUntilLabel: string;
  items: DocumentItem[];
  subtotalLabel: string;
  taxLabel: string;
  totalLabel: string;
  notes?: string;
  createdAt: Date;
}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const c = ctx(page, font, fontBold);

  const dateLabel = format(input.createdAt, "dd MMMM yyyy", { locale: localeId });

  headerBand(c, "QUOTATION", "Penawaran Harga", [
    ["QUOTATION NO.", input.number],
    ["DATE ISSUED", dateLabel],
    ["RFQ REF.", input.rfqNumber],
    ["VALID UNTIL", input.validUntilLabel],
  ]);

  partyColumns(
    c,
    "FROM (VENDOR)",
    [VENDOR.name, VENDOR.dept, VENDOR.address, VENDOR.phone, VENDOR.email, VENDOR.website],
    "TO (BUYER)",
    [input.companyName, `Attn: ${input.picName}`],
  );

  tableHeader(c, [
    { label: "NO", x: 44 },
    { label: "SKU", x: 62 },
    { label: "DESCRIPTION", x: 120 },
    { label: "QTY", x: 290 },
    { label: "UNIT", x: 320 },
    { label: "UNIT PRICE", x: 360 },
    { label: "TOTAL", x: 440 },
  ]);

  input.items.forEach((item, index) => {
    tableRow(c, [
      { value: String(index + 1), x: 44 },
      { value: item.sku ?? "-", x: 62 },
      { value: item.name, x: 120, bold: true },
      { value: String(item.quantity), x: 290 },
      { value: item.unit ?? "Unit", x: 320 },
      { value: item.unitPriceLabel ?? "-", x: 360 },
      { value: item.totalPriceLabel ?? "-", x: 440 },
    ]);
  });

  c.y -= 4;
  text(c, "Commercial Terms", { size: 9, bold: true, color: PRIMARY });
  text(c, "Payment Terms: 30% DP, 70% before delivery", { size: 8 });
  text(c, "Lead Time: 45-60 working days", { size: 8 });
  text(c, "Delivery Terms: FOB Jakarta", { size: 8 });
  text(c, "Warranty: 12 months", { size: 8 });
  if (input.notes?.trim()) text(c, `Notes: ${input.notes.trim()}`, { size: 8 });

  summaryBox(
    c,
    [
      ["Subtotal", input.subtotalLabel],
      ["Logistics (Est.)", "TBD"],
      ["Installation (Est.)", "TBD"],
      ["VAT / PPN 11%", input.taxLabel],
    ],
    "TOTAL (INCL. VAT)",
    input.totalLabel,
  );

  signatureBlock(c, "Sales Manager", "IndustrialX Marketplace");
  footerBlock(c, [
    "INDUSTRIALX MARKETPLACE · Industrial Solutions for a Better Future",
    `${VENDOR.email} · ${VENDOR.phone}`,
  ]);

  return pdf.save();
}

export async function buildPurchaseOrderPdf(input: {
  number: string;
  quotationNumber: string;
  companyName: string;
  picName: string;
  shippingLocation: string;
  estimatedArrivalLabel: string;
  items: DocumentItem[];
  subtotalLabel: string;
  shippingLabel: string;
  taxLabel: string;
  totalLabel: string;
  notes?: string;
  createdAt: Date;
}): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const c = ctx(page, font, fontBold);

  const dateLabel = format(input.createdAt, "dd MMMM yyyy", { locale: localeId });

  headerBand(c, "PURCHASE ORDER", "We issue this PO based on your quotation.", [
    ["PO NUMBER", input.number],
    ["DATE ISSUED", dateLabel],
    ["RFQ REF.", input.quotationNumber.replace("QT", "RFQ")],
    ["QUOTATION REF.", input.quotationNumber],
  ]);

  partyColumns(
    c,
    "TO (VENDOR)",
    [VENDOR.name, VENDOR.dept, VENDOR.address, VENDOR.phone, VENDOR.email],
    "FROM (BUYER)",
    [
      input.companyName,
      `Attn: ${input.picName}`,
      input.shippingLocation,
    ],
  );

  tableHeader(c, [
    { label: "NO", x: 44 },
    { label: "SKU", x: 62 },
    { label: "DESCRIPTION", x: 120 },
    { label: "QTY", x: 290 },
    { label: "UNIT", x: 320 },
    { label: "UNIT PRICE", x: 360 },
    { label: "TOTAL", x: 440 },
  ]);

  input.items.forEach((item, index) => {
    tableRow(c, [
      { value: String(index + 1), x: 44 },
      { value: item.sku ?? "-", x: 62 },
      { value: item.name, x: 120, bold: true },
      { value: String(item.quantity), x: 290 },
      { value: item.unit ?? "Unit", x: 320 },
      { value: item.unitPriceLabel ?? "-", x: 360 },
      { value: item.totalPriceLabel ?? "-", x: 440 },
    ]);
  });

  c.y -= 4;
  text(c, "Order Information", { size: 9, bold: true, color: PRIMARY });
  text(c, "Payment Terms: 30% Down Payment", { size: 8 });
  text(c, "Delivery Terms: FOB Jakarta", { size: 8 });
  text(c, `Delivery Address: ${input.shippingLocation}`, { size: 8 });
  text(c, `Estimated Arrival: ${input.estimatedArrivalLabel}`, { size: 8 });
  if (input.notes?.trim()) text(c, `Notes: ${input.notes.trim()}`, { size: 8 });

  summaryBox(
    c,
    [
      ["Subtotal", input.subtotalLabel],
      ["Logistics / Delivery", input.shippingLabel],
      ["VAT / PPN 11%", input.taxLabel],
    ],
    "TOTAL (INCL. VAT)",
    input.totalLabel,
  );

  signatureBlock(c, input.picName, "Procurement Manager");
  footerBlock(c, [
    `Thank you for your business and partnership. ${input.companyName.toUpperCase()}`,
    `${BRAND} · ${VENDOR.email}`,
  ]);

  return pdf.save();
}
