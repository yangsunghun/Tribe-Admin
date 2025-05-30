import { mockGroups } from "@/mocks/groups";
import GroupTable from "./components/GroupTable";

const MeetingsListPage = () => {
  return (
    <>
      <GroupTable groups={mockGroups} />
    </>
  );
};

export default MeetingsListPage;
