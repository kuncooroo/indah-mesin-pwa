"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Check, CheckCircle2, Download, FileText, Heart, MessageCircle, Share2, ShoppingCart, Star } from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { ProductThumb } from "@/components/shared/product-thumb";
import { useFavoriteState } from "@/components/shared/favorite-button";
import { getProductDownloads } from "@/lib/data/product-downloads";
import type { ProductTestimonial } from "@/lib/data/product-testimonials";
import { favoriteProductId } from "@/lib/favorites-store";
import {
  addToRfqCart,
  setSingleProductRfq,
} from "@/lib/rfq-cart-store";
import type { Product } from "@/lib/types";
import { productOrderMessage, waUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const detailTabs = ["Deskripsi", "Spesifikasi"] as const;
type DetailTab = (typeof detailTabs)[number];

type ProductDetailViewProps = {
  product: Product;
  reviews?: ProductTestimonial[];
};

export function ProductDetailView({
  product,
  reviews = [],
}: ProductDetailViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DetailTab>("Deskripsi");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [cartToast, setCartToast] = useState(false);

  const productId = favoriteProductId(product.slug, product.name);
  const minOrder = product.minOrder ?? 1;

  const title = product.name;
  const headerTitle = product.categoryLabel;
  const priceRangeLabel = product.priceLabel.replace(/\+$/, "").concat(" – Hubungi Kami");
  const rating = product.rating ?? 0;
  const reviewCount = reviews.length;
  const soldLabel = product.soldLabel ?? "Baru";

  const { active: favorited, toggle: toggleFavorite } = useFavoriteState(
    product.slug,
    product.name,
  );

  const galleryItems = useMemo(() => {
    if (product.gallery?.length) {
      return product.gallery;
    }

    return Array.from({ length: 4 }, (_, index) => ({
      src: product.image,
      alt: `${product.name} ${index + 1}`,
    }));
  }, [product.gallery, product.image, product.name]);

  const downloads = useMemo(
    () => getProductDownloads(product.slug, product.downloads),
    [product.slug, product.downloads],
  );

  const testimonials = reviews;

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/produk/${product.slug}`
      : `/produk/${product.slug}`;

  const waHref = waUrl(
    productOrderMessage({
      name: title,
      sku: product.sku,
      productUrl,
    }),
  );

  async function handleShare() {
    const shareData = {
      title,
      text: `Lihat produk ${title} di IndustrialX`,
      url: productUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed — fall through to copy.
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(productUrl);
      setShareMessage("Link produk disalin");
      window.setTimeout(() => setShareMessage(null), 2000);
    }
  }

  function productInput() {
    return {
      id: productId,
      slug: product.slug,
      name: product.name,
      priceLabel: priceRangeLabel,
      image: product.image,
      description: product.description,
      statusLabel: product.statusLabel,
      categoryLabel: product.categoryLabel,
    };
  }

  function handleAddToCart() {
    addToRfqCart(productInput());
    setCartToast(true);
  }

  function handleBuatRfq() {
    setSingleProductRfq(productInput());
    router.push("/simpanan/rfq/permintaan");
  }

  const descriptionText = product.description;
  const featureList = product.features ?? [];
  const specifications = product.specifications ?? [];

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white px-4 py-3">
        <div className="flex items-center justify-between px-4 py-3">
          <BackLink href="/produk" />
          <h1 className="text-[17px] font-bold text-primary">{headerTitle}</h1>
          <span className="size-9 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <main className="px-4 pt-4 pb-4">
        <section className="space-y-3">
          <div className="relative overflow-hidden rounded-3xl">
            <ProductThumb className="aspect-[4/3] w-full" iconClassName="size-20" />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                type="button"
                aria-label="Bagikan produk"
                onClick={handleShare}
                className="flex size-9 items-center justify-center rounded-full bg-white/95 text-primary shadow-md"
              >
                <Share2 className="size-[18px]" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                aria-label="Simpan ke favorit"
                onClick={() =>
                  toggleFavorite({
                    slug: product.slug,
                    name: product.name,
                    priceLabel: priceRangeLabel,
                    image: product.image,
                    description: product.description,
                    statusLabel: product.statusLabel,
                    categoryLabel: product.categoryLabel,
                  })
                }
                className="flex size-9 items-center justify-center rounded-full bg-white/95 text-primary shadow-md"
              >
                <Heart
                  className={cn("size-[18px]", favorited && "fill-primary")}
                  strokeWidth={2.2}
                />
              </button>
            </div>
            {shareMessage ? (
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">
                {shareMessage}
              </span>
            ) : null}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {galleryItems.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                aria-label={`Lihat gambar ${index + 1}`}
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  "overflow-hidden rounded-xl border-2 transition-colors",
                  index === activeImageIndex
                    ? "border-primary"
                    : "border-border-subtle",
                )}
              >
                <ProductThumb className="aspect-square w-full" iconClassName="size-8" />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 space-y-4">
          <div>
            <h2 className="text-[20px] leading-snug font-bold text-primary">{title}</h2>
            <p className="mt-2 text-[13px] font-semibold text-primary">Hubungi Kami</p>
            <p className="mt-1 text-[11px] text-on-surface-variant">
              {priceRangeLabel}
            </p>
            {product.priceNote ? (
              <p className="mt-1 text-[11px] text-on-surface-variant">{product.priceNote}</p>
            ) : null}
            <p className="mt-2 text-[12px] text-on-surface-variant">
              Minimum Order: <span className="font-semibold text-primary">{minOrder} Unit</span>
            </p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-primary">Ulasan & Rating</p>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">
                  {reviewCount} ulasan · {soldLabel}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        "size-4",
                        index < Math.floor(rating)
                          ? "fill-primary text-primary"
                          : "fill-[#e2e8f0] text-[#e2e8f0]",
                      )}
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-[14px] font-bold text-primary">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border-subtle pt-2">
            <div className="flex border-b border-border-subtle">
              {detailTabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "relative flex-1 py-3 text-[13px] font-medium transition-colors",
                      isActive ? "font-bold text-primary" : "text-on-surface-variant",
                    )}
                  >
                    {tab}
                    {isActive ? (
                      <span className="absolute right-4 bottom-0 left-4 h-0.5 rounded-full bg-primary" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="py-4">
              {activeTab === "Deskripsi" ? (
                <div className="space-y-4">
                  <p className="text-[13px] leading-relaxed text-on-surface-variant">
                    {descriptionText}
                  </p>
                  {featureList.length ? (
                    <div>
                      <h4 className="mb-2 text-[13px] font-bold text-primary">
                        Fitur Layanan:
                      </h4>
                      <ul className="space-y-2">
                        {featureList.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-[12px] leading-relaxed text-on-surface-variant"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-[#16a34a]"
                              strokeWidth={2.5}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {activeTab === "Spesifikasi" ? (
                specifications.length ? (
                  <div className="overflow-hidden rounded-2xl border border-border-subtle">
                    {specifications.map((spec, index) => (
                      <div
                        key={spec.attribute}
                        className={cn(
                          "grid grid-cols-2 gap-3 px-4 py-3 text-[12px] bg-white",
                          index > 0 && "border-t border-border-subtle",
                        )}
                      >
                        <span className="font-semibold text-on-surface-variant">
                          {spec.attribute}
                        </span>
                        <span className="font-medium text-primary">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-on-surface-variant">
                    Spesifikasi teknis akan segera tersedia.
                  </p>
                )
              ) : null}
            </div>
          </div>

          {downloads.length ? (
            <div className="space-y-3 border-t border-border-subtle pt-4">
              <h3 className="text-[14px] font-bold text-primary">Download Dokumen</h3>
              <div className="space-y-2">
                {downloads.map((download) => (
                  <a
                    key={download.href}
                    href={download.href}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white p-3 shadow-sm transition-colors hover:bg-[#f8fafc]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-primary">
                      <FileText className="size-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-primary">
                        {download.title}
                      </p>
                      <p className="text-[11px] text-on-surface-variant">
                        {download.subtitle}
                      </p>
                    </div>
                    <Download className="size-4 shrink-0 text-primary" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {testimonials.length ? (
            <div className="space-y-3 border-t border-border-subtle pt-4">
              <h3 className="text-[14px] font-bold text-primary">
                Testimoni Pembeli
              </h3>
              <div className="space-y-3">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <div className="size-12 shrink-0 overflow-hidden rounded-full bg-[#eff6ff]">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[13px] font-bold text-primary">
                              {testimonial.name}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">
                              {testimonial.company}
                            </p>
                          </div>
                          <span className="text-[10px] text-on-surface-variant">
                            {testimonial.dateLabel}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={cn(
                                "size-3.5",
                                index < testimonial.rating
                                  ? "fill-primary text-primary"
                                  : "fill-[#e2e8f0] text-[#e2e8f0]",
                              )}
                              strokeWidth={0}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-[12px] leading-relaxed text-on-surface-variant">
                      {testimonial.review}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat admin"
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-white text-primary transition-colors hover:border-primary/30 hover:bg-surface-container"
            >
              <MessageCircle className="size-[22px]" strokeWidth={1.8} />
            </a>
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label="Tambah ke keranjang RFQ"
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-white text-primary transition-colors hover:border-primary/30 hover:bg-surface-container"
            >
              <ShoppingCart className="size-[22px]" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={handleBuatRfq}
              className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-5 text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(0,35,111,0.28)] transition-colors hover:bg-primary-container"
            >
              <FileText className="size-[18px] shrink-0" strokeWidth={2} />
              Buat RFQ
            </button>
          </div>
        </section>
      </main>

      {cartToast ? (
        <div className="fixed inset-x-0 bottom-24 z-50 mx-auto w-full max-w-[480px] px-4">
          <div className="rounded-2xl border border-border-subtle bg-white p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#059669]" strokeWidth={2.2} />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-primary">
                  Produk ditambahkan ke keranjang RFQ
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href="/simpanan"
                    onClick={() => setCartToast(false)}
                    className="inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-primary text-[12px] font-semibold text-white"
                  >
                    Lihat Keranjang
                  </Link>
                  <button
                    type="button"
                    onClick={() => setCartToast(false)}
                    className="inline-flex h-9 flex-1 items-center justify-center rounded-xl border border-border-subtle text-[12px] font-semibold text-primary"
                  >
                    Lanjut Belanja
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
