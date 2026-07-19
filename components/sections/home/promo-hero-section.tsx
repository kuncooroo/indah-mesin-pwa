"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const promoSlides = [
  {
    id: "promo-1",
    badge: "Promo Batch #1",
    title: "Solusi Sterilisasi Food Processing",
    subtitle: "Diskon 10% untuk Unit Pertama.",
    href: "/produk?kategori=food-processing",
    cta: "Lihat Produk",
    image: "/assets/retort-horizontal.jpg",
  },
  {
    id: "promo-2",
    badge: "Ready Stock",
    title: "Retort Vertical Industri",
    subtitle: "Unit tersedia untuk pengiriman cepat.",
    href: "/produk",
    cta: "Lihat Produk",
    image: "/assets/retort-vertical.jpg",
  },
  {
    id: "promo-3",
    badge: "New Arrival",
    title: "Solusi Produksi Skala Pabrik",
    subtitle: "Konsultasi teknis dan instalasi engineer.",
    href: "/produk",
    cta: "Lihat Produk",
    image: "/assets/workshop.jpg",
  },
];

export function PromoHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  function goToSlide(index: number) {
    setActiveIndex(Math.max(0, Math.min(index, promoSlides.length - 1)));
  }

  function goToPrevious() {
    setActiveIndex(
      (current) => (current - 1 + promoSlides.length) % promoSlides.length,
    );
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % promoSlides.length);
  }

  function handleTouchStart(clientX: number) {
    setTouchStartX(clientX);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStartX === null) return;

    const delta = touchStartX - clientX;
    if (delta > 48) goToNext();
    if (delta < -48) goToPrevious();
    setTouchStartX(null);
  }

  return (
    <section className="px-4 pb-2">
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
        onTouchEnd={(event) =>
          handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)
        }
      >
        <button
          type="button"
          aria-label="Slide sebelumnya"
          onClick={goToPrevious}
          className="absolute top-1/2 left-2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-primary/80 shadow-none backdrop-blur-[2px] transition-colors hover:bg-white/55 hover:text-primary"
        >
          <span className="text-[22px] leading-none font-bold">&lt;</span>
        </button>

        <button
          type="button"
          aria-label="Slide berikutnya"
          onClick={goToNext}
          className="absolute top-1/2 right-2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-primary/80 shadow-none backdrop-blur-[2px] transition-colors hover:bg-white/55 hover:text-primary"
        >
          <span className="text-[22px] leading-none font-bold">&gt;</span>
        </button>

        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >          {promoSlides.map((slide) => (
            <article key={slide.id} className="relative min-w-full">
              <div className="relative h-[148px] overflow-hidden bg-primary">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover object-right opacity-25"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/55" />

                <div className="relative flex h-full flex-col justify-center px-4 py-3">
                  <p className="text-[9px] font-semibold tracking-[0.12em] text-white/80 uppercase">
                    {slide.badge}
                  </p>
                  <h2 className="mt-1 max-w-[210px] text-[15px] leading-[1.2] font-bold text-white">
                    {slide.title}
                  </h2>
                  <p className="mt-1 max-w-[220px] text-[11px] leading-snug text-white/85">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.href}
                    className="mt-3 inline-flex h-8 w-fit items-center gap-1.5 rounded-full bg-white px-3.5 text-[11px] font-semibold text-primary"
                  >
                    {slide.cta}
                    <ArrowRight className="size-3.5" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {promoSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Promo ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === activeIndex
                ? "w-5 bg-primary"
                : "w-1.5 bg-border-subtle",
            )}
          />
        ))}
      </div>
    </section>
  );
}
