export const RFQ_STATUS_LABELS: Record<string, string> = {
  SUBMITTED: "Menunggu Review",
  UNDER_REVIEW: "Sedang Ditinjau",
  QUOTATION_SENT: "Sudah Dibalas",
  NEGOTIATION: "Negosiasi",
  ACCEPTED: "Disetujui",
  REJECTED: "Ditolak",
  PURCHASE_ORDER: "Purchase Order",
  PRODUCTION: "Produksi",
  SHIPPING: "Pengiriman",
  COMPLETED: "Selesai",
  // legacy values from older schema
  PENDING: "Menunggu Review",
  REVIEWED: "Sedang Ditinjau",
  QUOTED: "Sudah Dibalas",
  CLOSED: "Selesai",
};

export function getRfqStatusLabel(status: string): string {
  return RFQ_STATUS_LABELS[status] ?? status;
}
