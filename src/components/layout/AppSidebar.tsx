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
    <>
      {/* 모바일 오버레이 */}
      {isMobile && openMobile && (
        <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={() => setOpenMobile(false)} />
      )}

      {/* 모바일 토글 버튼 */}
      {isMobile && (
        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-md"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={openMobile ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      )}

      <Sidebar
        collapsible={isMobile ? "none" : "icon"}
        className={clsx(
          isMobile && "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300",
          isMobile && !openMobile && "-translate-x-full"
        )}
      >
        <h1 className={clsx("w-full bg-white p-4", state === "collapsed" ? "" : "")}>
          <Link href="/">
            <Image src={LogoImage} alt="Tribe" width={100} height={100} className="pt-5" />
          </Link>
        </h1>
        <SidebarContent className={clsx("bg-white", state === "collapsed" ? "pt-10" : "pt-0")}>
          {!isMobile && (
            <SidebarTrigger
              className={clsx(
                "absolute top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border bg-white p-2",
                "hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 ease-in-out",
                state === "collapsed" ? "top-18 right-1/2 translate-x-1/2 transform" : "top-18 right-4"
              )}
            />
          )}
          <NavMain items={navMainItems} isCollapsed={state === "collapsed"} />
          <NavBottom items={navBottomItems} />
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
