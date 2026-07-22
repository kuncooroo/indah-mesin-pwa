"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { FileDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AdminListToolbar,
  getRowNumber,
  useAdminListState,
} from "@/lib/admin/list-utils";
import { adminApi } from "@/lib/admin/api";
import { getRfqStatusLabel } from "@/lib/rfq-status";

type AdminRfq = {
  id: string;
  number: string;
  companyName: string | null;
  customerName: string | null;
  picName: string | null;
  status: string;
  city: string;
  province: string;
  phone: string;
  pdfUrl: string;
  items: unknown;
  submittedAt: string;
  createdAt: string;
};

export function RfqsManager() {
  const [rfqs, setRfqs] = useState<AdminRfq[]>([]);
  const [loading, setLoading] = useState(true);

  const getSearchText = useCallback((rfq: AdminRfq) => {
    const items = Array.isArray(rfq.items) ? rfq.items : [];
    return [
      rfq.number,
      rfq.companyName,
      rfq.customerName,
      rfq.picName,
      rfq.phone,
      rfq.city,
      rfq.province,
      getRfqStatusLabel(rfq.status),
      String(items.length),
    ]
      .filter(Boolean)
      .join(" ");
  }, []);

  const {
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    paginated,
    filtered,
    pageSize,
  } = useAdminListState(rfqs, getSearchText);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await adminApi.get<AdminRfq[]>("/api/admin/rfqs");
        setRfqs(data);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

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
          <CardTitle>Daftar RFQ ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Memuat...</p>
          ) : (
            <>
              <AdminListToolbar
                search={search}
                onSearchChange={setSearch}
                placeholder="Cari nomor RFQ, perusahaan, PIC..."
                page={page}
                totalPages={totalPages}
                totalItems={filtered.length}
                pageSize={pageSize}
                onPageChange={setPage}
              />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium w-10">No</th>
                      <th className="pb-3 pr-4 font-medium">Nomor RFQ</th>
                      <th className="pb-3 pr-4 font-medium">Perusahaan</th>
                      <th className="pb-3 pr-4 font-medium">PIC</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 pr-4 font-medium">Tanggal</th>
                      <th className="pb-3 pr-4 font-medium">Item</th>
                      <th className="pb-3 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((rfq, index) => {
                      const items = Array.isArray(rfq.items) ? rfq.items : [];
                      const companyName =
                        rfq.companyName?.trim() ||
                        rfq.customerName?.trim() ||
                        "Perusahaan";
                      const picName =
                        rfq.picName?.trim() ||
                        rfq.customerName?.trim() ||
                        "PIC";

                      return (
                        <tr key={rfq.id} className="border-b last:border-0">
                          <td className="py-3 pr-4 text-muted-foreground">
                            {getRowNumber(page, index, pageSize)}
                          </td>
                          <td className="py-3 pr-4 font-medium text-primary">
                            {rfq.number}
                          </td>
                          <td className="py-3 pr-4">{companyName}</td>
                          <td className="py-3 pr-4">{picName}</td>
                          <td className="py-3 pr-4">
                            {getRfqStatusLabel(rfq.status)}
                          </td>
                          <td className="py-3 pr-4">
                            {format(
                              new Date(rfq.submittedAt ?? rfq.createdAt),
                              "dd MMM yyyy",
                              { locale: localeId },
                            )}
                          </td>
                          <td className="py-3 pr-4">{items.length}</td>
                          <td className="py-3">
                            <a
                              href={rfq.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-7 items-center gap-1 rounded-lg border border-border bg-background px-2.5 text-[0.8rem] font-medium hover:bg-muted"
                            >
                              <FileDown className="size-3.5" />
                              PDF
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!paginated.length ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    {filtered.length
                      ? "RFQ tidak ditemukan."
                      : "Belum ada permintaan penawaran."}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
