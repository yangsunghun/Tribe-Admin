import type { ColumnDef, ColumnFiltersState, OnChangeFn, VisibilityState } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

export type DateFilterType = "registrant" | "editor" | "meetingStart" | "meetingEnd";

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  renderTextFilter?: (props: TextFilterProps) => React.ReactNode;
  renderDateFilter?: (props: DateFilterProps) => React.ReactNode;
  columnFilters: ColumnFiltersState;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  columnVisibility: VisibilityState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
}

export interface TextFilterProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  placeholder?: string;
}

export interface DateFilterProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  dateFilterOptions: { value: DateFilterType; label: string }[];
  selectedDateFilter: DateFilterType;
  onDateFilterChange: (value: DateFilterType) => void;
}

export interface ToggleVisibilityProps {
  columns: ColumnDef<unknown>[];
  columnVisibility: VisibilityState;
  setColumnVisibility: OnChangeFn<VisibilityState>;
}
