export interface Meeting {
  group_id: string;
  host_id: string;
  category_id: number;
  title: string;
  description: string;
  thumbnail?: string | null;
  group_type: "MISSON" | "CONTINUOUS";
  meeting_type: "ONLINE" | "OFFLINE";
  location_address?: string | null;
  participants: number;
  max_participants: number;
  gender_restriction: "NONE" | "MALE" | "FEMALE";
  min_age: number;
  max_age: number;
  status: "WAITING" | "ONGOIING" | "FINISHED" | "DISBANDED";
  created_at: string;
  updated_at: string;
  expired_at?: string | null;
  display: "Y" | "N";
  registrant: string;
  registeredAt: string;
  editor: string;
  nickname: string;
  reportCount: number;
  goal: string;
  authRule: string;
  challengeStatus: string;
  age: string;
  place: string;
  description_detail: string;
  challengeRule: string;
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const titles = [
  "헬스 모임입니다",
  "스터디 모임입니다",
  "등산 모임입니다",
  "요리 모임입니다",
  "영화 감상 모임입니다",
  "독서 모임입니다",
  "자전거 동호회입니다",
  "사진 모임입니다"
];
const descriptions = [
  "건강을 위한 모임입니다.",
  "함께 공부해요.",
  "주말마다 등산을 갑니다.",
  "맛있는 요리를 함께 만들어요.",
  "영화를 함께 보고 이야기해요.",
  "책을 읽고 토론합니다.",
  "자전거 타는 사람들의 모임.",
  "사진 찍는 취미를 공유합니다."
];
const groupTypes = ["MISSON", "CONTINUOUS"] as const;
const meetingTypes = ["ONLINE", "OFFLINE"] as const;
const genderRestrictions = ["NONE", "MALE", "FEMALE"] as const;
const statuses = ["WAITING", "ONGOIING", "FINISHED", "DISBANDED"] as const;
const thumbnails = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80"
];
const registrants = ["홍길동", "김영희", "이철수", "박민수", "최수정", "정우성", "한지민", "이민호"];
const editors = ["관리자", "운영자", "홍길동", "김영희"];
const nicknames = ["헬스짱", "스터디왕", "등산러", "요리사", "영화광", "책벌레", "라이더", "포토그래퍼"];
const goals = [
  "매일 1만보 걷기",
  "주 3회 공부",
  "월 2회 등산",
  "주 1회 요리",
  "월 1회 영화",
  "월 2권 독서",
  "주 1회 라이딩",
  "월 1회 출사"
];
const authRules = ["매일 인증 필수", "주 3회 인증", "월 2회 인증", "주 1회 인증"];
const challengeStatuses = ["진행중", "완료", "대기중"];
const places = ["서울 강남구", "부산 해운대구", "대구 수성구", "광주 북구"];
const challengeRules = ["매일 1회 인증", "주 3회 인증", "월 2회 인증"];

export const mockMeetings: Meeting[] = Array.from({ length: 100 }).map((_, i) => {
  const start = randomDate(new Date(2025, 0, 1), new Date(2025, 5, 1));
  const end = randomDate(new Date(2025, 5, 2), new Date(2025, 11, 31));
  const max_participants = 10 + (i % 20);
  return {
    group_id: `GROUP${(i + 1).toString().padStart(4, "0")}`,
    host_id: `USER${((i % 10) + 1).toString().padStart(4, "0")}`,
    category_id: (i % 8) + 1,
    title: titles[i % titles.length],
    description: descriptions[i % descriptions.length],
    thumbnail: thumbnails[i % thumbnails.length],
    group_type: groupTypes[i % groupTypes.length],
    meeting_type: meetingTypes[i % meetingTypes.length],
    location_address: i % 2 === 0 ? "서울 강남구" : "부산 해운대구",
    participants: 2 + (i % max_participants),
    max_participants,
    gender_restriction: genderRestrictions[i % genderRestrictions.length],
    min_age: 20 + (i % 5) * 5,
    max_age: 30 + (i % 5) * 10,
    status: statuses[i % statuses.length],
    created_at: start.toISOString(),
    updated_at: end.toISOString(),
    expired_at: i % 4 === 0 ? end.toISOString() : null,
    display: i % 2 === 0 ? "Y" : "N",
    registrant: registrants[i % registrants.length],
    registeredAt: start.toISOString(),
    editor: editors[i % editors.length],
    nickname: nicknames[i % nicknames.length],
    reportCount: i % 5,
    goal: goals[i % goals.length],
    authRule: authRules[i % authRules.length],
    challengeStatus: challengeStatuses[i % challengeStatuses.length],
    age: `${20 + (i % 5) * 5}~${30 + (i % 5) * 10}대`,
    place: places[i % places.length],
    description_detail: descriptions[i % descriptions.length],
    challengeRule: challengeRules[i % challengeRules.length]
  };
});
