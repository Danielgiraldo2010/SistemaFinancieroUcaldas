"use client";

import { Fragment } from "react";
import { Home } from "lucide-react";
import { useLink } from "@refinedev/core";
import { useLocation } from "react-router";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { resolveBreadcrumb } from "@/lib/navigation";
import { getMenuIconComponent } from "@/lib/navigation-icons";

export function Breadcrumb() {
  const Link = useLink();
  const { pathname } = useLocation();
  const crumbs = resolveBreadcrumb(pathname);

  return (
    <ShadcnBreadcrumb>
      <ShadcnBreadcrumbList>
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;
          const href = item.href || "/dashboard";
          const IconComponent = item.iconName ? getMenuIconComponent(item.iconName) : null;
          const content = index === 0 ? (
            <Link to={href}>
              <Home className="h-4 w-4" />
            </Link>
          ) : item.href ? (
            <Link to={href} className="inline-flex items-center gap-1.5">
              {IconComponent ? <IconComponent className="h-3.5 w-3.5" /> : null}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              {IconComponent ? <IconComponent className="h-3.5 w-3.5" /> : null}
              <span>{item.label}</span>
            </span>
          );

          return (
            <Fragment key={`${item.label}-${index}`}>
              {isLast ? (
                <ShadcnBreadcrumbPage>{content}</ShadcnBreadcrumbPage>
              ) : (
                <>
                  <ShadcnBreadcrumbItem>{content}</ShadcnBreadcrumbItem>
                  <ShadcnBreadcrumbSeparator />
                </>
              )}
            </Fragment>
          );
        })}
      </ShadcnBreadcrumbList>
    </ShadcnBreadcrumb>
  );
}

Breadcrumb.displayName = "Breadcrumb";
