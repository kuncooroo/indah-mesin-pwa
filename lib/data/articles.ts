export type ArticleCategory =
  | "artikel"
  | "tips-mesin"
  | "teknologi"
  | "event";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  categoryLabel: string;
  date: string;
  image: string;
  featured?: boolean;
};

export const articleCategories = [
  { id: "all", label: "Semua" },
  { id: "artikel", label: "Artikel" },
  { id: "tips-mesin", label: "Tips Mesin" },
  { id: "teknologi", label: "Teknologi" },
  { id: "event", label: "Event" },
] as const;

const retortImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATo9OiVElbXKff7x40hmph9vONdRV6AGfrMN3Mb3Ju3Cq3DvETTRvmYOzLpOhmLfEG9C_sqxjZH4dnVNbcnnxVOhN-guDUElL0HS6ycfeeRcRKGt0umRNiSf-712ViaLkwTS8L2tRjpWM1RCzEKCRrYkfrj3ea6aJjip3m9dNJ0yTkvDYdL4huGO-2JpuToXHUrWcF2qRHjs0mXBCU_C1YT4ZWLqQwQEj9wLEgMjGBXXRSubKUovCaZySiAHB3ilPNCpbAHE5QW2vz";

const panelImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBPTL75Kk7OPWILwRRafFV6eDx7tYlnbodu0azMhLjY_zYfGH27HKPT80SoFbgGtNPdWfYBuNzvCrvF3RQkixyQBdzXvBKd9OY8kY3_oqhEgw1-vBRHWicQIxiteDga6LCzhzuPw5MXa03gbn9ITO0DpKqOmGFOOp_ZOhPxE3oZq3-tTGRx3EZW04W5z_b9FoZD5JnlRP0-0TmiOy56lC0Y44bkoOlhiGFCdaCy35KDACIaneSmDzxbDCxCJRBAP-l5MEOOBUfbQuOr";

const pumpImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQPmVVxQ_LrTuB2zoeD13D3VZ8EoGs5AGfimiuWfsLzQ0q0nTLVEN60ncAPL-pIfIzm6jqVoh71NRucvlY31zblNZlpJr_fcIOuvePPP6qhYj_BFR_1idG-vJZy8aMEJXw_SZyRr1bC6sZYU0S97hZjycFCQ4j6jQ70pBYD5i1tS-tamsBe_mKS6z3kk1THW0PJtJsys3M0mvViQxtUOK5NLcJ0qzunCFuq1t2052Ms-Xqpn9h4mc5g_Km_iIkNT5RK_x-wsPVm2Ae";

export const articles: Article[] = [
  {
    slug: "tren-sterilisasi-modern-industri-pangan",
    title: "Tren Sterilisasi Modern untuk Industri Pangan",
    excerpt:
      "Teknologi retort terbaru membantu UMKM naik kelas dengan efisiensi energi hingga 30% dan standar keamanan pangan yang lebih ketat.",
    content:
      "Industri pangan Indonesia semakin adopt teknologi sterilisasi modern. Sistem retort water immersion dan steam retort menjadi pilihan utama karena distribusi panas merata dan konsumsi energi lebih efisien.",
    category: "teknologi",
    categoryLabel: "Teknologi",
    date: "18 Jul 2026",
    image: retortImage,
    featured: true,
  },
  {
    slug: "cara-memilih-retort-produksi",
    title: "Cara Memilih Retort yang Tepat untuk Produksi",
    excerpt:
      "Panduan lengkap memilih kapasitas, tipe retort, dan sistem kontrol yang sesuai kebutuhan pabrik Anda.",
    content:
      "Memilih retort yang tepat bergantung pada volume produksi, jenis kemasan, dan budget. Pertimbangkan kapasitas batch, tekanan kerja, dan dukungan after-sales sebelum investasi.",
    category: "artikel",
    categoryLabel: "Artikel",
    date: "15 Jul 2026",
    image: retortImage,
  },
  {
    slug: "perawatan-control-panel-retort",
    title: "Perawatan Control Panel agar Mesin Lebih Awet",
    excerpt:
      "Tips rutin maintenance panel kontrol retort untuk mencegah downtime dan memperpanjang usia operasional mesin.",
    content:
      "Control panel retort perlu pengecekan berkala pada sensor suhu, tekanan, dan koneksi kabel. Kalibrasi rutin dan backup data profil sterilisasi sangat direkomendasikan.",
    category: "tips-mesin",
    categoryLabel: "Tips Mesin",
    date: "12 Jul 2026",
    image: panelImage,
  },
  {
    slug: "efisiensi-pompa-sirkulasi-produksi",
    title: "Efisiensi Produksi dengan Pompa Sirkulasi Berkualitas",
    excerpt:
      "Pompa sirkulasi yang tepat dapat meningkatkan efisiensi siklus sterilisasi dan mengurangi biaya operasional.",
    content:
      "Pompa sirkulasi air panas berperan krusial dalam distribusi panas merata di chamber retort. Pilih material food-grade dan kapasitas flow yang sesuai desain sistem.",
    category: "teknologi",
    categoryLabel: "Teknologi",
    date: "10 Jul 2026",
    image: pumpImage,
  },
  {
    slug: "event-expo-mesin-pangan-2026",
    title: "IndustrialX Hadir di Expo Mesin Pangan 2026",
    excerpt:
      "Kunjungi booth kami untuk demo live retort sterilizer dan konsultasi gratis dengan engineer kami.",
    content:
      "IndustrialX akan memamerkan lini retort terbaru di Expo Mesin Pangan 2026. Dapatkan penawaran khusus dan konsultasi teknis gratis selama event berlangsung.",
    category: "event",
    categoryLabel: "Event",
    date: "8 Jul 2026",
    image: retortImage,
  },
];

export function getFeaturedArticle(): Article | undefined {
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getArticlesByCategory(categoryId: string): Article[] {
  if (categoryId === "all") {
    return articles.filter((article) => !article.featured);
  }

  return articles.filter(
    (article) => !article.featured && article.category === categoryId,
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
