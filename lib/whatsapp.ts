export const WA_NUMBER = "6281217576760";

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(product: {
  name: string;
  sku: string;
  productUrl: string;
  variation?: string;
  quantity?: number;
}): string {
  return [
    "Halo Admin *IndustrialX*, Saya tertarik untuk mengajukan Purchase Order (PO) / Permintaan Penawaran untuk produk berikut:",
    "",
    "*Detail Produk:*",
    `- Nama Mesin: ${product.name}`,
    `- Kode SKU: ${product.sku}`,
    `- Variasi Pilihan: ${product.variation ?? "Standar"}`,
    `- Estimasi Jumlah: ${product.quantity ?? 1} Unit`,
    "",
    `*Link Produk:* ${product.productUrl}`,
    "",
    "Mohon informasi mengenai ketersediaan stok, estimasi waktu pengiriman (indent), serta draft surat penawaran resmi (Quotation) untuk perusahaan kami. Terima kasih.",
  ].join("\n");
}
