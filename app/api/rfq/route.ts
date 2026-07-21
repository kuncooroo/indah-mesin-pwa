import { NextResponse } from "next/server";

import { jsonError, jsonOk } from "@/lib/api/response";
import { createRfq } from "@/lib/services/rfq.service";
import { createRfqSchema } from "@/lib/validations/rfq";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createRfqSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Data RFQ tidak valid.");
    }

    const rfq = await createRfq(parsed.data);

    return jsonOk({
      id: rfq.id,
      number: rfq.number,
      pdfUrl: rfq.pdfUrl,
      customerName: rfq.customerName,
      createdAt: rfq.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("[POST /api/rfq]", error);
    return jsonError(
      error instanceof Error ? error.message : "Gagal membuat permintaan penawaran.",
      500,
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get("number");

  if (!number) {
    return jsonError("Nomor RFQ diperlukan.");
  }

  const { getRfqByNumber } = await import("@/lib/services/rfq.service");
  const rfq = await getRfqByNumber(number);

  if (!rfq) {
    return NextResponse.json({ error: "RFQ tidak ditemukan." }, { status: 404 });
  }

  return jsonOk({
    ...rfq,
    createdAt: rfq.createdAt.toISOString(),
  });
}
