import { redirect } from "next/navigation";

type LegacyRfqPageProps = {
  params: Promise<{ number: string }>;
};

export default async function LegacyRfqPage({ params }: LegacyRfqPageProps) {
  const { number } = await params;
  redirect(`/simpanan/rfq/${encodeURIComponent(number)}/sukses`);
}
