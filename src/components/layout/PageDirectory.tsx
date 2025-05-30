"use client";

import { getDynamicRouteInfo, navMainItems } from "@/config/navMainItems";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

export function getBreadcrumbItems(pathname: string) {
  // 동적 라우트 체크
  const dynamicRouteInfo = getDynamicRouteInfo(pathname);
  if (dynamicRouteInfo) {
    const parentItem = navMainItems.find((item) => item.title === dynamicRouteInfo.parent);
    if (parentItem) {
      return [
        parentItem,
        {
          title: dynamicRouteInfo.title,
          url: pathname
        }
      ];
    }
  }

  // 정적 라우트 체크
  for (const item of navMainItems) {
    if (item.url && item.url === pathname) {
      return [item];
    }
    if (item.items) {
      for (const sub of item.items) {
        if (sub.url === pathname) {
          return [item, sub];
        }
      }
    }
  }
  return [];
}

const PageDirectory = () => {
  const pathname = usePathname();
  const items = getBreadcrumbItems(pathname);

  return (
    <div className="flex items-center justify-between rounded-md bg-white px-6 py-4">
      <h2 className="text-subtitle text-primary-700 font-bold">{items[items.length - 1]?.title}</h2>
      <Breadcrumb className="text-caption">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House size={14} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, idx) => (
            <Fragment key={item.url || item.title}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.url && idx !== items.length - 1 ? (
                  <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                ) : (
                  <span>{item.title}</span>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageDirectory;
