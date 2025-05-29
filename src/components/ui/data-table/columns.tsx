import { User } from "@/mocks/users";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "../badge";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "profile_img",
    header: "프로필",
    cell: ({ row }) => {
      const user = row.original;
      return user.profile_img ? (
        <img src={user.profile_img} alt={user.name} className="mx-auto h-10 w-10 rounded-full" />
      ) : (
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-400">
          <span className="text-lg">?</span>
        </div>
      );
    }
  },
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link href={`/members/${user.user_id}`} className="font-semibold hover:underline">
          {user.name}
        </Link>
      );
    }
  },
  {
    accessorKey: "email",
    header: "이메일"
  },
  {
    accessorKey: "join_type",
    header: "가입유형"
  },
  {
    accessorKey: "gender",
    header: "성별",
    cell: ({ row }) => {
      return row.original.gender === "MALE" ? "남" : "여";
    }
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "ACTIVE" ? "success" : "secondary"}>{status === "ACTIVE" ? "활성" : "비활성"}</Badge>
      );
    }
  },
  {
    accessorKey: "created_at",
    header: "가입일",
    cell: ({ row }) => {
      return row.original.created_at.slice(0, 10);
    }
  }
];
