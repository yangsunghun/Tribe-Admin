"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type Table,
  type VisibilityState
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as UITable } from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  columnVisibility: VisibilityState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  selectedColumn: string | null;
  onSelectedColumnChange: (columnId: string | null) => void;
  renderToggleVisibility?: (table: Table<TData>) => React.ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter,
  columnVisibility,
  setColumnVisibility,
  renderToggleVisibility
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    filterFns: {
      dateRange: (row, columnId, filterValue: any) => {
        const date = row.getValue(columnId) as string;
        if (!date || !filterValue?.from) return true;

        // Convert ISO string to Date object
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);

        const startDate = new Date(filterValue.from);
        startDate.setHours(0, 0, 0, 0);

        const endDate = filterValue.to ? new Date(filterValue.to) : null;
        if (endDate) {
          endDate.setHours(23, 59, 59, 999);
        }

        const isInRange = compareDate >= startDate && (!endDate || compareDate <= endDate);
        return isInRange;
      }
    },

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <>
      <div className="rounded-md border">
        <UITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="text-center" key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">페이지당 행 수</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border-input bg-background h-8 w-[70px] rounded-md border px-2 text-sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          {renderToggleVisibility?.(table)}
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            페이지 {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            처음
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
              const currentPage = table.getState().pagination.pageIndex;
              const totalPages = table.getPageCount();
              const alwaysShow = [0, totalPages - 1];
              const aroundCurrent = [currentPage - 1, currentPage, currentPage + 1];
              const shouldShow = alwaysShow.includes(pageIndex) || aroundCurrent.includes(pageIndex);
              const showEllipsis = pageIndex === 1 || pageIndex === totalPages - 2;

              if (!shouldShow) {
                if (showEllipsis) {
                  return (
                    <span key={pageIndex} className="px-2">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <Button
                  key={pageIndex}
                  variant={pageIndex === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(pageIndex)}
                >
                  {pageIndex + 1}
                </Button>
              );
            })}
          </div>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            다음
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            마지막
          </Button>
        </div>
      </div>
    </>
  );
}
