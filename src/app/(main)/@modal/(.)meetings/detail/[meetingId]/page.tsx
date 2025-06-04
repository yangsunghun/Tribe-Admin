"use client";

import ModalBg from "@/components/etc/ModalBg";
import useMeetingDetail from "@/hooks/meetings/useMeetingDetail";
import { useParams } from "next/navigation";
import Loading from "../../../loading";

const MeetingDetailModal = () => {
  const params = useParams();

  const { meetingDetail, isPending, isError } = useMeetingDetail(params.meetingId as string);

  if (isPending) {
    return <Loading />;
  }

  if (isError || !meetingDetail) {
    return <div>미팅을 찾을 수 없습니다.</div>;
  }

  return (
    <ModalBg>
      <div className="inner relative max-w-[1080px] rounded-2xl bg-white p-10 shadow-lg">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">{meetingDetail.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>모임장: {meetingDetail.nickname}</span>
            <span>•</span>
            <span>
              참가자: {meetingDetail.participants}/{meetingDetail.max_participants}명
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">모임 정보</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">모임 유형:</span> {meetingDetail.group_type}
                </p>
                <p>
                  <span className="font-medium">미팅 방식:</span> {meetingDetail.meeting_type}
                </p>
                <p>
                  <span className="font-medium">장소:</span> {meetingDetail.location_address || "온라인"}
                </p>
                <p>
                  <span className="font-medium">성별 제한:</span> {meetingDetail.gender_restriction}
                </p>
                <p>
                  <span className="font-medium">연령대:</span> {meetingDetail.age}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">모임 목표</h2>
              <p className="text-gray-700">{meetingDetail.goal}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">상세 설명</h2>
              <p className="whitespace-pre-wrap text-gray-700">{meetingDetail.description_detail}</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">인증 규칙</h2>
              <p className="text-gray-700">{meetingDetail.challengeRule}</p>
            </div>
          </div>
        </div>
      </div>
    </ModalBg>
  );
};

export default MeetingDetailModal;
