"use client";

import { getDynamicRouteInfo, navMainItems } from "@/config/navMainItems";
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
    <div className="border-b border-gray-100 py-4">
      <Breadcrumb className="text-caption">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Tribe Admin</BreadcrumbLink>
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
      <h2 className="text-title1 text-primary-700 mt-2 font-bold">{items[items.length - 1]?.title}</h2>
    </div>
  );
};

export default PageDirectory;
