export type FavoriteItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceLabel: string;
  image: string;
};

const retortImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATo9OiVElbXKff7x40hmph9vONdRV6AGfrMN3Mb3Ju3Cq3DvETTRvmYOzLpOhmLfEG9C_sqxjZH4dnVNbcnnxVOhN-guDUElL0HS6ycfeeRcRKGt0umRNiSf-712ViaLkwTS8L2tRjpWM1RCzEKCRrYkfrj3ea6aJjip3m9dNJ0yTkvDYdL4huGO-2JpuToXHUrWcF2qRHjs0mXBCU_C1YT4ZWLqQwQEj9wLEgMjGBXXRSubKUovCaZySiAHB3ilPNCpbAHE5QW2vz";

const panelImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBPTL75Kk7OPWILwRRafFV6eDx7tYlnbodu0azMhLjY_zYfGH27HKPT80SoFbgGtNPdWfYBuNzvCrvF3RQkixyQBdzXvBKd9OY8kY3_oqhEgw1-vBRHWicQIxiteDga6LCzhzuPw5MXa03gbn9ITO0DpKqOmGFOOp_ZOhPxE3oZq3-tTGRx3EZW04W5z_b9FoZD5JnlRP0-0TmiOy56lC0Y44bkoOlhiGFCdaCy35KDACIaneSmDzxbDCxCJRBAP-l5MEOOBUfbQuOr";

const pumpImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQPmVVxQ_LrTuB2zoeD13D3VZ8EoGs5AGfimiuWfsLzQ0q0nTLVEN60ncAPL-pIfIzm6jqVoh71NRucvlY31zblNZlpJr_fcIOuvePPP6qhYj_BFR_1idG-vJZy8aMEJXw_SZyRr1bC6sZYU0S97hZjycFCQ4j6jQ70pBYD5i1tS-tamsBe_mKS6z3kk1THW0PJtJsys3M0mvViQxtUOK5NLcJ0qzunCFuq1t2052Ms-Xqpn9h4mc5g_Km_iIkNT5RK_x-wsPVm2Ae";

export const favoriteItems: FavoriteItem[] = [
  {
    id: "fav-rh-1200",
    slug: "industrial-retort-sterilizer",
    name: "Retort Sterilisasi Horizontal RH-1200",
    description:
      "Sistem sterilisasi tekanan tinggi untuk industri makanan menengah. Kapasitas 1200L dengan kontrol PLC.",
    priceLabel: "Rp 650.000.000",
    image: retortImage,
  },
  {
    id: "fav-cpr-2000",
    slug: "industrial-retort-sterilizer",
    name: "Control Panel Retort CPR-2000",
    description:
      "Panel kontrol retort dengan interface touch screen Siemens. Mendukung profil sterilisasi otomatis.",
    priceLabel: "Rp 85.000.000",
    image: panelImage,
  },
  {
    id: "fav-psap-304",
    slug: "automatic-liquid-filler-alf-5000",
    name: "Pompa Sirkulasi Air Panas PSAP-304",
    description:
      "Pompa sirkulasi air panas stainless steel untuk sistem retort. Head 30m, flow rate 304 L/min.",
    priceLabel: "Rp 45.750.000",
    image: pumpImage,
  },
];
