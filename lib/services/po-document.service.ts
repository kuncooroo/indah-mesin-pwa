import { buildPurchaseOrderPdf } from "@/lib/documents/pdf-builder";
import { samplePurchaseOrder } from "@/lib/data/purchase-order";

export async function generateSamplePoPdf(): Promise<Uint8Array> {
  return buildPurchaseOrderPdf({
    number: samplePurchaseOrder.number,
    quotationNumber: "QT-2024-0056",
    companyName: samplePurchaseOrder.customer.name,
    picName: samplePurchaseOrder.customer.name,
    shippingLocation: samplePurchaseOrder.shipping.location,
    estimatedArrivalLabel: samplePurchaseOrder.shipping.estimatedArrivalLabel,
    items: samplePurchaseOrder.items.map((item) => ({
      sku: item.slug.toUpperCase().slice(0, 12),
      name: item.name,
      description: item.categoryLabel,
      quantity: item.quantity,
      unit: "Unit",
      unitPriceLabel: item.unitPriceLabel,
      totalPriceLabel: item.unitPriceLabel,
    })),
    subtotalLabel: samplePurchaseOrder.costSummary.subtotalLabel,
    shippingLabel: samplePurchaseOrder.costSummary.shippingLabel,
    taxLabel: samplePurchaseOrder.costSummary.taxLabel,
    totalLabel: samplePurchaseOrder.costSummary.totalLabel,
    notes: samplePurchaseOrder.notes,
    createdAt: new Date(),
  });
}
