import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Group } from "@/mocks/groups";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type ExtendedColumnDef<TData> = ColumnDef<TData> & {
  enableSearch?: boolean | false;
};

export const columns: ExtendedColumnDef<Group>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableSearch: false
  },
  {
    accessorKey: "no",
    id: "번호",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          번호
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableSearch: false
  },
  {
    accessorKey: "group_id",
    id: "모임번호",
    header: "모임번호",
    cell: ({ row }) => (
      <Link href={`/meetings/${row.original.group_id}/view`} className="hover:underline">
        {row.original.group_id}
      </Link>
    ),
    enableSorting: false,
    enableSearch: true
  },
  {
    accessorKey: "title",
    id: "모임명",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          모임명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link href={`/meetings/${row.original.group_id}`} className="hover:underline">
        {row.original.title}
      </Link>
    ),
    enableSorting: false,
    enableSearch: true
  },
  {
    accessorKey: "display",
    id: "전시여부",
    header: ({ column }) => {
      const options = ["Y", "N"];
      const currentFilter = column.getFilterValue() as string | undefined;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              전시여부
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
              className={!currentFilter ? "font-bold" : ""}
            >
              전체
            </DropdownMenuItem>
            {options.map((opt) => (
              <DropdownMenuItem
                key={opt}
                onClick={() => column.setFilterValue(opt)}
                className={currentFilter === opt ? "font-bold" : ""}
              >
                {opt === "Y" ? "전시" : "비전시"}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => (row.original.display === "Y" ? "전시" : "비전시"),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.original.display === filterValue;
    },
    enableSorting: false,
    enableSearch: false
  },
  {
    accessorKey: "thumbnail",
    id: "썸네일 이미지",
    header: "썸네일 이미지",
    cell: ({ row }) =>
      row.original.thumbnail ? (
        <Image src={row.original.thumbnail} width={32} height={32} alt="thumb" className="inline-block rounded" />
      ) : (
        "-"
      ),
    enableSorting: false,
    enableSearch: false
  },
  {
    accessorKey: "participants",
    id: "참여인원",
    header: "참여인원",
    cell: ({ row }) => `${row.original.participants}/${row.original.max_participants}`,
    enableSorting: false,
    enableSearch: false
  },
  {
    accessorKey: "status",
    id: "진행상태",
    header: ({ column, table }) => {
      // 진행상태 목록 추출
      const statuses = useMemo(() => {
        const all = table.getPreFilteredRowModel().rows.map((row) => row.original.status);
        return Array.from(new Set(all));
      }, [table]);
      const currentFilter = column.getFilterValue() as string | undefined;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              진행상태
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
              className={!currentFilter ? "font-bold" : ""}
            >
              전체
            </DropdownMenuItem>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => column.setFilterValue(status)}
                className={currentFilter === status ? "font-bold" : ""}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.original.status === filterValue;
    },
    enableSorting: false,
    enableSearch: false
  },
  {
    accessorKey: "created_at",
    id: "모임시작일",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          모임 시작일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.created_at.slice(0, 10),
    enableSorting: true,
    enableSearch: false,
    filterFn: (row, columnId, filterValue: any) => {
      const date = row.getValue(columnId) as string;
      if (!date || !filterValue?.from) return true;

      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);

      const startDate = new Date(filterValue.from);
      startDate.setHours(0, 0, 0, 0);

      const endDate = filterValue.to ? new Date(filterValue.to) : null;
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }

      return compareDate >= startDate && (!endDate || compareDate <= endDate);
    }
  },
  {
    accessorKey: "expired_at",
    id: "모임종료일",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          모임 종료일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (row.original.expired_at ? row.original.expired_at.slice(0, 10) : "-"),
    enableSorting: true,
    enableSearch: false,
    filterFn: (row, columnId, filterValue: any) => {
      const date = row.getValue(columnId) as string;
      if (!date || !filterValue?.from) return true;

      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);

      const startDate = new Date(filterValue.from);
      startDate.setHours(0, 0, 0, 0);

      const endDate = filterValue.to ? new Date(filterValue.to) : null;
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }

      return compareDate >= startDate && (!endDate || compareDate <= endDate);
    }
  },
  {
    accessorKey: "registrant",
    id: "등록자",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          등록자
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: false,
    enableSearch: true
  },
  {
    accessorKey: "registeredAt",
    id: "등록일시",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          등록일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.registeredAt.slice(0, 10),
    enableSorting: true,
    enableSearch: false,
    filterFn: (row, columnId, filterValue: any) => {
      const date = row.getValue(columnId) as string;
      if (!date || !filterValue?.from) return true;

      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);

      const startDate = new Date(filterValue.from);
      startDate.setHours(0, 0, 0, 0);

      const endDate = filterValue.to ? new Date(filterValue.to) : null;
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }

      return compareDate >= startDate && (!endDate || compareDate <= endDate);
    }
  },
  {
    accessorKey: "editor",
    id: "수정자",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          수정자
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: false,
    enableSearch: true
  },
  {
    accessorKey: "updated_at",
    id: "수정일시",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          수정일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.updated_at.slice(0, 10),
    enableSorting: true,
    enableSearch: false,
    filterFn: (row, columnId, filterValue: any) => {
      const date = row.getValue(columnId) as string;
      if (!date || !filterValue?.from) return true;

      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);

      const startDate = new Date(filterValue.from);
      startDate.setHours(0, 0, 0, 0);

      const endDate = filterValue.to ? new Date(filterValue.to) : null;
      if (endDate) {
        endDate.setHours(23, 59, 59, 999);
      }

      return compareDate >= startDate && (!endDate || compareDate <= endDate);
    }
  }
];
