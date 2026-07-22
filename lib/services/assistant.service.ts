import { faqItems } from "@/lib/data/faq";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

const GREETING =
  "Halo! Saya Asisten IndustrialX. Tanyakan seputar produk mesin industri, cara RFQ, pemesanan, atau layanan kami.";

const FALLBACK =
  "Maaf, saya belum menemukan jawaban spesifik untuk pertanyaan Anda. Silakan hubungi tim kami lewat tab Hubungi Kami, atau coba tanyakan dengan kata kunci seperti RFQ, pemesanan, garansi, atau instalasi.";

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function scoreFaq(question: string, query: string): number {
  const q = normalize(question);
  const terms = normalize(query).split(" ").filter((term) => term.length > 2);
  if (!terms.length) return 0;

  return terms.reduce((score, term) => (q.includes(term) ? score + 1 : score), 0);
}

function findBestFaqAnswer(query: string): string | null {
  let bestScore = 0;
  let bestAnswer: string | null = null;

  for (const item of faqItems) {
    const questionScore = scoreFaq(item.question, query);
    const answerScore = scoreFaq(item.answer, query) * 0.6;
    const total = questionScore + answerScore;

    if (total > bestScore) {
      bestScore = total;
      bestAnswer = item.answer;
    }
  }

  return bestScore >= 1 ? bestAnswer : null;
}

function ruleBasedAnswer(query: string): string {
  const q = normalize(query);

  if (/^(halo|hai|hi|hello|selamat)/.test(q)) {
    return GREETING;
  }

  if (q.includes("rfq") || q.includes("penawaran") || q.includes("quotation")) {
    return "Untuk membuat RFQ: pilih produk → tambahkan ke keranjang RFQ → klik Buat RFQ → isi data perusahaan → Kirim RFQ. Tim kami akan meninjau dan mengirim penawaran harga.";
  }

  if (q.includes("favorit") || q.includes("wishlist")) {
    return "Gunakan ikon hati di detail produk untuk menyimpan ke Favorit. Daftar favorit bisa dilihat di menu Akun → Favorit.";
  }

  if (q.includes("produk") || q.includes("katalog") || q.includes("mesin")) {
    return "Anda bisa melihat katalog lengkap di menu Produk. Filter berdasarkan kategori untuk menemukan mesin yang sesuai kebutuhan pabrik Anda.";
  }

  if (q.includes("harga") || q.includes("budget")) {
    return "Harga produk bersifat indikatif. Untuk penawaran resmi, buat RFQ dengan spesifikasi dan estimasi kebutuhan — tim sales kami akan menghubungi Anda.";
  }

  if (q.includes("pengiriman") || q.includes("kirim") || q.includes("shipping")) {
    return "Estimasi pengiriman umumnya 7–21 hari kerja setelah konfirmasi PO, tergantung ketersediaan unit dan lokasi tujuan.";
  }

  if (q.includes("garansi") || q.includes("warranty")) {
    return "Seluruh mesin utama dilengkapi garansi resmi pabrik dan dukungan after-sales dari tim IndustrialX.";
  }

  if (q.includes("instalasi") || q.includes("training")) {
    return "Ya, paket instalasi, commissioning, dan training operator tersedia untuk unit retort dan mesin produksi skala menengah–besar.";
  }

  const faqAnswer = findBestFaqAnswer(query);
  if (faqAnswer) return faqAnswer;

  return FALLBACK;
}

export const assistantService = {
  getGreeting(): string {
    return GREETING;
  },

  async reply(messages: AssistantMessage[]): Promise<string> {
    const lastUser = [...messages].reverse().find((message) => message.role === "user");

    if (!lastUser?.content.trim()) {
      return "Silakan tulis pertanyaan Anda terlebih dahulu.";
    }

    return ruleBasedAnswer(lastUser.content);
  },
};
