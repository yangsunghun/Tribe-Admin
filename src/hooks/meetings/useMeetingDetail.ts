import getMeetingDetail from "@/queries/meetings/getMeetingDetail";
import { useQuery } from "@tanstack/react-query";

const useMeetingDetail = (meetingId: string) => {
  const {
    data: meetingDetail,
    isPending,
    isError
  } = useQuery({
    queryKey: ["meetingDetail", meetingId],
    queryFn: () => getMeetingDetail(meetingId)
  });

  return { meetingDetail, isPending, isError };
};

export default useMeetingDetail;
