"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  ChevronDown,
  CircleHelp,
  Mail,
  Phone,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { BackLink } from "@/components/shared/back-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { AiAssistantPanel } from "@/components/sections/help/ai-assistant-panel";
import {
  faqCategories,
  type FaqCategory,
  type FaqItem,
} from "@/lib/data/faq";
import { whatsappContactHref } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

type HelpTab = "assistant" | "faq" | "contact";

type HelpFaqSectionProps = {
  faqs: FaqItem[];
};

export function HelpFaqSection({ faqs }: HelpFaqSectionProps) {
  const [activeTab, setActiveTab] = useState<HelpTab>("assistant");
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("umum");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string>(faqs[0]?.id ?? "");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const filteredFaqs = useMemo(() => {
    let list = faqs.filter((item) => item.category === activeCategory);

    if (searchQuery.trim()) {
      const term = searchQuery.trim().toLowerCase();
      list = faqs.filter(
        (item) =>
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term),
      );
    }

    return list;
  }, [faqs, activeCategory, searchQuery]);

  const activeCategoryLabel =
    faqCategories.find((category) => category.id === activeCategory)?.label ??
    "Umum";

  useEffect(() => {
    if (!showCategoryFilter) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showCategoryFilter]);

  function toggleFaq(id: string) {
    setOpenFaqId((current) => (current === id ? "" : id));
  }

  function handleSelectCategory(category: FaqCategory) {
    setActiveCategory(category);
    setShowCategoryFilter(false);
  }

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <BackLink href="/akun" />
          <h1 className="text-[17px] font-bold text-primary">Bantuan & FAQ</h1>
          <button
            type="button"
            aria-label="Cari"
            className="flex size-9 items-center justify-center rounded-full text-primary"
          >
            <Search className="size-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <main className="px-4 pt-5">
        <p className="mb-5 text-center text-[14px] font-medium text-on-surface">
          Ada yang bisa kami bantu?
        </p>

        <div className="mb-5 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("assistant")}
            className={cn(
              "flex h-11 items-center justify-center gap-1.5 rounded-2xl text-[12px] font-semibold transition-colors",
              activeTab === "assistant"
                ? "bg-primary text-white"
                : "border-2 border-primary bg-white text-primary",
            )}
          >
            <Bot className="size-4" strokeWidth={2.2} />
            Asisten AI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faq")}
            className={cn(
              "h-11 rounded-2xl text-[12px] font-semibold transition-colors",
              activeTab === "faq"
                ? "bg-primary text-white"
                : "border-2 border-primary bg-white text-primary",
            )}
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={cn(
              "h-11 rounded-2xl text-[12px] font-semibold transition-colors",
              activeTab === "contact"
                ? "bg-primary text-white"
                : "border-2 border-primary bg-white text-primary",
            )}
          >
            Hubungi
          </button>
        </div>

        {activeTab === "assistant" ? (
          <AiAssistantPanel />
        ) : activeTab === "faq" ? (
          <>
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Cari pertanyaan..."
                  className="h-11 w-full rounded-xl border border-border-subtle bg-white pr-3 pl-9 text-[12px] outline-none placeholder:text-on-surface-variant/70"
                />
              </div>
              <button
                type="button"
                aria-label="Filter kategori FAQ"
                aria-expanded={showCategoryFilter}
                onClick={() => setShowCategoryFilter(true)}
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#bfdbfe] bg-[#eff6ff] text-primary"
              >
                <SlidersHorizontal className="size-4" strokeWidth={2.2} />
              </button>
            </div>

            <p className="mb-4 text-[12px] text-on-surface-variant">
              Kategori:{" "}
              <span className="font-semibold text-primary">{activeCategoryLabel}</span>
            </p>

            <div className="space-y-3">
              {filteredFaqs.map((item) => {
                const isOpen = openFaqId === item.id;

                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      className="flex w-full items-start gap-3 px-4 py-4 text-left"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-primary">
                        <CircleHelp className="size-4" strokeWidth={2.2} />
                      </span>
                      <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-primary">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-0.5 size-4 shrink-0 text-primary transition-transform",
                          isOpen && "rotate-180",
                        )}
                        strokeWidth={2.2}
                      />
                    </button>
                    {isOpen ? (
                      <div className="border-t border-border-subtle px-4 py-3 pl-[60px]">
                        <p className="text-[12px] leading-relaxed text-on-surface-variant">
                          {item.answer}
                        </p>
                      </div>
                    ) : null}
                  </article>
                );
              })}

              {!filteredFaqs.length ? (
                <div className="py-12 text-center text-[13px] text-on-surface-variant">
                  Pertanyaan tidak ditemukan.
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-[14px] font-bold text-primary">
                Hubungi Tim Kami
              </h2>
              <p className="mb-4 text-[12px] leading-relaxed text-on-surface-variant">
                Tim sales dan technical support siap membantu kebutuhan mesin
                industri Anda.
              </p>
              <WhatsAppButton
                href={whatsappContactHref}
                label="CHAT VIA WHATSAPP"
                size="lg"
              />
            </div>

            <div className="space-y-3">
              <a
                href="tel:+62215558900"
                className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white p-4 shadow-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-[#eff6ff] text-primary">
                  <Phone className="size-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[11px] text-on-surface-variant">Telepon</p>
                  <p className="text-[13px] font-semibold text-primary">
                    +62 21 555 8900
                  </p>
                </div>
              </a>

              <a
                href="mailto:sales@indux.com"
                className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white p-4 shadow-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-[#eff6ff] text-primary">
                  <Mail className="size-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[11px] text-on-surface-variant">Email</p>
                  <p className="text-[13px] font-semibold text-primary">
                    sales@indux.com
                  </p>
                </div>
              </a>
            </div>

            <p className="text-center text-[12px] text-on-surface-variant">
              Atau kunjungi{" "}
              <Link href="/produk" className="font-semibold text-primary">
                katalog produk
              </Link>{" "}
              untuk melihat mesin yang tersedia.
            </p>
          </div>
        )}
      </main>

      {showCategoryFilter ? (
        <div className="fixed inset-0 z-[60] mx-auto flex w-full max-w-[480px] items-end bg-black/40">
          <div className="w-full rounded-t-3xl bg-white px-4 pt-4 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-primary">Filter Kategori</h2>
              <button
                type="button"
                aria-label="Tutup filter"
                onClick={() => setShowCategoryFilter(false)}
                className="flex size-9 items-center justify-center rounded-full bg-[#f1f5f9] text-primary"
              >
                <X className="size-4" strokeWidth={2.2} />
              </button>
            </div>
            <div className="space-y-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelectCategory(category.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[13px] font-semibold transition-colors",
                    activeCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-[#f8fafc] text-primary hover:bg-[#eff6ff]",
                  )}
                >
                  {category.label}
                  {activeCategory === category.id ? (
                    <span className="text-[11px] font-medium opacity-90">Aktif</span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
