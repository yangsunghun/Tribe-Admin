import { FileText, MessagesSquare, Settings, Users, type LucideIcon } from "lucide-react";

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
  // 회원 상세 페이지 패턴 (list, register 등은 제외)
  const memberDetailPattern = /^\/members\/(?!list$|register$)[A-Za-z0-9_-]+$/;
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
    title: "회원 관리",
    url: "/members/list",
    icon: Users
  },
  {
    title: "모임 관리",
    icon: MessagesSquare,
    items: [
      {
        title: "모임 관리",
        url: "/meetings/list"
      },
      {
        title: "피드 관리",
        url: "/feeds/list"
      },
      {
        title: "신고 관리",
        url: "/reports/list"
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
