import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Search, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface TextFilterProps<TData> {
  columns: (ColumnDef<TData> & { enableSearch?: boolean })[];
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
}

export function TextFilter<TData>({ columns, globalFilter, onGlobalFilterChange }: TextFilterProps<TData>) {
  const [inputValue, setInputValue] = useState(globalFilter);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGlobalFilterChange(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onGlobalFilterChange("");
  };

  const columnOptions = columns
    .filter((column) => {
      // header가 문자열이고, accessorKey가 있으며, search가 true인 컬럼만 필터링
      return (column as any).accessorKey && column.enableSearch !== false;
    })
    .map((column) => ({
      id: (column as any).accessorKey,
      label: column.id as string
    }));

  const getPlaceholder = () => {
    if (!selectedColumn) return "전체 검색";
    const selectedLabel = columnOptions.find((col) => col.id === selectedColumn)?.label;
    return `${selectedLabel} 검색`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="w-[150px] justify-between">
            {selectedColumn ? columnOptions.find((col) => col.id === selectedColumn)?.label : "전체"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0" align="start">
          <div className="flex flex-col">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedColumn(null)}>
              전체
            </Button>
            {columnOptions.map((column) => (
              <Button
                key={column.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setSelectedColumn(column.id)}
              >
                {column.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="relative">
        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
        <Input
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="pl-8"
        />
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" size="sm">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
