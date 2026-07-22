"use client";

import type { ComponentProps } from "react";

import { DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function AdminDialogContent({
  className,
  ...props
}: ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      size="wide"
      className={cn(
        "max-h-[90vh] overflow-y-auto p-6 sm:p-8",
        "[&_input:not([type=checkbox])]:h-10 [&_select]:h-10 [&_textarea]:min-h-28",
        className,
      )}
      {...props}
    />
  );
}
