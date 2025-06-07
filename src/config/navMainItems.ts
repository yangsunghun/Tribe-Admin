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
  // detail 페이지 패턴 매칭
  const detailPattern = /^\/(members|meetings)\/detail\/([A-Za-z0-9_-]+)$/;
  const detailMatch = pathname.match(detailPattern);

  if (detailMatch) {
    const [, section] = detailMatch;
    const sectionMap = {
      members: {
        title: "회원 상세",
        parent: "회원 관리",
        parentUrl: "/members/list"
      },
      meetings: {
        title: "모임 상세",
        parent: "모임 관리",
        parentUrl: "/meetings/list"
      }
    };

    return sectionMap[section as keyof typeof sectionMap];
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
    title: "전시관리",
    url: "/exhibitions/list",
    icon: FileText
  },
  {
    title: "시스템 관리",
    url: "/systems/accountList",
    icon: Settings
  }
];
