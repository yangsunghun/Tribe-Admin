import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ToggleVisibilityProps<TData> {
  columns: ColumnDef<TData>[];
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (columnId: string, visible: boolean) => void;
}

export function ToggleVisibility<TData>({
  columns,
  columnVisibility,
  onColumnVisibilityChange
}: ToggleVisibilityProps<TData>) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          컬럼
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columnDefinitions
          .filter((column) => column.canHide !== false)
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={columnVisibility[column.id] ?? true}
              onCheckedChange={(value) => onColumnVisibilityChange(column.id, value)}
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
