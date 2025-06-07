import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ColumnDef } from "@tanstack/react-table";
import { Search, X } from "lucide-react";

interface TextFilterProps<TData> {
  columns: ColumnDef<TData>[];
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  selectedColumn: string | null;
  onSelectedColumnChange: (value: string | null) => void;
}

export function TextFilter<TData>({
  columns,
  globalFilter,
  onGlobalFilterChange,
  selectedColumn,
  onSelectedColumnChange
}: TextFilterProps<TData>) {
  const searchableColumns = columns.filter((column) => {
    const col = column as ColumnDef<TData> & { enableSearch?: boolean };
    return col.enableSearch;
  });

  const getPlaceholder = () => {
    if (!selectedColumn) return "전체 검색";
    const selectedLabel = searchableColumns.find((col) => col.id === selectedColumn)?.id;
    return `${selectedLabel} 검색`;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
      <Select value={selectedColumn || "all"} onValueChange={onSelectedColumnChange}>
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="검색할 컬럼 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {searchableColumns.map((column) => (
            <SelectItem key={column.id} value={column.id as string}>
              {column.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
        <Input
          placeholder={getPlaceholder()}
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="h-8 w-[150px] pl-8"
        />
        {globalFilter && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0"
            onClick={() => onGlobalFilterChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
