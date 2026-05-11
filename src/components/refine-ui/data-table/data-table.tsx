"use client";

import type { HttpError, BaseRecord } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import type { Column } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/refine-ui/data-table/data-table-pagination";
import { cn } from "@/lib/utils";

type DataTableProps<TData extends BaseRecord> = {
  table: UseTableReturnType<TData, HttpError>;
};

export function DataTable<TData extends BaseRecord>({
  table,
}: DataTableProps<TData>) {
  const {
    reactTable: { getHeaderGroups, getRowModel, getAllColumns },
    refineCore: {
      tableQuery,
      currentPage,
      setCurrentPage,
      pageCount,
      pageSize,
      setPageSize,
    },
  } = table;

  const columns = getAllColumns();
  const leafColumns = table.reactTable.getAllLeafColumns();
  const tableMinWidth = Math.max(
    leafColumns.reduce((total, column) => total + column.getSize(), 0),
    720,
  );
  const isLoading = tableQuery.isLoading;

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isOverflowing, setIsOverflowing] = useState({
    horizontal: false,
    vertical: false,
  });
  const [columnWidths, setColumnWidths] = useState<Record<string, number | undefined>>({});

  const toggleTitleSize = useCallback((columnId: string, el: HTMLElement | null) => {
    setColumnWidths((prev) => {
      if (prev[columnId]) {
        const next = { ...prev };
        delete next[columnId];
        return next;
      }
      if (!el) return prev;
      const rect = el.getBoundingClientRect();
      // add some padding so title doesn't touch edges
      const width = Math.ceil(rect.width) + 24;
      return { ...prev, [columnId]: width };
    });
  }, []);

  const measureColumnContent = useCallback((columnId: string) => {
    if (!tableRef.current) return;
    const table = tableRef.current;
    const nodes = Array.from(table.querySelectorAll(`[data-colid="${columnId}"]`));
    let max = 0;
    for (const node of nodes) {
      // look for inner content wrapper
      const inner = node.querySelector("div");
      const target = inner ?? node;
      const rect = (target as HTMLElement).getBoundingClientRect();
      if (rect.width > max) max = rect.width;
    }
    if (max <= 0) return;
    const width = Math.ceil(max) + 24;
    setColumnWidths((prev) => ({ ...prev, [columnId]: width }));
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (tableRef.current && tableContainerRef.current) {
        const table = tableRef.current;
        const container = tableContainerRef.current;

        const horizontalOverflow = table.offsetWidth > container.clientWidth;
        const verticalOverflow = table.offsetHeight > container.clientHeight;

        setIsOverflowing({
          horizontal: horizontalOverflow,
          vertical: verticalOverflow,
        });
      }
    };

    checkOverflow();

    // Check on window resize
    window.addEventListener("resize", checkOverflow);

    // Check when table data changes
    const timeoutId = setTimeout(checkOverflow, 100);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timeoutId);
    };
  }, [tableQuery.data?.data, pageSize]);

  return (
    <div className={cn("flex", "flex-col", "flex-1", "gap-5")}>
      <div
        ref={tableContainerRef}
        className={cn(
          "overflow-x-auto overflow-y-hidden rounded-lg border border-border/80 bg-card",
          "shadow-[0_8px_24px_rgba(0,40,77,0.06)]",
          "scroll-smooth",
          "[scrollbar-color:#d5bb87_transparent]",
          "[scrollbar-width:thin]",
        )}
      >
        <Table
          ref={tableRef}
          style={{
            tableLayout: "auto",
            width: "100%",
            minWidth: tableMinWidth,
          }}
        >
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPlaceholder = header.isPlaceholder;

                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        ...getCommonStyles({
                          column: header.column,
                          isOverflowing: isOverflowing,
                          columnWidths,
                        }),
                      }}
                    >
                      {isPlaceholder ? null : (
                        <div className={cn("flex", "items-center", "gap-1")}>
                          <button
                            type="button"
                            onClick={(e) => toggleTitleSize(header.column.id, e.currentTarget as HTMLElement)}
                            className="flex items-center gap-1"
                            title={columnWidths[header.column.id] ? "Restaurar ancho" : "Ajustar al título"}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </button>
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative">
            {isLoading ? (
              <>
                {Array.from({ length: pageSize < 1 ? 1 : pageSize }).map(
                  (_, rowIndex) => (
                    <TableRow
                      key={`skeleton-row-${rowIndex}`}
                      aria-hidden="true"
                    >
                      {leafColumns.map((column) => (
                        <TableCell
                          key={`skeleton-cell-${rowIndex}-${column.id}`}
                          style={{
                            ...getCommonStyles({
                              column,
                              isOverflowing: isOverflowing,
                              columnWidths,
                            }),
                          }}
                          className={cn(columnWidths[column.id] ? "whitespace-nowrap" : "truncate")}
                        >
                          <div className="h-8" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ),
                )}
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className={cn("absolute", "inset-0", "pointer-events-none")}
                  >
                    <Loader2
                      className={cn(
                        "absolute",
                        "top-1/2",
                        "left-1/2",
                        "animate-spin",
                        "text-primary",
                        "h-8",
                        "w-8",
                        "-translate-x-1/2",
                        "-translate-y-1/2",
                      )}
                    />
                  </TableCell>
                </TableRow>
              </>
            ) : getRowModel().rows?.length ? (
              getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.original?.id ?? row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...getCommonStyles({
                              column: cell.column,
                              isOverflowing: isOverflowing,
                              columnWidths,
                            }),
                          }}
                        >
                          <div className={cn(columnWidths[cell.column.id] ? "whitespace-nowrap" : "truncate")}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <DataTableNoData
                isOverflowing={isOverflowing}
                columnsLength={columns.length}
              />
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && getRowModel().rows?.length > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={tableQuery.data?.total}
        />
      )}
    </div>
  );
}

function DataTableNoData({
  isOverflowing,
  columnsLength,
}: {
  isOverflowing: { horizontal: boolean; vertical: boolean };
  columnsLength: number;
}) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell
        colSpan={columnsLength}
        className={cn("relative", "text-center")}
        style={{ height: "490px" }}
      >
        <div
          className={cn(
            "absolute",
            "inset-0",
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "gap-2",
            "bg-background",
          )}
          style={{
            position: isOverflowing.horizontal ? "sticky" : "absolute",
            left: isOverflowing.horizontal ? "50%" : "50%",
            transform: "translateX(-50%)",
            zIndex: isOverflowing.horizontal ? 2 : 1,
            width: isOverflowing.horizontal ? "fit-content" : "100%",
            minWidth: "300px",
          }}
        >
          <div className={cn("text-lg", "font-semibold", "text-foreground")}>
            No data to display
          </div>
          <div className={cn("text-sm", "text-muted-foreground")}>
            This table is empty for the time being.
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function getCommonStyles<TData>({
  column,
  isOverflowing,
  columnWidths,
}: {
  column: Column<TData>;
  isOverflowing: {
    horizontal: boolean;
    vertical: boolean;
  };
  columnWidths?: Record<string, number | undefined>;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  const explicitWidth = columnWidths?.[column.id];

  return {
    boxShadow:
      isOverflowing.horizontal && isLastLeftPinnedColumn
        ? "-4px 0 4px -4px var(--border) inset"
        : isOverflowing.horizontal && isFirstRightPinnedColumn
          ? "4px 0 4px -4px var(--border) inset"
          : undefined,
    left:
      isOverflowing.horizontal && isPinned === "left"
        ? `${column.getStart("left")}px`
        : undefined,
    right:
      isOverflowing.horizontal && isPinned === "right"
        ? `${column.getAfter("right")}px`
        : undefined,
    opacity: 1,
    position: isOverflowing.horizontal && isPinned ? "sticky" : "relative",
    background: isOverflowing.horizontal && isPinned ? "var(--background)" : "",
    borderTopRightRadius:
      isOverflowing.horizontal && isPinned === "right"
        ? "var(--radius)"
        : undefined,
    borderBottomRightRadius:
      isOverflowing.horizontal && isPinned === "right"
        ? "var(--radius)"
        : undefined,
    borderTopLeftRadius:
      isOverflowing.horizontal && isPinned === "left"
        ? "var(--radius)"
        : undefined,
    borderBottomLeftRadius:
      isOverflowing.horizontal && isPinned === "left"
        ? "var(--radius)"
        : undefined,
    width: explicitWidth ?? column.getSize(),
    whiteSpace: explicitWidth ? "nowrap" : undefined,
    zIndex: isOverflowing.horizontal && isPinned ? 1 : 0,
  };
}

DataTable.displayName = "DataTable";
