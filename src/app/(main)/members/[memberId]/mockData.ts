export const loginHistory = [
  {
    id: 1,
    path: "/login",
    sessionId: "sess-123",
    authType: "PASSWORD",
    round: 1,
    ip: "192.168.0.1",
    loginAt: "2024-06-01 10:00"
  },
  {
    id: 2,
    path: "/login",
    sessionId: "sess-456",
    authType: "GOOGLE",
    round: 2,
    ip: "192.168.0.2",
    loginAt: "2024-06-02 11:00"
  },
  {
    id: 3,
    path: "/login",
    sessionId: "sess-789",
    authType: "NAVER",
    round: 3,
    ip: "192.168.0.3",
    loginAt: "2024-06-03 12:00"
  }
];

export const changeHistory = [
  { no: 1, type: "비밀번호 변경", content: "비밀번호 변경", editor: "관리자", updatedAt: "2024-06-01 09:00" },
  {
    no: 2,
    type: "이메일 변경",
    content: "user1@gmail.com → user1@naver.com",
    editor: "관리자",
    updatedAt: "2024-06-02 10:00"
  },
  { no: 3, type: "닉네임 변경", content: "홍길동1 → 홍길동2", editor: "관리자", updatedAt: "2024-06-03 11:00" }
];

export const meetings = [
  {
    no: 1,
    meetingId: "M001",
    meetingName: "헬스 모임",
    display: "Y",
    thumbnail: "/thumb1.jpg",
    participants: 12,
    status: "진행중",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    registrant: "홍길동",
    registeredAt: "2024-05-20"
  },
  {
    no: 2,
    meetingId: "M002",
    meetingName: "스터디 모임",
    display: "N",
    thumbnail: "/thumb2.jpg",
    participants: 8,
    status: "종료",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    registrant: "김영희",
    registeredAt: "2024-04-15"
  },
  {
    no: 3,
    meetingId: "M003",
    meetingName: "등산 모임",
    display: "Y",
    thumbnail: "/thumb3.jpg",
    participants: 20,
    status: "진행중",
    startDate: "2024-06-10",
    endDate: "2024-07-10",
    registrant: "이철수",
    registeredAt: "2024-05-25"
  }
];

export const meetingDetail = {
  meetingId: "M001",
  meetingName: "헬스 모임",
  status: "진행중",
  thumbnail: "/thumb1.jpg",
  period: "2024-06-01 ~ 2024-06-30",
  goal: "매일 1만보 걷기",
  authRule: "매일 인증 필수",
  challengeStatus: "진행중",
  gender: "남/여",
  age: "20~30대",
  participants: "12/20",
  place: "서울 강남구",
  description: "건강을 위한 헬스 모임입니다.",
  challengeRule: "매일 1회 인증",
  display: "Y",
  nickname: "헬스짱",
  reportCount: 0,
  registrant: "홍길동",
  registeredAt: "2024-05-20",
  editor: "관리자",
  updatedAt: "2024-06-01"
};
