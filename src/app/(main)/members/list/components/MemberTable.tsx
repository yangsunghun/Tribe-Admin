"use client";

import { columns } from "@/components/ui/data-table/columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { User } from "@/mocks/users";

interface MemberTableProps {
  users: User[];
}

const MemberTable = ({ users }: MemberTableProps) => {
  return <DataTable columns={columns} data={users} />;
};

export default MemberTable;
