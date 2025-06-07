import { type ColumnDef, type ColumnFiltersState, type OnChangeFn, type VisibilityState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

// accessorKey를 가진 컬럼 타입 정의
type ColumnWithAccessor<TData> = ColumnDef<TData> & {
  accessorKey?: string;
};

interface UseTableFiltersProps<TData> {
  columns: ColumnWithAccessor<TData>[];
}

export function useTableFilters<TData>({ columns }: UseTableFiltersProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  // 컬럼 매핑을 한 번만 생성
  const columnMap = useMemo(() => {
    return columns.reduce(
      (acc, col) => {
        if (col.accessorKey) {
          acc[col.accessorKey] = col;
        }
        return acc;
      },
      {} as Record<string, ColumnWithAccessor<TData>>
    );
  }, [columns]);

  const handleColumnVisibilityChange: OnChangeFn<VisibilityState> = (value) => {
    setColumnVisibility(typeof value === "function" ? value(columnVisibility) : value);
  };

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (value) => {
    setColumnFilters(typeof value === "function" ? value(columnFilters) : value);
  };

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    if (selectedColumn) {
      setColumnFilters((prev) => {
        const column = columnMap[selectedColumn];
        if (!column) return prev;

        // id가 없으면 accessorKey를 사용
        const columnId = column.id || column.accessorKey;
        if (!columnId) return prev; // columnId가 없는 경우 필터 추가하지 않음

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

  const handleSelectedColumnChange = (value: string | null) => {
    setSelectedColumn(value);
    setGlobalFilter("");
  };

  return {
    columnFilters,
    setColumnFilters: handleColumnFiltersChange,
    globalFilter,
    setGlobalFilter,
    columnVisibility,
    setColumnVisibility: handleColumnVisibilityChange,
    selectedColumn,
    columnMap,
    handleColumnVisibilityChange,
    handleGlobalFilterChange,
    handleSelectedColumnChange
  };
}
