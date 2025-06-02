"use client";

import { DataTable } from "@/components/data-list/data-table";
import { DateFilter, type DateFilterType } from "@/components/data-list/date-filter";
import { TextFilter } from "@/components/data-list/text-filter";
import { ToggleVisibility } from "@/components/data-list/toggle-visibility";
import { Group } from "@/mocks/groups";
import type { ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { useState } from "react";
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

  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: visible
    }));
  };

  const handleGlobalFilterChange = (value: string, columnId?: string) => {
    setGlobalFilter(value);
    if (columnId) {
      setColumnFilters((prev) => {
        const newFilters = prev.filter((filter) => filter.id !== columnId);
        if (value) {
          newFilters.push({ id: columnId, value });
        }
        return newFilters;
      });
    } else {
      setColumnFilters([]);
    }
  };

  const handleSearch = () => {
    // Clear existing date filters
    const newFilters = columnFilters.filter((filter) => !Object.values(dateFilterColumnMap).includes(filter.id as any));

    // Add new date filter
    if (dateRange?.from) {
      newFilters.push({
        id: dateFilterColumnMap[selectedDateFilter],
        value: dateRange
      });
    }

    setColumnFilters(newFilters);
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-4">
          <TextFilter<Group>
            columns={columns}
            globalFilter={globalFilter}
            onGlobalFilterChange={handleGlobalFilterChange}
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
      />
    </div>
  );
};

export default GroupTable;
