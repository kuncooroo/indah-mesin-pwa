"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 10;

export function filterItems<T>(
  items: T[],
  query: string,
  getSearchText: (item: T) => string,
): T[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;

  return items.filter((item) =>
    getSearchText(item).toLowerCase().includes(normalized),
  );
}

export function paginateItems<T>(items: T[], page: number, pageSize = PAGE_SIZE): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getTotalPages(totalItems: number, pageSize = PAGE_SIZE): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

type AdminListToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
};

export function AdminListToolbar({
  search,
  onSearchChange,
  placeholder = "Cari...",
  page,
  totalPages,
  totalItems,
  pageSize = PAGE_SIZE,
  onPageChange,
}: AdminListToolbarProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-md flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          {totalItems === 0
            ? "0 data"
            : `${start}-${end} dari ${totalItems}`}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="min-w-[72px] text-center">
          {page} / {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Halaman berikutnya"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function useAdminListState<T>(
  items: T[],
  getSearchText: (item: T) => string,
  pageSize = PAGE_SIZE,
) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterItems(items, search, getSearchText),
    [items, search, getSearchText],
  );

  const totalPages = getTotalPages(filtered.length, pageSize);
  const safePage = Math.min(page, totalPages);
  const paginated = paginateItems(filtered, safePage, pageSize);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return {
    search,
    setSearch,
    page: safePage,
    setPage,
    totalPages,
    filtered,
    paginated,
    pageSize,
  };
}

export function getRowNumber(
  page: number,
  index: number,
  pageSize = PAGE_SIZE,
): number {
  return (page - 1) * pageSize + index + 1;
}
