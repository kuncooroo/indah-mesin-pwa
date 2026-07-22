import { NextResponse } from "next/server";

import { getSessionFromCookie } from "@/lib/auth/session";
import { jsonError, jsonOk } from "@/lib/api/response";
import { createRfq, getRfqByNumber, listRfqs } from "@/lib/services/rfq.service";
import { notificationService } from "@/lib/services/notification.service";
import { createRfqSchema } from "@/lib/validations/rfq";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createRfqSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Data RFQ tidak valid.");
    }

    const session = await getSessionFromCookie();
    const customerId =
      session?.role === "CUSTOMER" ? session.sub : parsed.data.customerId;

    const rfq = await createRfq({
      ...parsed.data,
      customerId: customerId ?? parsed.data.customerId,
    });

    void notificationService.notifyRfqSubmitted({
      customerId: customerId ?? null,
      email: rfq.email,
      name: rfq.picName,
      rfqNumber: rfq.number,
    });

    return jsonOk({
      id: rfq.id,
      number: rfq.number,
      pdfUrl: rfq.pdfUrl,
      status: rfq.status,
      companyName: rfq.companyName,
      picName: rfq.picName,
      itemCount: rfq.items.length,
      submittedAt: rfq.submittedAt.toISOString(),
    });
  } catch (error) {
    console.error("[POST /api/rfq]", error);
    return jsonError(
      error instanceof Error ? error.message : "Gagal mengirim permintaan penawaran.",
      500,
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get("number");
  const customerId = searchParams.get("customerId");

  if (number) {
    const rfq = await getRfqByNumber(number);

    if (!rfq) {
      return NextResponse.json({ error: "RFQ tidak ditemukan." }, { status: 404 });
    }

    return jsonOk({
      ...rfq,
      submittedAt: rfq.submittedAt.toISOString(),
      createdAt: rfq.createdAt.toISOString(),
    });
  }

  const rfqs = await listRfqs(customerId ?? undefined);

  return jsonOk(
    rfqs.map((rfq) => {
      const items = Array.isArray(rfq.items) ? rfq.items : [];
      return {
        id: rfq.id,
        number: rfq.number,
        status: rfq.status,
        companyName: rfq.companyName,
        picName: rfq.picName,
        itemCount: items.length,
        pdfUrl: rfq.pdfUrl,
        submittedAt: rfq.submittedAt.toISOString(),
        createdAt: rfq.createdAt.toISOString(),
      };
    }),
  );
}
