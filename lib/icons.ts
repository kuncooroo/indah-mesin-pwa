import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  Box,
  Cog,
  Factory,
  Package,
  Sparkles,
  Sprout,
  Soup,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Box,
  Package,
  ArrowRightLeft,
  Factory,
  Cog,
  Sprout,
  Soup,
};

export function getCategoryIcon(name: string): LucideIcon {
  return iconMap[name] ?? Package;
}
