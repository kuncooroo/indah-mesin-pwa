import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import {
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/lib/data/privacy-policy";

export function PrivacyPolicySection() {
  return (
    <div className="pb-10">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <BackLink href="/akun" />
          <h1 className="text-[17px] font-bold text-primary">{privacyPolicyMeta.title}</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-5">
        <div className="mb-6 rounded-2xl border border-border-subtle bg-surface-container p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-primary">
              <ShieldCheck className="size-5" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[13px] leading-relaxed text-on-surface-variant">
                {privacyPolicyMeta.intro}
              </p>
              <p className="mt-2 text-[11px] font-medium text-on-surface-variant">
                Terakhir diperbarui: {privacyPolicyMeta.lastUpdated}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {privacyPolicySections.map((section) => (
            <section key={section.id}>
              <h2 className="mb-2 text-[14px] font-bold text-primary">{section.title}</h2>
              <div className="space-y-2">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[12px] leading-relaxed text-on-surface-variant"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-2 space-y-1.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-[12px] leading-relaxed text-on-surface-variant"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-on-surface-variant">
          Butuh bantuan lebih lanjut? Kunjungi{" "}
          <Link href="/bantuan" className="font-semibold text-primary">
            Bantuan &amp; FAQ
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
