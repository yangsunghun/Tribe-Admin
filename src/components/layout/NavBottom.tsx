import type { NavBottomItem } from "@/config/navBottomItems";
import { signOut } from "next-auth/react";
import type { ComponentPropsWithoutRef } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

interface NavBottomProps {
  items: NavBottomItem[];
}

const NavBottom = ({ items }: NavBottomProps & ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent className="text-body">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="h-12 whitespace-nowrap" asChild size="sm">
                <button onClick={() => signOut({ callbackUrl: "/login" })}>
                  <item.icon />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavBottom;
