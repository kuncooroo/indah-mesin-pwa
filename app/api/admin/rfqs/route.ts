import { isAuthError, requireAdminSession } from "@/lib/auth/guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { listRfqs } from "@/lib/services/rfq.service";

export async function GET() {
  const auth = await requireAdminSession();
  if (isAuthError(auth)) return auth;

  try {
    const rfqs = await listRfqs();

    return jsonOk(
      rfqs.map((rfq) => ({
        id: rfq.id,
        number: rfq.number,
        companyName: rfq.companyName,
        picName: rfq.picName,
        customerId: rfq.customerId,
        status: rfq.status,
        pdfUrl: rfq.pdfUrl,
        itemCount: Array.isArray(rfq.items) ? rfq.items.length : 0,
        submittedAt: rfq.submittedAt.toISOString(),
        createdAt: rfq.createdAt.toISOString(),
      })),
    );
  } catch (error) {
    console.error("[GET /api/admin/rfqs]", error);
    return jsonError("Gagal memuat daftar RFQ.", 500);
  }
}
