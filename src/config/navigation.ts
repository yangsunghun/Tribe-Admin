import { FileText, Home, Settings, Users, type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export const navItems: NavItem[] = [
  {
    title: "대시보드",
    url: "/dashboard",
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
    title: "문서 관리",
    icon: FileText,
    items: [
      {
        title: "문서 목록",
        url: "/documents/list"
      },
      {
        title: "문서 작성",
        url: "/documents/create"
      }
    ]
  },
  {
    title: "설정",
    url: "/settings",
    icon: Settings
  }
];
