export type PurchaseOrderStatus = "pending" | "confirmed" | "cancelled";

export type PurchaseOrderItem = {
  id: string;
  slug: string;
  name: string;
  categoryLabel: string;
  quantity: number;
  quantityLabel: string;
  unitPriceLabel: string;
};

export type PurchaseOrder = {
  id: string;
  number: string;
  dateLabel: string;
  status: PurchaseOrderStatus;
  statusLabel: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  shipping: {
    location: string;
    estimatedArrivalLabel: string;
  };
  items: PurchaseOrderItem[];
  costSummary: {
    subtotalLabel: string;
    shippingLabel: string;
    taxLabel: string;
    totalLabel: string;
  };
  notes: string;
  pdfHref: string;
};

export const samplePurchaseOrder: PurchaseOrder = {
  id: "po-2024-0056",
  number: "PO-2024-0056",
  dateLabel: "16 Mei 2024",
  status: "pending",
  statusLabel: "Pending",
  customer: {
    name: "PT Maju Jaya Food",
    phone: "+62 812-3456-7890",
    email: "procurement@majujayafood.co.id",
  },
  shipping: {
    location: "Malang, Jawa Timur",
    estimatedArrivalLabel: "20 Mei 2024",
  },
  items: [
    {
      id: "po-item-rh-1200",
      slug: "industrial-retort-sterilizer",
      name: "Retort Sterilisasi Horizontal RH-1200",
      categoryLabel: "Retort Sterilisasi",
      quantity: 2,
      quantityLabel: "2 Unit",
      unitPriceLabel: "Rp 650.000.000",
    },
    {
      id: "po-item-cpr-2000",
      slug: "industrial-retort-sterilizer",
      name: "Control Panel Retort CPR-2000",
      categoryLabel: "Control Panel",
      quantity: 1,
      quantityLabel: "1 Unit",
      unitPriceLabel: "Rp 85.000.000",
    },
  ],
  costSummary: {
    subtotalLabel: "Rp 871.304.054",
    shippingLabel: "Rp 5.000.000",
    taxLabel: "Rp 96.893.446",
    totalLabel: "Rp 973.197.500",
  },
  notes: "Mohon konfirmasi spesifikasi akhir sebelum proses produksi.",
  pdfHref: "/assets/downloads/po-2024-0056.pdf",
};
