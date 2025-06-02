"use client";

import { DataTable } from "@/components/data-list/data-table";
import { TextFilter } from "@/components/data-list/text-filter";
import { ToggleVisibility } from "@/components/data-list/toggle-visibility";
import { User } from "@/mocks/users";
import type { ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { columns } from "./columns";

interface MemberTableProps {
  users: User[];
}

const MemberTable = ({ users }: MemberTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  // 컬럼 매핑을 한 번만 생성
  const columnMap = useMemo(() => {
    return columns.reduce(
      (acc, col) => {
        if ((col as any).accessorKey) {
          acc[(col as any).accessorKey] = col;
        }
        return acc;
      },
      {} as Record<string, (typeof columns)[0]>
    );
  }, []);

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
        const column = columnMap[selectedColumn];
        if (!column) return prev;
        // id가 없으면 accessorKey를 사용
        const columnId = column.id || (column as any).accessorKey;
        return [
          ...prev.filter((filter) => filter.id !== columnId),
          {
            id: columnId,
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
    <div className="space-y-4">
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
