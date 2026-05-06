"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DataTablePaginationProps = {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  total?: number;
};

export function DataTablePagination({
  currentPage,
  pageCount,
  setCurrentPage,
  pageSize,
  setPageSize,
  total,
}: DataTablePaginationProps) {
  const pageSizeOptions = useMemo(() => {
    const baseOptions = [10, 20, 30, 40, 50];
    const optionsSet = new Set(baseOptions);

    if (!optionsSet.has(pageSize)) {
      optionsSet.add(pageSize);
    }

    return Array.from(optionsSet).sort((a, b) => a - b);
  }, [pageSize]);

  return (
    <div
      className={cn(
        "flex",
        "items-stretch",
        "justify-between",
        "flex-wrap",
        "px-1",
        "pt-1",
        "w-full",
        "gap-3",
        "sm:items-center",
      )}
    >
      <div
        className={cn(
          "flex-1",
          "text-sm",
          "text-muted-foreground",
          "whitespace-nowrap",
          "font-medium",
          "w-full",
          "sm:w-auto",
        )}
      >
        {typeof total === "number" ? `${total} row(s)` : null}
      </div>
      <div className={cn("flex", "w-full", "flex-col", "gap-3", "sm:w-auto", "sm:flex-row", "sm:items-center", "sm:flex-wrap")}>
        <div className={cn("flex", "items-center", "justify-between", "gap-2", "sm:justify-start")}>
          <span className={cn("text-sm", "font-medium")}>Rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(v) => setPageSize(Number(v))}
          >
            <SelectTrigger className={cn("h-9", "w-[70px]", "rounded-md", "shadow-xs")}>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={cn("flex", "items-center", "justify-between", "gap-3", "sm:justify-start", "sm:flex-wrap")}>
          <div
            className={cn(
              "flex",
              "items-center",
              "justify-center",
              "text-sm",
              "font-semibold",
            )}
          >
            Page {currentPage} of {pageCount}
          </div>
          <div className={cn("flex", "items-center", "gap-2")}>
            <Button
              variant="outline"
              className={cn("hidden", "h-9", "w-9", "rounded-md", "p-0", "shadow-xs", "lg:flex")}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              aria-label="Go to first page"
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className={cn("h-9", "w-9", "rounded-md", "p-0", "shadow-xs")}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className={cn("h-9", "w-9", "rounded-md", "p-0", "shadow-xs")}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label="Go to next page"
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className={cn("hidden", "h-9", "w-9", "rounded-md", "p-0", "shadow-xs", "lg:flex")}
              onClick={() => setCurrentPage(pageCount)}
              disabled={currentPage === pageCount}
              aria-label="Go to last page"
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

DataTablePagination.displayName = "DataTablePagination";
