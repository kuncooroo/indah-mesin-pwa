export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const privacyPolicyMeta = {
  title: "Kebijakan Privasi",
  lastUpdated: "21 Juli 2026",
  intro:
    "IndustrialX Marketplace (“kami”) berkomitmen melindungi data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi saat Anda menggunakan aplikasi web kami.",
};

export const privacyPolicySections: PrivacySection[] = [
  {
    id: "data-collected",
    title: "1. Data yang Kami Kumpulkan",
    paragraphs: [
      "Kami dapat mengumpulkan informasi berikut saat Anda menggunakan layanan IndustrialX:",
    ],
    bullets: [
      "Data profil: nama, email, nomor telepon, tanggal lahir, dan jenis kelamin yang Anda isi di halaman Edit Profil.",
      "Data permintaan penawaran (RFQ): daftar produk favorit, jumlah, catatan, serta nomor RFQ yang dihasilkan.",
      "Data penggunaan: interaksi dengan katalog produk, halaman yang dikunjungi, dan preferensi favorit yang disimpan di perangkat Anda.",
      "Data komunikasi: pesan yang Anda kirim melalui WhatsApp atau formulir kontak terkait produk dan penawaran.",
    ],
  },
  {
    id: "usage",
    title: "2. Penggunaan Data",
    paragraphs: ["Informasi yang kami kumpulkan digunakan untuk:"],
    bullets: [
      "Memproses permintaan penawaran (RFQ) dan menyiapkan dokumen penawaran resmi.",
      "Menghubungkan Anda dengan tim sales dan technical support IndustrialX.",
      "Menyimpan daftar favorit dan preferensi pengguna di perangkat Anda.",
      "Meningkatkan pengalaman browsing produk, layanan, dan konten artikel.",
      "Mengirim informasi terkait pesanan, penawaran, atau pembaruan layanan yang relevan.",
    ],
  },
  {
    id: "storage",
    title: "3. Penyimpanan Data",
    paragraphs: [
      "Sebagian data disimpan secara lokal di browser/perangkat Anda (localStorage), seperti profil, favorit, dan preferensi aplikasi. Data RFQ yang telah dikirim disimpan di server kami beserta dokumen PDF terkait.",
      "Kami menyimpan data selama diperlukan untuk memenuhi tujuan layanan, kepatuhan hukum, atau penyelesaian sengketa. Anda dapat menghapus data lokal dengan membersihkan cache browser perangkat Anda.",
    ],
  },
  {
    id: "sharing",
    title: "4. Pembagian Data kepada Pihak Ketiga",
    paragraphs: [
      "Kami tidak menjual data pribadi Anda. Data dapat dibagikan hanya kepada:",
    ],
    bullets: [
      "Tim internal IndustrialX (sales, teknis, dan admin) untuk memproses RFQ dan penawaran.",
      "Penyedia layanan pendukung (hosting, penyimpanan dokumen) yang terikat perjanjian kerahasiaan.",
      "Pihak berwenang apabila diwajibkan oleh peraturan perundang-undangan yang berlaku.",
    ],
  },
  {
    id: "security",
    title: "5. Keamanan Data",
    paragraphs: [
      "Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk melindungi data dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah. Namun, tidak ada metode transmisi data melalui internet yang sepenuhnya aman.",
    ],
  },
  {
    id: "rights",
    title: "6. Hak Pengguna",
    paragraphs: ["Sebagai pengguna, Anda berhak untuk:"],
    bullets: [
      "Mengakses dan memperbarui data profil melalui halaman Edit Profil.",
      "Menghapus produk dari daftar favorit kapan saja.",
      "Meminta koreksi atau penghapusan data pribadi dengan menghubungi admin kami.",
      "Menarik persetujuan penggunaan data untuk keperluan komunikasi pemasaran.",
    ],
  },
  {
    id: "cookies",
    title: "7. Cookie & Penyimpanan Lokal",
    paragraphs: [
      "Aplikasi ini menggunakan penyimpanan lokal browser untuk menjaga sesi favorit, profil, dan preferensi UI. Cookie atau teknologi serupa dapat digunakan untuk autentikasi admin dan analitik dasar. Anda dapat mengatur browser untuk menolak cookie, namun beberapa fitur mungkin tidak berfungsi optimal.",
    ],
  },
  {
    id: "contact",
    title: "8. Hubungi Kami",
    paragraphs: [
      "Jika Anda memiliki pertanyaan terkait kebijakan privasi ini atau ingin mengajukan permintaan data, silakan hubungi kami melalui halaman Bantuan atau WhatsApp resmi IndustrialX.",
    ],
  },
];
