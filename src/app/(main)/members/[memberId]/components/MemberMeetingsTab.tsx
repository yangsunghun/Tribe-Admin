"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

interface MeetingItem {
  no: number;
  meetingId: string;
  meetingName: string;
  display: string;
  thumbnail: string;
  participants: number;
  status: string;
  startDate: string;
  endDate: string;
  registrant: string;
  registeredAt: string;
}
interface MeetingDetail {
  meetingId: string;
  meetingName: string;
  status: string;
  thumbnail: string;
  period: string;
  goal: string;
  authRule: string;
  challengeStatus: string;
  gender: string;
  age: string;
  participants: string;
  place: string;
  description: string;
  challengeRule: string;
  display: string;
  nickname: string;
  reportCount: number;
  registrant: string;
  registeredAt: string;
  editor: string;
  updatedAt: string;
}

interface MemberMeetingsTabProps {
  meetings: MeetingItem[];
  meetingDetail: MeetingDetail;
}

const MemberMeetingsTab = ({ meetings, meetingDetail }: MemberMeetingsTabProps) => {
  const [open, setOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetail | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>번호</TableHead>
            <TableHead>모임번호</TableHead>
            <TableHead>모임명</TableHead>
            <TableHead>전시여부</TableHead>
            <TableHead>썸네일</TableHead>
            <TableHead>참여인원</TableHead>
            <TableHead>진행상태</TableHead>
            <TableHead>모임 시작일</TableHead>
            <TableHead>모임 종료일</TableHead>
            <TableHead>등록자</TableHead>
            <TableHead>등록일시</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((item) => (
            <TableRow
              key={item.no}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedMeeting(meetingDetail);
                setOpen(true);
              }}
            >
              <TableCell>{item.no}</TableCell>
              <TableCell>{item.meetingId}</TableCell>
              <TableCell>{item.meetingName}</TableCell>
              <TableCell>{item.display}</TableCell>
              <TableCell>
                <img src={item.thumbnail} alt="thumb" className="h-10 w-10 rounded" />
              </TableCell>
              <TableCell>{item.participants}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.endDate}</TableCell>
              <TableCell>{item.registrant}</TableCell>
              <TableCell>{item.registeredAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>모임 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedMeeting && (
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <img src={selectedMeeting.thumbnail} alt="thumb" className="h-16 w-16 rounded" />
                <div>
                  <div className="text-lg font-bold">{selectedMeeting.meetingName}</div>
                  <div className="text-sm text-gray-500">모임번호: {selectedMeeting.meetingId}</div>
                  <div className="text-sm">진행상태: {selectedMeeting.status}</div>
                </div>
              </div>
              <div>모임 기간: {selectedMeeting.period}</div>
              <div>목표: {selectedMeeting.goal}</div>
              <div>인증규칙: {selectedMeeting.authRule}</div>
              <div>챌린지 현황: {selectedMeeting.challengeStatus}</div>
              <div>성별: {selectedMeeting.gender}</div>
              <div>나이: {selectedMeeting.age}</div>
              <div>참여인원/최대인원: {selectedMeeting.participants}</div>
              <div>장소: {selectedMeeting.place}</div>
              <div>모임소개: {selectedMeeting.description}</div>
              <div>챌린지 규칙: {selectedMeeting.challengeRule}</div>
              <div>전시여부: {selectedMeeting.display}</div>
              <div>닉네임: {selectedMeeting.nickname}</div>
              <div>신고횟수: {selectedMeeting.reportCount}</div>
              <div>등록자: {selectedMeeting.registrant}</div>
              <div>등록일시: {selectedMeeting.registeredAt}</div>
              <div>수정자: {selectedMeeting.editor}</div>
              <div>수정일시: {selectedMeeting.updatedAt}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberMeetingsTab;
