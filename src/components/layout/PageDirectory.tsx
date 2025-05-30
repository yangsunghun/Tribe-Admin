"use client";

import { navMainItems } from "@/config/navMainItems";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

export function getBreadcrumbItems(pathname: string) {
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
    <Breadcrumb className="text-body">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <House size={16} />
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
  );
};

export default PageDirectory;
