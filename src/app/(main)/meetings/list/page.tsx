import { mockMeetings } from "@/mocks/meetings";
import MeetingTable from "./components/MeetingTable";

const MeetingsListPage = () => {
  return (
    <>
      <MeetingTable meetings={mockMeetings} />
    </>
  );
};

export default MeetingsListPage;
