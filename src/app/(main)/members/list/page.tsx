import { mockUsers } from "@/mocks/users";
import MemberTable from "./components/MemberTable";

const MembersListPage = () => {
  return (
    <>
      <MemberTable users={mockUsers} />
    </>
  );
};

export default MembersListPage;
