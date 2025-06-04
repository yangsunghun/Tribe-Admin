import { mockGroups } from "@/mocks/groups";

const getMeetingDetail = async (meetingId: string) => {
  // API 호출을 시뮬레이션하기 위해 약간의 지연 추가
  await new Promise((resolve) => setTimeout(resolve, 500));
  const foundMeeting = mockGroups.find((group) => group.group_id === meetingId);
  if (!foundMeeting) {
    throw new Error("Meeting not found");
  }
  return foundMeeting;
};

export default getMeetingDetail;
