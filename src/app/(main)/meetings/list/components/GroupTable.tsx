"use client";

import { Group } from "@/mocks/groups";
import { columns } from "./columns";
import { MeetingDataTable } from "./data-table";

interface GroupTableProps {
  groups: Group[];
}

const GroupTable = ({ groups }: GroupTableProps) => <MeetingDataTable columns={columns} data={groups} />;

export default GroupTable;
