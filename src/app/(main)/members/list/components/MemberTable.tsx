"use client";

import { User } from "@/mocks/users";
import Link from "next/link";

interface MemberTableProps {
  users: User[];
}

const MemberTable = ({ users }: MemberTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg border border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border-b px-4 py-2">프로필</th>
            <th className="border-b px-4 py-2">이름</th>
            <th className="border-b px-4 py-2">이메일</th>
            <th className="border-b px-4 py-2">가입유형</th>
            <th className="border-b px-4 py-2">성별</th>
            <th className="border-b px-4 py-2">상태</th>
            <th className="border-b px-4 py-2">가입일</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.user_id}
              className="cursor-pointer text-center hover:bg-gray-50"
              tabIndex={0}
              onClick={() => {}}
            >
              <td className="border-b px-4 py-2">
                {user.profile_img ? (
                  <img src={user.profile_img} alt={user.name} className="mx-auto h-10 w-10 rounded-full" />
                ) : (
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                    <span className="text-lg">?</span>
                  </div>
                )}
              </td>
              <td className="border-b px-4 py-2 font-semibold">
                <Link href={`/members/${user.user_id}`} className="hover:underline">
                  {user.name}
                </Link>
              </td>
              <td className="border-b px-4 py-2">{user.email}</td>
              <td className="border-b px-4 py-2">{user.join_type}</td>
              <td className="border-b px-4 py-2">{user.gender === "MALE" ? "남" : "여"}</td>
              <td className="border-b px-4 py-2">
                <span className={user.status === "ACTIVE" ? "font-bold text-green-600" : "font-bold text-gray-400"}>
                  {user.status === "ACTIVE" ? "활성" : "비활성"}
                </span>
              </td>
              <td className="border-b px-4 py-2">{user.created_at.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
