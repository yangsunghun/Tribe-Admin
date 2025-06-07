import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/mocks/users";
import MemberHistoryTab from "./components/MemberHistoryTab";
import MemberInfoTab from "./components/MemberInfoTab";
import MemberMeetingsTab from "./components/MemberMeetingsTab";
import { changeHistory, loginHistory, meetingDetail, meetings } from "./mockData";

interface MemberDetailPageProps {
  params: Promise<{ memberId: string }> | undefined;
}

const MemberDetailPage = async ({ params }: MemberDetailPageProps) => {
  // params가 undefined인 경우 처리
  if (!params) {
    return <div className="p-6 text-red-500">잘못된 요청입니다.</div>;
  }

  // params가 Promise이므로 await로 처리
  const resolvedParams = await params;
  const user = mockUsers.find((u) => u.user_id === resolvedParams.memberId);

  if (!user) {
    return <div className="p-6 text-red-500">존재하지 않는 회원입니다.</div>;
  }

  return (
    <>
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="info">회원정보</TabsTrigger>
          <TabsTrigger value="history">회원 이력 보기</TabsTrigger>
          <TabsTrigger value="meetings">모임 내역</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <MemberInfoTab user={user} />
        </TabsContent>
        <TabsContent value="history">
          <MemberHistoryTab loginHistory={loginHistory} changeHistory={changeHistory} />
        </TabsContent>
        <TabsContent value="meetings">
          <MemberMeetingsTab meetings={meetings} meetingDetail={meetingDetail} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MemberDetailPage;
