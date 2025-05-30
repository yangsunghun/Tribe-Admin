import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LoginHistoryItem {
  id: number;
  path: string;
  sessionId: string;
  authType: string;
  round: number;
  ip: string;
  loginAt: string;
}
interface ChangeHistoryItem {
  no: number;
  type: string;
  content: string;
  editor: string;
  updatedAt: string;
}

interface MemberHistoryTabProps {
  loginHistory: LoginHistoryItem[];
  changeHistory: ChangeHistoryItem[];
}

const MemberHistoryTab = ({ loginHistory, changeHistory }: MemberHistoryTabProps) => (
  <div>
    <h2 className="mt-4 mb-2 text-lg font-semibold">로그인 이력</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>고유번호</TableHead>
          <TableHead>로그인 경로</TableHead>
          <TableHead>세션 아이디</TableHead>
          <TableHead>인증유형</TableHead>
          <TableHead>회차</TableHead>
          <TableHead>접속 아이피</TableHead>
          <TableHead>로그인일시</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loginHistory.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.path}</TableCell>
            <TableCell>{item.sessionId}</TableCell>
            <TableCell>{item.authType}</TableCell>
            <TableCell>{item.round}</TableCell>
            <TableCell>{item.ip}</TableCell>
            <TableCell>{item.loginAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <h2 className="mt-6 mb-2 text-lg font-semibold">변경 이력</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>번호</TableHead>
          <TableHead>구분</TableHead>
          <TableHead>변경내용</TableHead>
          <TableHead>수정자</TableHead>
          <TableHead>수정일시</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {changeHistory.map((item) => (
          <TableRow key={item.no}>
            <TableCell>{item.no}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.content}</TableCell>
            <TableCell>{item.editor}</TableCell>
            <TableCell>{item.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default MemberHistoryTab;
