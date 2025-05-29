import { LogOut, type LucideIcon } from "lucide-react";

export interface NavBottomItem {
  title: string;
  url?: string;
  icon: LucideIcon;
}

export const navBottomItems: NavBottomItem[] = [
  {
    title: "로그아웃",
    url: "#",
    icon: LogOut
  }
];
