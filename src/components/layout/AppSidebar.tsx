"use client";

import { navigationItems } from "@/config/navigation";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
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

const AppSidebar = () => {
  const pathname = usePathname();

  const isSubMenuActive = (subItems: { href: string }[] | undefined) => {
    if (!subItems) return false;
    return subItems.some((item) => pathname === item.href);
  };

  return (
    <Sidebar className="pt-16">
      <SidebarContent className="bg-white">
        <SidebarGroup className="px-4">
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent className="text-body">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {item.subItems ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={clsx(
                            "flex h-12 w-full justify-between px-4",
                            "hover:!text-primary-700 hover:!bg-primary-50 active:text-primary-800 transition-background transition-colors",
                            isSubMenuActive(item.subItems) && "text-primary-700 bg-primary-50 font-semibold"
                          )}
                        >
                          <div className={clsx("flex items-center gap-2")}>
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
                                className={clsx(
                                  "block px-2 py-1 text-sm",
                                  pathname === subItem.href ? "text-primary-700" : ""
                                )}
                              >
                                {subItem.name}
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      className={clsx(
                        "h-12 px-4",
                        "hover:text-primary-700 hover:!bg-primary-50 active:text-primary-800 active:font-semibold"
                      )}
                      asChild
                    >
                      <Link
                        href={item.href!}
                        className={clsx(
                          "flex items-center gap-2",
                          pathname === item.href && "text-primary-700 font-semibold"
                        )}
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
