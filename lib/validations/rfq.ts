import { z } from "zod";

export const rfqItemSchema = z.object({
  productId: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().min(1).max(9999),
  note: z.string().max(500).optional(),
});

export const createRfqSchema = z.object({
  customerName: z.string().min(1).max(120).optional(),
  customerId: z.string().max(64).optional(),
  items: z.array(rfqItemSchema).min(1),
});

export type CreateRfqPayload = z.infer<typeof createRfqSchema>;
