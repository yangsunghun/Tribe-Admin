import { mockUsers } from "@/mocks/users";

interface MemberDetailPageProps {
  params: { memberId: string };
}

const MemberDetailPage = ({ params }: MemberDetailPageProps) => {
  const user = mockUsers.find((u) => u.user_id === params.memberId);

  if (!user) {
    return <div className="p-6 text-red-500">존재하지 않는 회원입니다.</div>;
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">회원 상세 정보</h1>
      <table className="min-w-full rounded-lg border border-gray-200 bg-white">
        <tbody>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">프로필</td>
            <td className="px-4 py-2">
              {user.profile_img ? (
                <img src={user.profile_img} alt={user.name} className="h-16 w-16 rounded-full" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                  <span className="text-2xl">?</span>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">이름</td>
            <td className="px-4 py-2">{user.name}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">이메일</td>
            <td className="px-4 py-2">{user.email}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">닉네임</td>
            <td className="px-4 py-2">{user.nickname ?? "-"}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">가입유형</td>
            <td className="px-4 py-2">{user.join_type}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">성별</td>
            <td className="px-4 py-2">{user.gender === "MALE" ? "남" : "여"}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">생년월일</td>
            <td className="px-4 py-2">{user.birth_date}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">상태</td>
            <td className="px-4 py-2">{user.status === "ACTIVE" ? "활성" : "비활성"}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">가입일</td>
            <td className="px-4 py-2">{user.created_at.slice(0, 10)}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">수정일</td>
            <td className="px-4 py-2">{user.updated_at.slice(0, 10)}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">CI 값</td>
            <td className="px-4 py-2">{user.ci_value}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">약관동의</td>
            <td className="px-4 py-2">{user.terms_agreed ? "동의" : "미동의"}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">개인정보동의</td>
            <td className="px-4 py-2">{user.privacy_agreed ? "동의" : "미동의"}</td>
          </tr>
          <tr>
            <td className="bg-gray-50 px-4 py-2 font-semibold">마케팅동의</td>
            <td className="px-4 py-2">{user.marketing_agreed ? "동의" : "미동의"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MemberDetailPage;
