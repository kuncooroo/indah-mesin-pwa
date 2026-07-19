import Link from "next/link";
import { Wrench } from "lucide-react";

import { waUrl } from "@/lib/whatsapp";

export function RfqSection() {
  return (
    <section className="relative mx-margin-mobile my-section-gap flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-primary p-8 text-white md:mx-margin-desktop">
      <div className="relative z-10">
        <h3 className="mb-2 text-headline-md">Butuh Spesifikasi Kustom?</h3>
        <p className="max-w-lg text-body-md text-on-primary-container opacity-90">
          Tim ahli kami siap membantu Anda merancang lini produksi yang paling
          efisien untuk bisnis Anda.
        </p>
      </div>
      <Link
        href={waUrl(
          "Halo IndustrialX, saya ingin konsultasi spesifikasi kustom untuk lini produksi.",
        )}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 inline-flex rounded-full bg-white px-8 py-3 font-bold text-primary transition-transform hover:scale-105 active:scale-95"
      >
        Konsultasi Teknis Gratis
      </Link>
      <Wrench className="absolute -right-4 -bottom-4 h-40 w-40 rotate-[-15deg] text-white opacity-10" />
    </section>
  );
}
