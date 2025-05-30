import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User } from "@/mocks/users";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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
        <Image width={32} height={32} src={user.profile_img} alt={user.name} className="inline-block rounded-full" />
      ) : (
        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <UserRound size={16} />
        </div>
      );
    }
  },
  {
    accessorKey: "nickname",
    header: "닉네임"
  },
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link href={`/members/${user.user_id}`} className="font-semibold hover:underline">
          {user.name || "-"}
        </Link>
      );
    }
  },
  {
    accessorKey: "email",
    header: ({ column, table }) => {
      // 테이블 데이터에서 도메인 목록 추출
      const domains = useMemo(() => {
        const emails = table.getPreFilteredRowModel().rows.map((row) => row.original.email);
        const uniqueDomains = Array.from(new Set(emails.map((email) => email.split("@")[1])));
        return uniqueDomains;
      }, [table]);
      const currentFilter = column.getFilterValue() as string | undefined;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              이메일
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
              className={!currentFilter ? "font-bold" : ""}
            >
              전체
            </DropdownMenuItem>
            {domains.map((domain) => (
              <DropdownMenuItem
                key={domain}
                onClick={() => column.setFilterValue(domain)}
                className={currentFilter === domain ? "font-bold" : ""}
              >
                {domain}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const email = row.getValue(columnId) as string;
      return email.endsWith("@" + filterValue);
    },
    enableSorting: false // 정렬은 비활성화
  },
  {
    accessorKey: "gender",
    header: ({ column, table }) => {
      const genders = ["남", "여"];
      const currentFilter = column.getFilterValue() as string | undefined;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              성별
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
              className={!currentFilter ? "font-bold" : ""}
            >
              전체
            </DropdownMenuItem>
            {genders.map((gender) => (
              <DropdownMenuItem
                key={gender}
                onClick={() => column.setFilterValue(gender)}
                className={currentFilter === gender ? "font-bold" : ""}
              >
                {gender}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      return row.original.gender === "MALE" ? "남" : "여";
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const gender = row.original.gender === "MALE" ? "남" : "여";
      return gender === filterValue;
    },
    enableSorting: false
  },
  {
    accessorKey: "birth_date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          생년월일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.birth_date?.slice(0, 10) || "-";
    },
    enableSorting: true
  },
  {
    accessorKey: "age_group",
    header: ({ column, table }) => {
      // 테이블 데이터에서 연령대 목록 추출
      const ageGroups = useMemo(() => {
        const ages = table.getPreFilteredRowModel().rows.map((row) => calculateAgeGroup(row.original.birth_date));
        return Array.from(new Set(ages));
      }, [table]);
      const currentFilter = column.getFilterValue() as string | undefined;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              연령대
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
              className={!currentFilter ? "font-bold" : ""}
            >
              전체
            </DropdownMenuItem>
            {ageGroups.map((ageGroup) => (
              <DropdownMenuItem
                key={ageGroup}
                onClick={() => column.setFilterValue(ageGroup)}
                className={currentFilter === ageGroup ? "font-bold" : ""}
              >
                {ageGroup}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => calculateAgeGroup(row.original.birth_date),
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const ageA = parseInt(calculateAgeGroup(rowA.original.birth_date));
      const ageB = parseInt(calculateAgeGroup(rowB.original.birth_date));
      return ageA - ageB;
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return calculateAgeGroup(row.original.birth_date) === filterValue;
    }
  },
  {
    accessorKey: "marketing_agreed",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          마케팅 활용동의
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge className="text-small" variant={row.original.marketing_agreed ? "success" : "secondary"}>
          {row.original.marketing_agreed ? "동의" : "미동의"}
        </Badge>
      );
    },
    enableSorting: true
  }
];
