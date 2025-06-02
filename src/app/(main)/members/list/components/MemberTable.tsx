"use client";

import { DataTable } from "@/components/data-list/data-table";
import { TextFilter } from "@/components/data-list/text-filter";
import { ToggleVisibility } from "@/components/data-list/toggle-visibility";
import { User } from "@/mocks/users";
import type { ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";

interface MemberTableProps {
  users: User[];
}

const MemberTable = ({ users }: MemberTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: visible
    }));
  };

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    if (selectedColumn) {
      setColumnFilters((prev) => {
        const column = columns.find((col) => (col as any).accessorKey === selectedColumn);
        if (!column || !column.id) return prev;
        return [
          ...prev.filter((filter) => filter.id !== column.id),
          {
            id: column.id,
            value
          }
        ];
      });
    } else {
      setColumnFilters([]);
    }
  };

  const handleSelectedColumnChange = (columnId: string | null) => {
    setSelectedColumn(columnId);
    setColumnFilters([]);
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2">
        <TextFilter
          columns={columns}
          globalFilter={globalFilter}
          onGlobalFilterChange={handleGlobalFilterChange}
          selectedColumn={selectedColumn}
          onSelectedColumnChange={handleSelectedColumnChange}
        />
        <ToggleVisibility
          columns={columns}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      </div>
      <DataTable
        columns={columns}
        data={users}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        selectedColumn={selectedColumn}
        onSelectedColumnChange={handleSelectedColumnChange}
      />
    </div>
  );
};

export default MemberTable;
