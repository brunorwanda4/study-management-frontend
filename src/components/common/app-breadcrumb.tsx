"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatText } from "@/lib/helpers/format-text";
import { BsGrid1X2 } from "react-icons/bs";

// Map segments to custom labels
const segmentLabels: Record<string, string> = {
  a: "Dashboard",
  s: "Dashboard",
  "s-t": "Dashboard",
  t: "Dashboard",
};

export default function AppBreadcrumb() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Split path, ignoring empty and locale segment (assume locale is always the first one)
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  const paths = segments.slice(1); // everything after locale

  // Build cumulative paths
  const crumbs = paths.map((seg, index) => {
    const href = `/${locale}/${paths.slice(0, index + 1).join("/")}`;
    const label = segmentLabels[seg] ?? decodeURIComponent(seg);
    return { label, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {/* <BreadcrumbLink href={`/${locale}`}>
          </BreadcrumbLink> */}
          <BsGrid1X2 size={16} aria-hidden="true" />
          <span className="sr-only">Home</span>
        </BreadcrumbItem>

        {crumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === crumbs.length - 1 ? (
                <BreadcrumbPage className="capitalize">
                  {formatText(crumb.label)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={crumb.href}
                  className="capitalize font-medium"
                >
                  {formatText(crumb.label)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
