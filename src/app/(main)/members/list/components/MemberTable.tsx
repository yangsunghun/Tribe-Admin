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

  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: visible
    }));
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2">
        <TextFilter columns={columns} globalFilter={globalFilter} onGlobalFilterChange={setGlobalFilter} />
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
      />
    </div>
  );
};

export default MemberTable;
