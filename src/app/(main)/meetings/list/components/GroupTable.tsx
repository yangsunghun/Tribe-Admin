"use client";

import { DataTable } from "@/components/data-list/data-table";
import { DateFilter, type DateFilterType } from "@/components/data-list/date-filter";
import { TextFilter } from "@/components/data-list/text-filter";
import { ToggleVisibility } from "@/components/data-list/toggle-visibility";
import { Group } from "@/mocks/groups";
import type { ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { columns } from "./columns";

interface GroupTableProps {
  groups: Group[];
}

const dateFilterOptions = [
  { value: "registrant" as const, label: "등록일시" },
  { value: "editor" as const, label: "수정일시" },
  { value: "meetingStart" as const, label: "모임시작일" },
  { value: "meetingEnd" as const, label: "모임종료일" }
];

const dateFilterColumnMap = {
  registrant: "registeredAt",
  editor: "updated_at",
  meetingStart: "created_at",
  meetingEnd: "expired_at"
} as const;

const GroupTable = ({ groups }: GroupTableProps) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterType>("registrant");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-4">
          <TextFilter<Group>
            columns={columns}
            globalFilter={globalFilter}
            onGlobalFilterChange={handleGlobalFilterChange}
            selectedColumn={selectedColumn}
            onSelectedColumnChange={handleSelectedColumnChange}
          />
          <DateFilter
            selectedDateFilter={selectedDateFilter}
            onDateFilterChange={setSelectedDateFilter}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            dateFilterOptions={dateFilterOptions}
          />
        </div>

        <ToggleVisibility<Group>
          columns={columns}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      </div>

      <DataTable
        columns={columns}
        data={groups}
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

export default GroupTable;
