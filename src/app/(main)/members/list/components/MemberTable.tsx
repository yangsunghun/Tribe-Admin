"use client";

import { User } from "@/mocks/users";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface MemberTableProps {
  users: User[];
}

const MemberTable = ({ users }: MemberTableProps) => {
  return <DataTable columns={columns} data={users} />;
};

export default MemberTable;
