export type Gender = "male" | "female";

export const profileUser = {
  name: "Andini Pratama",
  id: "25030024",
  email: "andini.pratama@example.com",
  phone: "+62 812 3456 7890",
  dateOfBirth: "01 / 04 / 1995",
  gender: "female" as Gender,
  avatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
};

export type ProfileFormData = typeof profileUser;

export type ProfileMenuItem = {
  id: string;
  label: string;
  icon: "shield" | "settings" | "help" | "logout";
  href?: string;
  action?: "logout";
};

export const profileMenuItems: ProfileMenuItem[] = [
  { id: "privacy", label: "Kebijakan Privasi", icon: "shield", href: "/kebijakan-privasi" },
  { id: "settings", label: "Pengaturan", icon: "settings", href: "#" },
  { id: "help", label: "Bantuan", icon: "help", href: "/bantuan" },
  { id: "logout", label: "Keluar", icon: "logout", action: "logout" },
];
