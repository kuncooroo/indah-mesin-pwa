export const profileUser = {
  name: "Andini Pratama",
  id: "25030024",
  avatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
};

export type ProfileMenuItem = {
  id: string;
  label: string;
  icon:
    | "shield"
    | "credit-card"
    | "bell"
    | "settings"
    | "help"
    | "logout";
  href?: string;
  action?: "logout";
};

export const profileMenuItems: ProfileMenuItem[] = [
  { id: "privacy", label: "Kebijakan Privasi", icon: "shield", href: "#" },
  {
    id: "payment",
    label: "Metode Pembayaran",
    icon: "credit-card",
    href: "#",
  },
  { id: "notifications", label: "Notifikasi", icon: "bell", href: "#" },
  { id: "settings", label: "Pengaturan", icon: "settings", href: "#" },
  { id: "help", label: "Bantuan", icon: "help", href: "/bantuan" },
  { id: "logout", label: "Keluar", icon: "logout", action: "logout" },
];

export const profileQuickActions = [
  { id: "profil", label: "Profil", href: "/akun", icon: "user" as const },
  { id: "favorit", label: "Favorit", href: "/simpanan", icon: "heart" as const },
  { id: "pesanan", label: "Pesanan", href: "#", icon: "orders" as const },
];
