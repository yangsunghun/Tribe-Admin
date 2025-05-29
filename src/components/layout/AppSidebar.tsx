"use client";

import { ChevronRight, FileText, Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "../ui/sidebar";

const navigationItems = [
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

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {item.subItems ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex w-full justify-between">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className={`block px-2 py-1 text-sm ${
                                  pathname === subItem.href ? "text-primary" : "text-muted-foreground"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href!}
                        className={`flex items-center gap-2 ${
                          pathname === item.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
