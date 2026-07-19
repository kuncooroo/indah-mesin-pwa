import type { ContactMethod, LocationInfo, ShowroomHour } from "@/lib/types";
import { waUrl } from "@/lib/whatsapp";

export const contactHero = {
  title: "Visit Our Showroom",
  description:
    "Experience precision engineering in person. Our technical experts are ready to provide live demonstrations.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAey2gcnHGL0q9doYp4OrN_6OM1FzkEf1Ckr0A6afUAb7pBiV6eW4oluO2eFaDiw2niZFsmH2bGu8TcW508voJiIH0CbAPfr4XPdCohYO0oyW_wE-lvu02Vic9VkYIPxS1Ra5JVQpFIHxBBBcMX0JvbzYm71Q6_gmlBPZpziILBJEJvojBdlJOICTOEW4S5o16F4Hs9XdopN81ZpIW-XhEohGLYYcBRXdwbKj2q0545CFTICEbUU5iOu59SWjI4wZheTgszulyWOKS2",
};

export const contactMethods: ContactMethod[] = [
  {
    icon: "Phone",
    label: "Head Office",
    value: "+62 21 555 8900",
    href: "tel:+62215558900",
  },
  {
    icon: "Mail",
    label: "Sales Inquiry",
    value: "sales@indux.com",
    href: "mailto:sales@indux.com",
  },
];

export const showroomHours: ShowroomHour[] = [
  { day: "Monday - Friday", hours: "08:00 - 17:00" },
  { day: "Saturday", hours: "09:00 - 14:00" },
  { day: "Sunday & Holidays", hours: "Closed", closed: true },
];

export const locations: LocationInfo[] = [
  {
    title: "Head Office",
    icon: "MapPin",
    lines: [
      "Central Business District, Tower A, 24th Floor",
      "Jakarta Selatan, 12190",
    ],
  },
  {
    title: "Warehouse & Showroom",
    icon: "Factory",
    lines: ["Industrial Zone III, Block C-12", "Tangerang, Banten 15124"],
  },
];

export const mapImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBBAV69G7pSR3sD48GN-rDcTPokxqVKkIqSyLO9YN7t3SpiZOQ4_2mg8fq2cCap_2ITFDvP_vz1eISS0wvLF6tfFgdLY9jnPq8J9cPXrIOaLUKnf6-yg7jg-gwU72jhiY75Gi5JTbucuATB-HK1EZCwYC5tM5_oFTku6n-WtkEhy8QsN0NuW9LLkQc3rcOSABCkCXV_AD-ldgQJigCe6q7OnWGEN6ZVyvnUkM09t5KDQ9zGyuF2I2Op0PCMS2uqKS8-X6NYCB_jZFOE";

export const supportTags = [
  "24h Maintenance",
  "Operator Training",
  "OEM Parts",
];

export const whatsappContactHref = waUrl(
  "Halo IndustrialX, saya ingin konsultasi mengenai kebutuhan mesin industri.",
);
