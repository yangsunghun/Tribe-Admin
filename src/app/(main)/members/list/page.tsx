import { mockUsers } from "@/mocks/users";
import MemberTable from "./components/MemberTable";

const MembersListPage = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">회원 리스트</h1>
      <MemberTable users={mockUsers} />
    </div>
  );
};

export default MembersListPage;
