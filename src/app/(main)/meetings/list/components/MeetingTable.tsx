"use client";

import { DataTable } from "@/components/data-list/data-table";
import { DateFilter, type DateFilterType } from "@/components/data-list/date-filter";
import { TextFilter } from "@/components/data-list/text-filter";
import { ToggleVisibility } from "@/components/data-list/toggle-visibility";
import { useTableFilters } from "@/hooks/useTableFilters";
import type { Meeting } from "@/mocks/meetings";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { columns } from "./columns";

interface MeetingTableProps {
  meetings: Meeting[];
}

const dateFilterOptions = [
  { value: "registrant" as const, label: "등록일시" },
  { value: "editor" as const, label: "수정일시" },
  { value: "meetingStart" as const, label: "모임시작일" },
  { value: "meetingEnd" as const, label: "모임종료일" }
];

const dateFilterColumnMap = {
  registrant: "등록일시",
  editor: "수정일시",
  meetingStart: "모임시작일",
  meetingEnd: "모임종료일"
} as const;

const MeetingTable = ({ meetings }: MeetingTableProps) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterType>("registrant");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const {
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    columnVisibility,
    setColumnVisibility,
    selectedColumn,
    handleColumnVisibilityChange,
    handleGlobalFilterChange,
    handleSelectedColumnChange
  } = useTableFilters<Meeting>({ columns });

  const handleDateFilterChange = (value: DateFilterType) => {
    console.log("Date Filter Changed:", value);
    setSelectedDateFilter(value);
    // 날짜 필터 변경 시 기존 날짜 필터 제거
    setColumnFilters((prev) => {
      const newFilters = prev.filter((filter) => !Object.values(dateFilterColumnMap).includes(filter.id as any));
      console.log("Filters after removing date filters:", newFilters);
      return newFilters;
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    console.log("Date Range Changed:", range);
    setDateRange(range);
    if (range?.from) {
      setColumnFilters((prev) => {
        // 기존 날짜 필터 제거
        const newFilters = prev.filter((filter) => !Object.values(dateFilterColumnMap).includes(filter.id as any));
        // 새로운 날짜 필터 추가
        const columnId = dateFilterColumnMap[selectedDateFilter];
        console.log("Selected Date Filter:", selectedDateFilter);
        console.log("Column ID for filter:", columnId);
        newFilters.push({
          id: columnId,
          value: range
        });
        console.log("New filters after adding date filter:", newFilters);
        return newFilters;
      });
    } else {
      // 날짜 범위가 없으면 날짜 필터 제거
      setColumnFilters((prev) => {
        const newFilters = prev.filter((filter) => !Object.values(dateFilterColumnMap).includes(filter.id as any));
        console.log("Filters after clearing date range:", newFilters);
        return newFilters;
      });
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-4">
          <TextFilter<Meeting>
            columns={columns}
            globalFilter={globalFilter}
            onGlobalFilterChange={handleGlobalFilterChange}
            selectedColumn={selectedColumn}
            onSelectedColumnChange={handleSelectedColumnChange}
          />
          <DateFilter
            selectedDateFilter={selectedDateFilter}
            onDateFilterChange={handleDateFilterChange}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            dateFilterOptions={dateFilterOptions}
          />
        </div>

        <ToggleVisibility<Meeting>
          columns={columns}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      </div>

      <DataTable
        columns={columns}
        data={meetings}
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

export default MeetingTable;
