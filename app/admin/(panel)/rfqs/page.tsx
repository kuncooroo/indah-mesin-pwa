import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { FileDown } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listRfqs } from "@/lib/services/rfq.service";

export default async function AdminRfqsPage() {
  const rfqs = await listRfqs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">
          Permintaan Penawaran (RFQ)
        </h1>
        <p className="text-sm text-muted-foreground">
          Daftar permintaan penawaran dari pengguna PWA.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">RFQ Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!rfqs.length ? (
            <p className="text-sm text-muted-foreground">
              Belum ada permintaan penawaran.
            </p>
          ) : (
            rfqs.map((rfq) => {
              const items = Array.isArray(rfq.items) ? rfq.items : [];

              return (
                <article
                  key={rfq.id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-primary">{rfq.number}</p>
                      <p className="text-sm text-muted-foreground">
                        {rfq.customerName}
                        {rfq.customerId ? ` · ID ${rfq.customerId}` : ""}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {format(new Date(rfq.createdAt), "dd MMM yyyy HH:mm", {
                          locale: localeId,
                        })}{" "}
                        · {items.length} produk · {rfq.status}
                      </p>
                    </div>
                    <a
                      href={rfq.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      <FileDown className="size-4" />
                      PDF
                    </a>
                  </div>
                </article>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
