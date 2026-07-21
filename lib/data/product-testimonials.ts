export type ProductTestimonial = {
  id: string;
  name: string;
  company: string;
  rating: number;
  image: string;
  review: string;
  dateLabel: string;
};

const defaultTestimonials: ProductTestimonial[] = [
  {
    id: "testi-1",
    name: "Budi Santoso",
    company: "PT Nusantara Food",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    review:
      "Retort RH-1200 sangat stabil untuk produksi kaleng kami. Proses sterilisasi konsisten dan tim after-sales responsif saat commissioning.",
    dateLabel: "Jan 2026",
  },
  {
    id: "testi-2",
    name: "Siti Rahmawati",
    company: "CV Maju Pangan",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    review:
      "Control panel mudah dioperasikan operator. Training dari tim IndustrialX membantu kami menjalankan batch produksi lebih cepat.",
    dateLabel: "Des 2025",
  },
  {
    id: "testi-3",
    name: "Hendra Wijaya",
    company: "PT Indo Steril",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    review:
      "Mesin berkualitas industri dengan dokumentasi SOP lengkap. Proses RFQ dan penawaran juga jelas untuk kebutuhan B2B.",
    dateLabel: "Nov 2025",
  },
];

export function getProductTestimonials(slug: string): ProductTestimonial[] {
  if (slug === "industrial-retort-sterilizer") {
    return defaultTestimonials;
  }

  return defaultTestimonials.slice(0, 2);
}
