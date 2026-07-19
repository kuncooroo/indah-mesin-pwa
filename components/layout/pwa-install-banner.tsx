"use client";

import { useState } from "react";
import { Smartphone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PwaInstallBannerProps = {
  className?: string;
};

export function PwaInstallBanner({ className }: PwaInstallBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-[60] flex items-center justify-between bg-primary px-margin-mobile py-2 text-body-sm text-white md:px-margin-desktop",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Smartphone className="h-5 w-5" />
        <span>Pasang IndustrialX untuk akses lebih cepat</span>
      </div>
      <Button
        type="button"
        size="sm"
        onClick={() => setVisible(false)}
        className="bg-white text-primary hover:bg-white/90"
      >
        Install
        <X className="sr-only" />
      </Button>
    </div>
  );
}
