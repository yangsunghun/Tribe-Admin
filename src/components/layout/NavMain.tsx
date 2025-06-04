"use client";

import type { NavMainItem } from "@/config/navMainItems";
import { getDynamicRouteInfo } from "@/config/navMainItems";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "../ui/sidebar";

interface NavMainProps {
  items: NavMainItem[];
  isCollapsed: boolean;
}

const NavMain = ({ items, isCollapsed }: NavMainProps) => {
  const pathname = usePathname();
  const dynamicRouteInfo = getDynamicRouteInfo(pathname);

  const isSubMenuActive = (subItems: { url: string }[] | undefined) => {
    if (!subItems) return false;

    // 상세 페이지인 경우 부모 URL과 일치하는지 확인
    if (dynamicRouteInfo) {
      return subItems.some((item) => item.url === dynamicRouteInfo.parentUrl);
    }

    // 일반 페이지인 경우 현재 URL과 일치하는지 확인
    return subItems.some((item) => pathname === item.url);
  };

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel
        className={clsx(
          "!text-caption text-primary-800 p-6 font-semibold transition-none",
          "data-[state=collapsed]:hidden"
        )}
      >
        Navigation
      </SidebarGroupLabel>
      <SidebarGroupContent className="text-body">
        <SidebarMenu className="px-2">
          {items.map((item: NavMainItem) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
              {item.items ? (
                isCollapsed ? (
                  <SidebarMenuItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <SidebarMenuButton className="flex h-12 w-full justify-center px-4" tooltip={item.title}>
                          {item.icon && <item.icon />}
                        </SidebarMenuButton>
                      </PopoverTrigger>
                      <PopoverContent align="start" side="right" className="w-40 p-0">
                        <SidebarMenuSub className="border-none px-0 py-2">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  className={clsx(
                                    "block px-4 py-2",
                                    pathname === subItem.url || dynamicRouteInfo?.parentUrl === subItem.url
                                      ? "text-primary-700 font-semibold"
                                      : "text-primary-800"
                                  )}
                                  href={subItem.url}
                                >
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </PopoverContent>
                    </Popover>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={clsx(
                          "flex h-12 w-full px-4 whitespace-nowrap",
                          "hover:!text-primary-700 hover:!bg-primary-50 active:text-primary-800 transition-background transition-colors",
                          isSubMenuActive(item.items) && "text-primary-700 bg-primary-50 font-semibold",
                          "data-[state=collapsed]:justify-center data-[state=collapsed]:px-0"
                        )}
                        tooltip={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent
                      className={clsx("data-[state=collapsed]:hidden", "transition-all duration-200 ease-in-out")}
                    >
                      <SidebarMenuSub>
                        {item.items?.map((subItem: { title: string; url: string }) => (
                          <SidebarMenuSubItem
                            className={clsx("rounded-md px-4 py-1", "hover:!text-primary-700 hover:!bg-primary-50")}
                            key={subItem.title}
                          >
                            <SidebarMenuSubButton asChild>
                              <Link
                                className={clsx(
                                  "block !bg-transparent",
                                  pathname === subItem.url || dynamicRouteInfo?.parentUrl === subItem.url
                                    ? "!text-primary-700 font-semibold"
                                    : "text-primary-800"
                                )}
                                href={subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                )
              ) : (
                <SidebarMenuButton
                  className={clsx(
                    "flex h-12 w-full px-4 whitespace-nowrap",
                    "hover:!text-primary-700 hover:!bg-primary-50 active:text-primary-800 transition-background transition-colors active:font-semibold",
                    "data-[state=collapsed]:justify-center data-[state=collapsed]:px-0"
                  )}
                  asChild
                  tooltip={item.title}
                >
                  <Link
                    href={item.url!}
                    className={clsx(
                      "flex items-center gap-2",
                      (pathname === item.url || dynamicRouteInfo?.parentUrl === item.url) &&
                        "text-primary-700 font-semibold",
                      "data-[state=collapsed]:gap-0"
                    )}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span className="data-[state=collapsed]:hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMain;
