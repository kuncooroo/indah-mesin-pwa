export const WA_NUMBER = "6281217576760";

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Template permintaan penawaran dari halaman produk */
export function productOrderMessage(product: {
  name: string;
  sku: string;
  productUrl: string;
  variation?: string;
  quantity?: number;
}): string {
  return [
    "Halo Tim *IndustrialX*,",
    "",
    "Saya ingin mengajukan *Permintaan Penawaran (RFQ)* untuk produk berikut:",
    "",
    "━━━━━━━━━━━━━━━━━━",
    "📋 *DETAIL PERMINTAAN*",
    "━━━━━━━━━━━━━━━━━━",
    `• Produk: ${product.name}`,
    `• SKU: ${product.sku}`,
    `• Spesifikasi: ${product.variation ?? "Standar"}`,
    `• Estimasi Qty: ${product.quantity ?? 1} unit`,
    `• Link: ${product.productUrl}`,
    "",
    "Mohon informasi ketersediaan, lead time, dan estimasi harga untuk kebutuhan perusahaan kami.",
    "",
    "Terima kasih.",
  ].join("\n");
}

/** Template notifikasi RFQ terkirim */
export function rfqWhatsAppMessage(input: {
  customerName: string;
  companyName?: string;
  rfqNumber: string;
  pdfUrl: string;
  origin?: string;
}): string {
  const pdfLink = input.origin
    ? `${input.origin}${input.pdfUrl}`
    : input.pdfUrl;

  const fromLine = input.companyName
    ? `*${input.customerName}* · *${input.companyName}*`
    : `*${input.customerName}*`;

  return [
    "Halo Tim *IndustrialX*,",
    "",
    "Saya telah mengirim *Permintaan Penawaran (RFQ)* melalui website.",
    "",
    "━━━━━━━━━━━━━━━━━━",
    "📄 *DOKUMEN RFQ*",
    "━━━━━━━━━━━━━━━━━━",
    `• Nomor RFQ: *${input.rfqNumber}*`,
    `• Pengirim: ${fromLine}`,
    `• Dokumen: ${pdfLink}`,
    "",
    "Mohon review kebutuhan kami dan kirim *Quotation* resmi.",
    "Saya siap diskusi lebih lanjut untuk kebutuhan mesin industri.",
    "",
    "Terima kasih.",
  ].join("\n");
}

/** Template penawaran harga (Quotation) */
export function quotationWhatsAppMessage(input: {
  customerName: string;
  companyName: string;
  quotationNumber: string;
  rfqNumber: string;
  pdfUrl: string;
  origin?: string;
}): string {
  const pdfLink = input.origin
    ? `${input.origin}${input.pdfUrl}`
    : input.pdfUrl;

  return [
    "Halo *" + input.customerName + "*,",
    "",
    "Berikut *Penawaran Harga (Quotation)* dari *IndustrialX* untuk permintaan Anda:",
    "",
    "━━━━━━━━━━━━━━━━━━",
    "💼 *QUOTATION*",
    "━━━━━━━━━━━━━━━━━━",
    `• No. Quotation: *${input.quotationNumber}*`,
    `• Ref. RFQ: ${input.rfqNumber}`,
    `• Perusahaan: ${input.companyName}`,
    `• Dokumen: ${pdfLink}`,
    "",
    "Silakan review penawaran kami. Jika setuju, kami akan lanjut ke tahap *Purchase Order (PO)*.",
    "",
    "Hubungi kami jika ada pertanyaan teknis atau negosiasi harga.",
    "",
    "Terima kasih · IndustrialX",
  ].join("\n");
}

/** Template Purchase Order */
export function poWhatsAppMessage(input: {
  customerName: string;
  companyName: string;
  poNumber: string;
  quotationNumber: string;
  pdfUrl: string;
  origin?: string;
}): string {
  const pdfLink = input.origin
    ? `${input.origin}${input.pdfUrl}`
    : input.pdfUrl;

  return [
    "Halo Tim *IndustrialX*,",
    "",
    "Kami konfirmasi *Purchase Order (PO)* berikut:",
    "",
    "━━━━━━━━━━━━━━━━━━",
    "🧾 *PURCHASE ORDER*",
    "━━━━━━━━━━━━━━━━━━",
    `• No. PO: *${input.poNumber}*`,
    `• Ref. Quotation: ${input.quotationNumber}`,
    `• Perusahaan: ${input.companyName}`,
    `• PIC: ${input.customerName}`,
    `• Dokumen: ${pdfLink}`,
    "",
    "Mohon konfirmasi penerimaan PO dan informasi jadwal produksi/pengiriman.",
    "",
    "Terima kasih.",
  ].join("\n");
}
