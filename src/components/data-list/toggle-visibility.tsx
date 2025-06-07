import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Eye } from "lucide-react";

interface ToggleVisibilityProps<TData> {
  columns: ColumnDef<TData>[];
  columnVisibility: VisibilityState;
  onColumnVisibilityChange: (value: VisibilityState) => void;
}

export function ToggleVisibility<TData>({
  columns,
  columnVisibility,
  onColumnVisibilityChange
}: ToggleVisibilityProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Eye className="mr-2 h-4 w-4" />
          컬럼 보기
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns
          .filter((column) => column.id !== "선택")
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.id ? columnVisibility[column.id] : false}
                onCheckedChange={(value) =>
                  onColumnVisibilityChange({
                    ...columnVisibility,
                    [column.id as string]: value
                  })
                }
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
