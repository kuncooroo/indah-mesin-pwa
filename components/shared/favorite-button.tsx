"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import {
  favoriteProductId,
  isFavorite,
  toggleFavorite,
  type FavoriteProductInput,
} from "@/lib/favorites-store";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  product: FavoriteProductInput;
  className?: string;
  iconClassName?: string;
  filledClassName?: string;
};

export function FavoriteButton({
  product,
  className,
  iconClassName = "size-4",
  filledClassName,
}: FavoriteButtonProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isFavorite(product.id));
  }, [product.id]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActive(toggleFavorite(product));
  }

  return (
    <button
      type="button"
      aria-label={active ? "Hapus dari favorit" : "Simpan ke favorit"}
      aria-pressed={active}
      onClick={handleClick}
      className={className}
    >
      <Heart
        className={cn(iconClassName, active && (filledClassName ?? "fill-primary text-primary"))}
        strokeWidth={2}
      />
    </button>
  );
}

export function useFavoriteState(slug: string, name: string) {
  const id = favoriteProductId(slug, name);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isFavorite(id));
  }, [id]);

  function toggle(input: Omit<FavoriteProductInput, "id">) {
    const next = toggleFavorite({ ...input, id });
    setActive(next);
    return next;
  }

  return { id, active, toggle };
}
