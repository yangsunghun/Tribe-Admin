import { Group } from "@/mocks/groups";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Group>[] = [
  {
    accessorKey: "no",
    header: "번호",
    cell: ({ row }) => row.index + 1,
    enableSorting: false
  },
  {
    accessorKey: "group_id",
    header: "모임번호",
    cell: ({ row }) => (
      <Link href={`/meetings/${row.original.group_id}`} className="text-blue-600 underline">
        {row.original.group_id}
      </Link>
    ),
    enableSorting: false
  },
  {
    accessorKey: "title",
    header: "모임명",
    cell: ({ row }) => (
      <Link href={`/meetings/${row.original.group_id}`} className="text-blue-600 underline">
        {row.original.title}
      </Link>
    ),
    enableSorting: false
  },
  {
    accessorKey: "display",
    header: "전시여부",
    cell: ({ row }) => (row.original.display === "Y" ? "전시" : "비전시"),
    enableSorting: false
  },
  {
    accessorKey: "thumbnail",
    header: "썸네일 이미지",
    cell: ({ row }) =>
      row.original.thumbnail ? <img src={row.original.thumbnail} alt="thumb" className="h-10 w-10 rounded" /> : "-",
    enableSorting: false
  },
  {
    accessorKey: "participants",
    header: "참여인원",
    cell: ({ row }) => `${row.original.participants}/${row.original.max_participants}`,
    enableSorting: false
  },
  {
    accessorKey: "status",
    header: "진행상태",
    enableSorting: false
  },
  {
    accessorKey: "created_at",
    header: "모임 시작일",
    cell: ({ row }) => row.original.created_at.slice(0, 10),
    enableSorting: true
  },
  {
    accessorKey: "expired_at",
    header: "모임 종료일",
    cell: ({ row }) => (row.original.expired_at ? row.original.expired_at.slice(0, 10) : "-"),
    enableSorting: true
  },
  {
    accessorKey: "registrant",
    header: "등록자",
    enableSorting: false
  },
  {
    accessorKey: "registeredAt",
    header: "등록일시",
    cell: ({ row }) => row.original.registeredAt.slice(0, 10),
    enableSorting: true
  },
  {
    accessorKey: "editor",
    header: "수정자",
    enableSorting: false
  },
  {
    accessorKey: "updated_at",
    header: "수정일시",
    cell: ({ row }) => row.original.updated_at.slice(0, 10),
    enableSorting: true
  }
];
