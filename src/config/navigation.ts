import { FileText, Home, Settings, Users } from "lucide-react";

export interface NavigationItem {
  name: string;
  href?: string;
  icon: any;
  subItems?: {
    name: string;
    href: string;
  }[];
}

export const navigationItems: NavigationItem[] = [
  {
    name: "대시보드",
    href: "/dashboard",
    icon: Home
  },
  {
    name: "회원 관리",
    icon: Users,
    subItems: [
      {
        name: "회원 목록",
        href: "/members/list"
      },
      {
        name: "회원 등록",
        href: "/members/register"
      }
    ]
  },
  {
    name: "문서 관리",
    icon: FileText,
    subItems: [
      {
        name: "문서 목록",
        href: "/documents/list"
      },
      {
        name: "문서 작성",
        href: "/documents/create"
      }
    ]
  },
  {
    name: "설정",
    href: "/settings",
    icon: Settings
  }
];
