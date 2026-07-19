export type FaqCategory = "umum" | "akun" | "layanan" | "pemesanan";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "umum", label: "Umum" },
  { id: "akun", label: "Akun" },
  { id: "layanan", label: "Layanan" },
  { id: "pemesanan", label: "Pemesanan" },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-order",
    category: "pemesanan",
    question: "Bagaimana cara melakukan pemesanan mesin?",
    answer:
      "Pilih produk yang diinginkan, tambahkan ke purchase order, lalu lakukan konfirmasi pesanan. Tim kami akan meninjau detail kebutuhan Anda dan menghubungi untuk proses lanjutan.",
  },
  {
    id: "faq-consultation",
    category: "layanan",
    question: "Apakah tersedia konsultasi sebelum pembelian?",
    answer:
      "Ya, konsultasi teknis tersedia secara gratis. Anda dapat menghubungi admin melalui WhatsApp atau mengisi form di tab Hubungi Kami untuk penjadwalan.",
  },
  {
    id: "faq-shipping",
    category: "pemesanan",
    question: "Berapa lama estimasi pengiriman?",
    answer:
      "Estimasi pengiriman bervariasi tergantung ketersediaan unit dan lokasi tujuan, umumnya 7–21 hari kerja setelah konfirmasi PO.",
  },
  {
    id: "faq-custom",
    category: "layanan",
    question: "Apakah mesin bisa disesuaikan dengan kebutuhan pabrik?",
    answer:
      "Beberapa model mendukung kustomisasi kapasitas, sistem kontrol, dan konfigurasi line produksi. Tim engineer kami siap membantu analisis kebutuhan pabrik Anda.",
  },
  {
    id: "faq-payment",
    category: "pemesanan",
    question: "Bagaimana metode pembayaran yang tersedia?",
    answer:
      "Pembayaran dapat dilakukan melalui transfer bank, termin bertahap untuk unit besar, dan skema leasing untuk mitra terpilih.",
  },
  {
    id: "faq-installation",
    category: "layanan",
    question: "Apakah ada layanan instalasi dan training?",
    answer:
      "Ya, paket instalasi, commissioning, dan training operator tersedia untuk unit retort dan mesin produksi skala menengah–besar.",
  },
  {
    id: "faq-account",
    category: "akun",
    question: "Bagaimana cara mengubah data profil akun?",
    answer:
      "Buka halaman Profil Saya, ketuk ikon edit di kanan atas, lalu perbarui informasi yang diperlukan.",
  },
  {
    id: "faq-general",
    category: "umum",
    question: "Apakah produk dilengkapi garansi resmi?",
    answer:
      "Seluruh mesin utama dilengkapi garansi resmi pabrik dan dukungan after-sales dari tim IndustrialX.",
  },
];
