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

  const columnDefinitions = columns.map((column) => {
    const id = column.id || (column as any).accessorKey || "";

    let label = "";
    if (typeof column.header === "string") {
      label = column.header;
    } else if (column.id === "select") {
      label = "선택";
    } else {
      label = id;
    }

    return {
      id,
      label,
      canHide: column.enableHiding !== false
    };
  });

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2">
        <TextFilter
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          placeholder="이름 또는 이메일 검색"
        />
        <ToggleVisibility
          columns={columnDefinitions}
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
