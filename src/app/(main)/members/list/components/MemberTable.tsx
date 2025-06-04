"use client";

import { DataTable } from "@/components/data-list/data-table";
import { TextFilter } from "@/components/data-list/text-filter";
import { ToggleVisibility } from "@/components/data-list/toggle-visibility";
import { useTableFilters } from "@/hooks/useTableFilters";
import { User } from "@/mocks/users";
import { columns } from "./columns";

interface MemberTableProps {
  users: User[];
}

const MemberTable = ({ users }: MemberTableProps) => {
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
  } = useTableFilters<User>({ columns });

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
