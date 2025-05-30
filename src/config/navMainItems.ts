import { FileText, Home, Settings, Users, type LucideIcon } from "lucide-react";

export interface NavMainItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    pattern?: RegExp;
  }[];
}

// 동적 라우트 패턴 매칭을 위한 함수
export const getDynamicRouteInfo = (pathname: string) => {
  // 회원 상세 페이지 패턴
  const memberDetailPattern = /^\/members\/([^/]+)$/;
  const memberDetailMatch = pathname.match(memberDetailPattern);

  if (memberDetailMatch) {
    return {
      title: "회원 상세",
      parent: "회원 관리",
      parentUrl: "/members/list"
    };
  }

  return null;
};

export const navMainItems: NavMainItem[] = [
  {
    title: "대시보드",
    url: "/",
    icon: Home
  },
  {
    title: "회원 관리",
    icon: Users,
    items: [
      {
        title: "회원 목록",
        url: "/members/list"
      },
      {
        title: "회원 등록",
        url: "/members/register"
      }
    ]
  },
  {
    title: "문서",
    url: "/docs",
    icon: FileText
  },
  {
    title: "설정",
    url: "/settings",
    icon: Settings
  }
];
