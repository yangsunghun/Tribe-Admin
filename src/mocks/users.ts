export interface User {
  user_id: string;
  name: string;
  join_type: "DEFAULT" | "NAVER";
  email: string;
  password_hash?: string | null;
  nickname?: string | null;
  gender: "MALE" | "FEMALE";
  birth_date: string;
  profile_img?: string | null;
  terms_agreed: boolean;
  privacy_agreed: boolean;
  marketing_agreed: boolean;
  ci_value: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const names = [
  "홍길동",
  "김영희",
  "이철수",
  "박민수",
  "최수정",
  "정우성",
  "한지민",
  "이민호",
  "김수현",
  "박보영",
  "서강준",
  "문채원",
  "유재석",
  "강호동",
  "신동엽",
  "이효리",
  "장동건",
  "고소영",
  "송중기",
  "박서준",
  "김태희",
  "전지현",
  "수지",
  "아이유",
  "박지성",
  "손흥민",
  "류현진",
  "김연아",
  "차은우",
  "정해인",
  "김고은",
  "박신혜",
  "이준기",
  "이종석",
  "박형식",
  "김지원",
  "박민영",
  "이성경",
  "정소민",
  "서현진",
  "김남길",
  "조인성",
  "이병헌",
  "하정우",
  "마동석",
  "공유",
  "유아인",
  "송혜교",
  "송강호",
  "김혜수"
];

const profileImgs = [
  null,
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg"
];

export const mockUsers: User[] = Array.from({ length: 100 }).map((_, i) => {
  const name = names[i % names.length];
  const gender = i % 2 === 0 ? "MALE" : "FEMALE";
  const join_type = i % 3 === 0 ? "NAVER" : "DEFAULT";
  const status = i % 7 === 0 ? "INACTIVE" : "ACTIVE";
  const birth = randomDate(new Date(1980, 0, 1), new Date(2005, 11, 31));
  const created = randomDate(new Date(2022, 0, 1), new Date());
  const profile_img = profileImgs[i % profileImgs.length];
  return {
    user_id: `MOCKUSER${(i + 1).toString().padStart(4, "0")}`,
    name,
    join_type,
    email: `user${i + 1}@example.com`,
    password_hash: join_type === "DEFAULT" ? `hashedpassword${i + 1}` : null,
    nickname: name + (i + 1),
    gender,
    birth_date: birth.toISOString().slice(0, 10),
    profile_img,
    terms_agreed: true,
    privacy_agreed: true,
    marketing_agreed: i % 4 === 0,
    ci_value: `CI${1000000000 + i}`,
    status,
    created_at: created.toISOString(),
    updated_at: created.toISOString(),
    deleted_at: null
  };
});
