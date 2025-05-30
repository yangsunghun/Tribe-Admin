"use client";

import LogoImage from "@/assets/images/logo.svg";
import { navBottomItems } from "@/config/navBottomItems";
import { navMainItems } from "@/config/navMainItems";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarTrigger, useSidebar } from "../ui/sidebar";
import NavBottom from "./NavBottom";
import NavMain from "./NavMain";

const AppSidebar = () => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <h1 className={clsx("w-full bg-white p-4", state === "collapsed" ? "" : "")}>
        <Link href="/">
          <Image src={LogoImage} alt="Tribe" width={100} height={100} className="pt-5" />
        </Link>
      </h1>
      <SidebarContent className={clsx("bg-white", state === "collapsed" ? "pt-10" : "pt-0")}>
        <SidebarTrigger
          className={clsx(
            "absolute top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border bg-white p-2",
            "hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out",
            state === "collapsed" ? "top-18 right-1/2 translate-x-1/2 transform" : "top-18 right-4"
          )}
        />
        <NavMain items={navMainItems} isCollapsed={state === "collapsed"} />
        <NavBottom items={navBottomItems} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
