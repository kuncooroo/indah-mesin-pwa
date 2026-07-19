import Image from "next/image";
import { Clock, Factory, Mail, MapPin, Phone, Wrench } from "lucide-react";

import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import {
  contactHero,
  contactMethods,
  locations,
  mapImage,
  showroomHours,
  supportTags,
  whatsappContactHref,
} from "@/lib/data/contact";

const contactIcons = {
  Phone,
  Mail,
};

export function ContactHeroSection() {
  return (
    <section className="relative h-64 overflow-hidden md:h-[400px]">
      <Image
        src={contactHero.image}
        alt={contactHero.title}
        fill
        priority
        sizes="(max-width: 520px) 100vw, 480px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
      <div className="absolute bottom-0 left-0 z-20 p-margin-mobile text-white md:p-margin-desktop">
        <h2 className="mb-2 text-headline-lg md:text-5xl">{contactHero.title}</h2>
        <p className="max-w-2xl text-body-lg opacity-90">{contactHero.description}</p>
      </div>
    </section>
  );
}

export function ContactContentSection() {
  return (
    <div className="grid grid-cols-1 gap-gutter px-margin-mobile py-section-gap md:px-margin-desktop">
      <div className="space-y-8">
        <div className="rounded-xl border border-border-subtle bg-white p-6 whatsapp-shadow">
          <h3 className="mb-4 flex items-center gap-2 text-headline-md text-primary">
            <Phone className="h-5 w-5" />
            Instant Assistance
          </h3>
          <p className="mb-6 text-body-md text-on-surface-variant">
            Connect with our sales department immediately for pricing, stock
            availability, and technical specs.
          </p>
          <WhatsAppButton href={whatsappContactHref} label="Chat via WhatsApp" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {contactMethods.map((method) => {
            const Icon = contactIcons[method.icon as keyof typeof contactIcons];

            return (
              <a
                key={method.label}
                href={method.href}
                className="rounded-lg border border-border-subtle bg-surface-container p-4 transition-colors hover:bg-surface-container-high"
              >
                <Icon className="mb-2 h-5 w-5 text-primary" />
                <div className="font-label-technical text-[10px] uppercase text-primary">
                  {method.label}
                </div>
                <div className="text-headline-md">{method.value}</div>
              </a>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-xl border border-border-subtle bg-white">
          <div className="flex items-center gap-2 bg-primary p-4 text-white">
            <Clock className="h-5 w-5" />
            <span className="text-headline-md">Showroom Schedule</span>
          </div>
          <table className="w-full text-left">
            <tbody className="divide-y divide-border-subtle">
              {showroomHours.map((row) => (
                <tr
                  key={row.day}
                  className={row.closed ? "bg-white" : "bg-metallic-bg"}
                >
                  <td className="px-6 py-3 text-body-md text-on-surface">
                    {row.day}
                  </td>
                  <td
                    className={`px-6 py-3 text-right font-label-technical ${
                      row.closed ? "text-error" : "text-primary"
                    }`}
                  >
                    {row.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-gutter">
          {locations.map((location) => {
            const Icon = location.icon === "Factory" ? Factory : MapPin;

            return (
              <div key={location.title} className="space-y-2">
                <h4 className="flex items-center gap-2 text-headline-md text-primary">
                  <Icon className="h-5 w-5 fill-primary text-primary" />
                  {location.title}
                </h4>
                <p className="text-body-md text-on-surface-variant">
                  {location.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>

        <div className="group relative aspect-video overflow-hidden rounded-xl border border-border-subtle bg-surface-container md:aspect-auto md:h-[400px]">
          <Image
            src={mapImage}
            alt="Showroom location map"
            fill
            sizes="(max-width: 520px) 100vw, 480px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-md border border-border-subtle bg-white p-2 shadow-md">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-body-sm font-semibold">Get Directions</span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-12 w-12 animate-bounce text-primary drop-shadow-xl" />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-1 text-[10px] font-bold tracking-wider whitespace-nowrap text-white uppercase">
              Showroom Location
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border-subtle bg-surface-container p-6">
          <div className="flex flex-col items-start gap-6">
            <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-primary-container">
              <Wrench className="h-16 w-16 text-on-primary-container" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 text-headline-md text-primary">
                After-Sales & Tech Support
              </h3>
              <p className="mb-4 text-body-md text-on-surface-variant">
                Our dedicated service team offers 24/7 technical consultation,
                preventive maintenance, and genuine spare parts sourcing to
                ensure your production never stops.
              </p>
              <div className="flex flex-wrap gap-2">
                {supportTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-subtle bg-white px-3 py-1 font-label-technical text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
