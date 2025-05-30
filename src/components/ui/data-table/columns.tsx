import { User } from "@/mocks/users";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "../badge";
import { Button } from "../button";
import { Checkbox } from "../checkbox";

const calculateAgeGroup = (birthDate: string): string => {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // 생일이 지나지 않았으면 나이를 1살 줄임
  let adjustedAge = age;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    adjustedAge -= 1;
  }

  // 나이를 10으로 나눈 후 내림하여 연령대를 계산
  const ageGroup = Math.floor(adjustedAge / 10) * 10;
  return `${ageGroup}대`;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    enableHiding: false
  },
  {
    accessorKey: "profile_img",
    header: "프로필 사진",
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
    accessorKey: "nickname",
    header: "닉네임",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link href={`/members/${user.user_id}`} className="font-semibold hover:underline">
          {user.nickname || "-"}
        </Link>
      );
    }
  },
  {
    accessorKey: "name",
    header: "이름"
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          이메일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: "gender",
    header: "성별",
    cell: ({ row }) => {
      return row.original.gender === "MALE" ? "남" : "여";
    }
  },
  {
    accessorKey: "birth_date",
    header: "생년월일",
    cell: ({ row }) => {
      return row.original.birth_date?.slice(0, 10) || "-";
    }
  },
  {
    accessorKey: "age_group",
    header: "연령대",
    cell: ({ row }) => {
      return calculateAgeGroup(row.original.birth_date);
    }
  },
  {
    accessorKey: "marketing_agreed",
    header: "마케팅 활용동의",
    cell: ({ row }) => {
      return (
        <Badge className="text-caption" variant={row.original.marketing_agreed ? "success" : "secondary"}>
          {row.original.marketing_agreed ? "동의" : "미동의"}
        </Badge>
      );
    }
  }
];
