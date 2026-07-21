import { notFound } from "next/navigation";

import { RfqSuccessView } from "@/components/sections/favorites/rfq-success-view";
import { getRfqByNumber } from "@/lib/services/rfq.service";

type RfqSuccessPageProps = {
  params: Promise<{ number: string }>;
};

export default async function RfqSuccessPage({ params }: RfqSuccessPageProps) {
  const { number } = await params;
  const decodedNumber = decodeURIComponent(number);
  const rfq = await getRfqByNumber(decodedNumber);

  if (!rfq) {
    notFound();
  }

  return (
    <div className="page-rise">
      <RfqSuccessView
        number={rfq.number}
        pdfUrl={rfq.pdfUrl}
        customerName={rfq.customerName}
      />
    </div>
  );
}
