"use client";

import { User } from "@/mocks/users";
import { columns } from "./columns";
import { MemberDataTable } from "./data-table";

interface MemberTableProps {
  users: User[];
}

const MemberTable = ({ users }: MemberTableProps) => {
  return <MemberDataTable columns={columns} data={users} />;
};

export default MemberTable;
