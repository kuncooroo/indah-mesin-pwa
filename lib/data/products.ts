import type { Product, SavedItem } from "@/lib/types";

const retortGallery = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuATo9OiVElbXKff7x40hmph9vONdRV6AGfrMN3Mb3Ju3Cq3DvETTRvmYOzLpOhmLfEG9C_sqxjZH4dnVNbcnnxVOhN-guDUElL0HS6ycfeeRcRKGt0umRNiSf-712ViaLkwTS8L2tRjpWM1RCzEKCRrYkfrj3ea6aJjip3m9dNJ0yTkvDYdL4huGO-2JpuToXHUrWcF2qRHjs0mXBCU_C1YT4ZWLqQwQEj9wLEgMjGBXXRSubKUovCaZySiAHB3ilPNCpbAHE5QW2vz",
    alt: "Industrial retort sterilizer main view",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmufaosQsP0kDLEZNRrL7DphMdw2vYP078GQsQK-mNmLRoDE9MK_8u7S5uqgGjBIaO9jTewuW1j1xaxvjkJbBh0FKMNTTUAukqRIAEIXBWrF2VKorYl5MjA_-IRFCDEUodZjG57BHYMmNnsX9tGbKSjVjh4mux0O0Njz3oFRsFSp3tTCqyMRhGV1Uu4shLwsYj3oU_jF-qcdJOUHyZrSePGDULafvBiC3lc9VgMmMtooQs4N4ZHQJrNQKkB-JcLrgLr-MWbzF1g2cB",
    alt: "Retort sterilizer loading hatch",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPTL75Kk7OPWILwRRafFV6eDx7tYlnbodu0azMhLjY_zYfGH27HKPT80SoFbgGtNPdWfYBuNzvCrvF3RQkixyQBdzXvBKd9OY8kY3_oqhEgw1-vBRHWicQIxiteDga6LCzhzuPw5MXa03gbn9ITO0DpKqOmGFOOp_ZOhPxE3oZq3-tTGRx3EZW04W5z_b9FoZD5JnlRP0-0TmiOy56lC0Y44bkoOlhiGFCdaCy35KDACIaneSmDzxbDCxCJRBAP-l5MEOOBUfbQuOr",
    alt: "PLC control interface",
    type: "video" as const,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSdRgMNZUR_k7EhRP-oZsfRqw3bmITi7dfdxgN_cVWWobpEiNd5AHydIhkICMFJMZlZtF8N54TlVDLA0pvY-220jYUyI-V1acASq_wc-rQ1y6C6iTEUm6qiQPhdLxUNEVCxLTCZtNf90lXTrm8uQlj-tQbQvpLkARZiWMqpF4_jStST0ekEKyJyAqaJVV33VaFkQtPpWoSgKAbGS1S3e5ylrwCSUo2a71lY18CiCGi5PLbRt9FIih3Y6Ef-_0tY3mOGgwenHNJ01V",
    alt: "Retort chamber interior",
  },
];

export const products: Product[] = [
  {
    slug: "vertical-machining-center-vmc-850",
    name: "Vertical Machining Center VMC-850",
    sku: "CNC850",
    description:
      "High precision machining with automatic tool changer (ATC) and high-speed spindle system.",
    categorySlug: "cnc",
    categoryLabel: "Mesin CNC",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsjR1YVrUEM71BWz2hhLaid3gfD0In36YfKTAxOEerk1INgZ6_hzx6QOUCvhyaHEdV61Mis1Fuje37Dy2c6-i3MSUU_29i0NCEvSXjdHzU8h_LQ6psB2AqYTGwzH2ePpSeW6hajYurLAYkHljNhn9uIlO19pAyH5oc-5XLS08OGvZNIcyNmPvBZhoW4KfAkF-Mcojc2NHrmwiHAorhUdt7Y8Zor4hGftqNBH1FRKFYwGo7VknQpnbPZDuebKLQ6jZKs6OVYenfUieX",
    status: "ready",
    statusLabel: "Ready Stock",
    priceLabel: "Rp 450.000.000+",
    features: [
      "Automatic tool changer for high-mix production.",
      "High-speed spindle for precision finishing.",
      "Rigid structure for heavy-duty machining.",
    ],
  },
  {
    slug: "automatic-liquid-filler-alf-5000",
    name: "Automatic Liquid Filler ALF-5000",
    sku: "PK-ALF5K",
    description:
      "Automated filling system for high-viscosity liquids with precise volumetric control.",
    categorySlug: "packaging",
    categoryLabel: "Packaging",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQPmVVxQ_LrTuB2zoeD13D3VZ8EoGs5AGfimiuWfsLzQ0q0nTLVEN60ncAPL-pIfIzm6jqVoh71NRucvlY31zblNZlpJr_fcIOuvePPP6qhYj_BFR_1idG-vJZy8aMEJXw_SZyRr1bC6sZYU0S97hZjycFCQ4j6jQ70pBYD5i1tS-tamsBe_mKS6z3kk1THW0PJtJsys3M0mvViQxtUOK5NLcJ0qzunCFuq1t2052Ms-Xqpn9h4mc5g_Km_iIkNT5RK_x-wsPVm2Ae",
    status: "indent",
    statusLabel: "Indent 4 Minggu",
    priceLabel: "Rp 125.000.000+",
  },
  {
    slug: "industrial-genset-500kva-silent",
    name: "Industrial Genset 500kVA Silent",
    sku: "PW-G500S",
    description:
      "Reliable power backup for large facilities with advanced noise reduction and fuel efficiency.",
    categorySlug: "produksi",
    categoryLabel: "Power Generators",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrxWJ6RNAaT_9R8pNdOeuWQjjfedjtlMWw-XKYmkUp1QACERTYrYdO8bHN3Qag6Kg-6lifiSzMpL24w4Iv5lXWbubKlRKu5VqCi7IpMznmVHJO8z-NA-vK9COPOWb3SD7A0iNc40CN_XPXgXdRflHq8Oyz_pxOj2SuD2N6Z2tgaoYoL-GQPccH1MCL8jTLz9PyO5ZpIe0hWojBfZDLHm3OKh5_81fFsuMMZbUSeL_Mlq6hy8MNryucEeG63keUzE3kVPFL-gxmgv6n",
    status: "ready",
    statusLabel: "Ready Stock",
    priceLabel: "Rp 820.000.000+",
  },
  {
    slug: "14-head-multihead-weigher",
    name: "14-Head Multihead Weigher for Food",
    sku: "FDP-WGH-14H",
    description:
      "High-speed multihead weigher for accurate portioning in food packaging lines.",
    categorySlug: "food-processing",
    categoryLabel: "Food Processing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN84ss-jG4xuT24rpQLoMxdlNuHtYa9jxj2oql5Jhgn2EOxnO5UenlFKSvYQw2BbsDKfb_auSweKFa5H88FSaWcpj5zh-MkpP2JJVfvmmhYlDzbXD8IrzsjYbzrXFiVxjZkgP3XdJnU8cDdGSso8lLcT-kCzv2XS44ZWGgrAQ8sFnsUxlXhOmpTGyY3Xd2rtnmHYpQqxyq6WBIsuHSZm7nMDRoN_rJHIdRZZX2NI4U5WXD6flzaS-nb26TB76ksGuQh3jGziXKHq80",
    status: "ready",
    statusLabel: "Ready Stock",
    priceLabel: "Rp 112.000.000+",
  },
  {
    slug: "automatic-vacuum-packaging-machine",
    name: "Automatic Vacuum Packaging Machine",
    sku: "FDP-VAC-400",
    description:
      "Chamber vacuum packaging system for extended shelf life and product integrity.",
    categorySlug: "food-processing",
    categoryLabel: "Food Processing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfL8_-n5A0m1wo-LlFI_BxfXTrZuJgtYmCTsTRvIpVuJcpF464ry-kgqOnBKwPi5Jde3jRBzTGmxgd4mgSuwQdakeON3BbEebk8uvbulyKfQSX3CvnpUwukNy2PxIboVhZX3j9p3vd8k73hY6_-1O9WXp4ijKDbxNwasVH92dArB7-WKwULRszqQeQgFhh8_EzlSjmP3-MZ88gofP03UmcOI6tfNToWjMMjZK4-VRUt05Gp2c6w5mKAfQM7nnYaWtjOICVN8C2naAE",
    status: "ready",
    statusLabel: "Ready Stock",
    priceLabel: "Rp 45.000.000+",
  },
  {
    slug: "industrial-food-dehydrator",
    name: "Industrial Food Dehydrator",
    sku: "FDP-DHY-200",
    description:
      "Large-capacity dehydrator for uniform drying in commercial food production.",
    categorySlug: "food-processing",
    categoryLabel: "Food Processing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5mM7r582n1iU7P0O4WE4wt3FOqNhst447DubuaGz_GGspb1tNNXG-J73geyqMngZLbGaHtlQuMEOy6OnLV7t4Q33cT8O9YLR_j7VU3zHn-3nuNmuL95WYbUmmVs2q5NQCk1gmXPNxtrC48M8N_l7R-7hHyEOVliRAQSEK1XLRxxYgja9aqwnYePO1kMmEWk3yymoOC95Do4N4xicqg7U4ovx0RxEeOBoTXhl8mI0lj29sA71I8A0dANGeWrWyqJ3ak4LbNhAZzFR",
    status: "indent",
    statusLabel: "Inden",
    priceLabel: "Rp 78.000.000+",
  },
  {
    slug: "automatic-liquid-filling-machine-beverages",
    name: "Automatic Liquid Filling Machine for Beverages",
    sku: "FDP-LIQ-1000",
    description:
      "Automated beverage filling line with precision volume control and stainless steel contact parts.",
    categorySlug: "food-processing",
    categoryLabel: "Food Processing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWf8Ha5SEuSSNicuiRz_PRJN6OsAfjcQyHBq0DZimFsEL9hjX6zJTX1DY1OzteAere0maSqYaz9hGCRBrlbTyYUpzifecki7130Rwj8YSzXo0gCdi7gYaWMWkeSW7HwVY0N27l_04F3QlQoQHaixBtVPvD1SjrGwUISQLQO_ElzyMDB_ECdtsN82Itp7TdZ5WoN3ay_MelAi-Fobf9bMtdtOwSgI8AO7TMLjm5dGTUatG4NUZLsTTBjU_VBmtX7Kof-Xx1Sv9xglwL",
    status: "ready",
    statusLabel: "Ready Stock",
    priceLabel: "Rp 155.000.000+",
  },
  {
    slug: "industrial-retort-sterilizer",
    name: "Industrial Retort Sterilizer - High Pressure Steam",
    sku: "FDP-RTR-500",
    description:
      "Double-tank water immersion retort for energy-efficient food sterilization with PLC control.",
    categorySlug: "food-processing",
    categoryLabel: "Sterilizers",
    image: retortGallery[0].src,
    gallery: retortGallery,
    status: "ready",
    statusLabel: "Ready Stock",
    priceLabel: "Rp 285.000.000+",
    priceNote: "*Harga belum termasuk instalasi & pengiriman luar kota.",
    features: [
      "Double-tank water immersion retort for energy efficiency.",
      "Automated PLC control for precise temperature ramping.",
      "High-efficiency heat distribution for canned & pouched food.",
      "Safety interlock system for high-pressure operations.",
    ],
    specifications: [
      { attribute: "Model", value: "RTR-500 Food Grade" },
      { attribute: "Capacity", value: "500 Liters / Batch" },
      { attribute: "Max Temperature", value: "147°C" },
      { attribute: "Max Pressure", value: "0.35 MPa" },
      {
        attribute: "Material",
        value: "SUS304 Stainless Steel (Anti-Corrosion)",
      },
      {
        attribute: "Control System",
        value: "Siemens PLC Touch Screen Interface",
      },
      { attribute: "Dimensions", value: "2,200 x 1,400 x 1,800 mm" },
      { attribute: "Warranty", value: "2 Years Parts & Service" },
    ],
    downloads: [
      {
        title: "Brosur Retort-Sterilizer.pdf",
        subtitle: "Download Brochure",
        href: "#",
      },
      {
        title: "SOP-Operasional-Retort.pdf",
        subtitle: "Technical Manual",
        href: "#",
      },
    ],
    benefit: {
      title: "Mengapa Memilih IndustrialX Retort?",
      description:
        "Sistem retort kami dirancang khusus untuk memenuhi standar ketat industri pengolahan makanan di Indonesia. Dengan teknologi water immersion, distribusi panas menjadi jauh lebih merata dibandingkan sistem steam konvensional, memastikan sterilisasi produk hingga ke pusat kemasan tanpa merusak tekstur makanan.",
      stats: [
        { value: "99.9%", label: "Sterilization Efficiency" },
        { value: "30%", label: "Energy Savings" },
      ],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAL7gusB9X50NsO1Qyj7xDEP3QczUR9T8qPWfO7gPS9xrqyyi5d5mASy6UG-CgbuOMDPSSxikHYVYL2cwkgeh5uIIYfG7UR-kyMLzliLve-aPa5kfCggUOK3ebSHYEbk1pPAY76-NDOgc9uK3tLqOQ5onZmLbGnaiuYqGZ8w4xS1gOcX89vICShQnbVUexbU97o_G5vsIw8JjVu4RDZdot1xOyeG07bdISjrm216vRxa8Mkxu7a6K8CVHSGiD6AsKYijjalYLpPAMif",
      imageCaption:
        "After-sales support & on-site training included with every unit.",
    },
  },
];

export const savedItems: SavedItem[] = [
  {
    slug: "vertical-machining-center-vmc-850",
    sku: "VMC-850-X4",
    name: "VMC-850 Vertical Machining Center",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRYgvnXmsuFYAmnoKFUXXPHeCvMIoxubS0VqjCqKyjvUWYRwfkEKXdY3LAa3nCGRHtgLRPyI_8vHBM3Zde86fNiuKYzVApc2YjltlO7-Gjwrf7gURjbRGenG5kOt4EozRRU9W6-OfADGpqm3bIiaPWKzhztkNsnpP58zNdlrW8wTKKmhZYZdFBLl7KOrdK1ndK8bfzbRR2qg6X8yMMV1DnciHeHXB1fm_ULC0BgomNmAxh5E3H4zTpfaX9D3aqEXoviLw2hiKTi8SM",
    status: "ready",
    statusLabel: "Ready Stock",
    priceEstimate: "USD 42,500",
    priceNote: "Reflects current market rate. Logistics excluded.",
    primaryAction: "Consult via WhatsApp",
    secondaryAction: "Request Brochure",
  },
  {
    slug: "industrial-retort-sterilizer",
    sku: "IND-RT-1200",
    name: "Vertical Retort Sterilizer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIfAdeED2TVIAr2cMdAdP_U4C0US2QlodtdvBv0Du_Ec256dS0Ck7vgiWMDlD19XtLIN0CUpQj1KZ9MmE0wkCOlTO59oNN66WdE9eSfL2DyRNcyNrDN6skWGlznWDUIyqrDBNAsCDZjXf1dBjTvb5melUFcIMdioXvF1K9oe0MvxD87md-X14g74Cl6BBPBtCIbqxRn1FEWqisSeVeMJ4-EAgtdrs7YlSceFN-6c-_t_2XKKYinkjpt9u8LgRQlhO6OiJBBsbyTzXf",
    status: "indent",
    statusLabel: "Indent (45 Days)",
    priceEstimate: "USD 18,900",
    priceNote: "Price varies by volume capacity. Request official quote.",
    primaryAction: "Consult via WhatsApp",
    secondaryAction: "Technical Spec Sheet",
  },
  {
    slug: "rotary-screw-air-compressor",
    sku: "COMP-RS-25",
    name: "Rotary Screw Air Compressor",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjkP-qmg4CouiF-qEmhJOw6JA8OZLVXlUekJQ7MggEC89N5VSwDnX9inwYztxML-3ijCo1YV2iuJB77rIjzzpSusuctLVyZ9dAlcLIoLZ7GRt61wF9nvaD2-Vl9Pwxc2itlZeFIPieXP4p9GcjAL7jAZYjh5TC2iZTx4nZ_ATrDZYGseOJ6kh16Bdtzzw4FEVldqTErjfMzL33GEGQGsV5gHe7gsftWDBzpwEmJ7yajADXky4UxJL6IjtHt7XNOF35HI-PPZjzS55O",
    status: "ready",
    statusLabel: "Ready Stock",
    priceEstimate: "USD 7,200",
    priceNote: "Stock available in Jakarta and Surabaya hubs.",
    primaryAction: "Consult via WhatsApp",
    secondaryAction: "View Availability",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 3);
}

export function getHomeProducts(): Product[] {
  return [
    products[0],
    products[1],
    products[2],
  ].filter(Boolean) as Product[];
}

export function getFoodProcessingProducts(): Product[] {
  return getProductsByCategory("food-processing");
}
