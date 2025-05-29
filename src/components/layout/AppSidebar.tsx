"use client";

import { navBottomItems } from "@/config/navBottomItems";
import { navMainItems } from "@/config/navMainItems";
import clsx from "clsx";
import { Sidebar, SidebarContent, SidebarTrigger, useSidebar } from "../ui/sidebar";
import NavBottom from "./NavBottom";
import NavMain from "./NavMain";

const AppSidebar = () => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="pt-16">
      <SidebarContent className={clsx("bg-white", state === "collapsed" ? "pt-10" : "pt-0")}>
        <SidebarTrigger
          className={clsx(
            "absolute top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border bg-white p-2",
            "hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out",
            state === "collapsed" ? "top-18 right-1/2 translate-x-1/2 transform" : "top-18 right-4"
          )}
        />
        <NavMain items={navMainItems} />
        <NavBottom items={navBottomItems} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
