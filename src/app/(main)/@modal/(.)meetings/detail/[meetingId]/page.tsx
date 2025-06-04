"use client";

import Loading from "@/app/(main)/loading";
import ModalBg from "@/components/etc/ModalBg";
import { mockMeetings } from "@/mocks/meetings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const fetchMeetingDetail = async (meetingId: string) => {
  // API 호출을 시뮬레이션하기 위해 약간의 지연 추가
  await new Promise((resolve) => setTimeout(resolve, 500));
  const foundMeeting = mockMeetings.find((group) => group.group_id === meetingId);
  if (!foundMeeting) {
    throw new Error("Meeting not found");
  }
  return foundMeeting;
};

const MeetingDetailModal = () => {
  const params = useParams();
  const {
    data: meeting,
    isLoading,
    error
  } = useQuery({
    queryKey: ["meeting", params.meetingId],
    queryFn: () => fetchMeetingDetail(params.meetingId as string)
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !meeting) {
    return (
      <ModalBg>
        <div className="inner relative max-w-[1080px] rounded-2xl bg-white p-10 shadow-lg">
          <div className="text-lg">미팅을 찾을 수 없습니다.</div>
        </div>
      </ModalBg>
    );
  }

  return (
    <ModalBg>
      <div className="inner relative max-w-[1080px] rounded-2xl bg-white p-10 shadow-lg">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">{meeting.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>모임장: {meeting.nickname}</span>
            <span>•</span>
            <span>
              참가자: {meeting.participants}/{meeting.max_participants}명
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">모임 정보</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">모임 유형:</span> {meeting.group_type}
                </p>
                <p>
                  <span className="font-medium">미팅 방식:</span> {meeting.meeting_type}
                </p>
                <p>
                  <span className="font-medium">장소:</span> {meeting.location_address || "온라인"}
                </p>
                <p>
                  <span className="font-medium">성별 제한:</span> {meeting.gender_restriction}
                </p>
                <p>
                  <span className="font-medium">연령대:</span> {meeting.age}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">모임 목표</h2>
              <p className="text-gray-700">{meeting.goal}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">상세 설명</h2>
              <p className="whitespace-pre-wrap text-gray-700">{meeting.description_detail}</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">인증 규칙</h2>
              <p className="text-gray-700">{meeting.challengeRule}</p>
            </div>
          </div>
        </div>
      </div>
    </ModalBg>
  );
};

export default MeetingDetailModal;
