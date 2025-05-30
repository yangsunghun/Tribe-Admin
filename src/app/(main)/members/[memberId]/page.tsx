import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/mocks/users";
import MemberHistoryTab from "./components/MemberHistoryTab";
import MemberInfoTab from "./components/MemberInfoTab";
import MemberMeetingsTab from "./components/MemberMeetingsTab";
import { changeHistory, loginHistory, meetingDetail, meetings } from "./mockData";

interface MemberDetailPageProps {
  params: { memberId: string };
}

const MemberDetailPage = ({ params }: MemberDetailPageProps) => {
  const user = mockUsers.find((u) => u.user_id === params.memberId);
  if (!user) {
    return <div className="p-6 text-red-500">존재하지 않는 회원입니다.</div>;
  }
  return (
    <div className="mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">회원 상세 정보</h1>
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
    </div>
  );
};

export default MemberDetailPage;
