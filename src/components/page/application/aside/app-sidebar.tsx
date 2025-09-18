"use client";

import MyImage from "@/components/common/myImage";
import { LoadingIndicator } from "@/components/comon/myLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { sidebarGroupsProps } from "./app-side-content";

// Helper function to check if path starts with URL
const isActivePath = (
  currentPath: string,
  targetUrl: string | undefined,
  lang?: Locale,
) => {
  if (!targetUrl) return false;

  const normalizedTarget = lang ? `/${lang}${targetUrl}` : targetUrl;

  // Special cases that require exact match
  const exactMatchRoutes = [
    "/admin/",
    "/admin", // in case there's no trailing slash
    "/s-t",
    "/s-t/", // school staff dashboard
    // Add any other routes that should only match exactly
  ];

  // Check if this is an exact match route
  const requiresExactMatch = exactMatchRoutes.some(
    (route) => route === targetUrl || `/${lang}${route}` === normalizedTarget,
  );

  if (requiresExactMatch) {
    return (
      currentPath === normalizedTarget || currentPath === `${normalizedTarget}/`
    );
  }

  // For all other routes, use startsWith
  return (
    currentPath.startsWith(normalizedTarget) &&
    // Ensure we don't match partial segments
    (currentPath === normalizedTarget ||
      currentPath.startsWith(`${normalizedTarget}/`))
  );
};
// Reusable component for rendering sidebar groups
const SidebarGroupComponent = ({
  label,
  items,
  index,
  lang,
  otherData1,
}: sidebarGroupsProps) => {
  const path = usePathname();
  const { theme } = useTheme();
  return (
    <SidebarGroup className="p-0">
      <div>
        {label ? (
          <span className="ml-2 text-sm font-medium text-gray-500">
            {label}
          </span>
        ) : (
          <div>
            {index == 0 ? (
              <div className="mt-2"></div>
            ) : (
              <Separator className="mb-2" />
            )}
          </div>
        )}
      </div>
      <SidebarGroupContent>
        <SidebarMenu className="pr-2">
          {items.map((item, index) => {
            if (item.otherData1)
              return (
                <Accordion
                  type="single"
                  collapsible
                  key={index}
                  className="group/accordion"
                >
                  <AccordionItem value={item.title}>
                    <SidebarMenuItem>
                      <AccordionTrigger
                        className={cn(
                          "btn btn-sm btn-ghost rounded-l-none py-0 hover:no-underline",
                          item.url &&
                            isActivePath(path, item.url, lang) &&
                            `bg-base-300 ${theme === "dark" && "bg-white/10"}`,
                        )}
                      >
                        {item.url ? (
                          <Link
                            href={cn(lang ? `/${lang}${item.url}` : item.url)}
                            className={cn(
                              "flex items-center justify-between gap-2 rounded-l-none font-normal",
                            )}
                          >
                            {item.icon && (
                              <MyImage className="size-6" src={item.icon} />
                            )}
                            <div className="flex justify-between">
                              <span>{item.title}</span>
                              <LoadingIndicator />
                            </div>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 font-normal">
                            {item.icon && (
                              <MyImage className="size-6" src={item.icon} />
                            )}
                            {item.title}
                          </div>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <SidebarMenuSub>{otherData1}</SidebarMenuSub>
                      </AccordionContent>
                    </SidebarMenuItem>
                  </AccordionItem>
                </Accordion>
              );
            return item.children ? (
              <Accordion
                type="single"
                collapsible
                key={index}
                className="group/accordion"
              >
                <AccordionItem value={item.title}>
                  <SidebarMenuItem>
                    <AccordionTrigger className="btn btn-sm btn-ghost py-0 hover:no-underline">
                      <span className="flex items-center gap-2">
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SidebarMenuSub>
                        {item.children.map((subItem, subIndex) => (
                          <SidebarMenuSubItem key={subIndex}>
                            {subItem.url ? (
                              <Link
                                href={
                                  lang
                                    ? `/${lang}${subItem.url}`
                                    : `${subItem.url}`
                                }
                                className={cn(
                                  "ml-8 flex items-center gap-2 rounded-md",
                                  isActivePath(path, subItem.url, lang) &&
                                    "btn-info",
                                )}
                              >
                                <div className="flex justify-between">
                                  <span className=" "> {subItem.title}</span>
                                  <LoadingIndicator />
                                </div>
                              </Link>
                            ) : (
                              <button className="btn-xs btn-ghost ml-8 flex items-center gap-2 rounded-md">
                                {subItem.title}
                              </button>
                            )}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </AccordionContent>
                  </SidebarMenuItem>
                </AccordionItem>
              </Accordion>
            ) : (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  {item.url ? (
                    <Link
                      href={cn(lang ? `/${lang}${item.url}` : item.url)}
                      className={cn(
                        "flex items-center gap-2 rounded-l-none font-normal",
                        isActivePath(path, item.url, lang) &&
                          `bg-base-300 ${theme === "dark" && "bg-white/10"}`,
                      )}
                    >
                      {item.icon && (
                        <MyImage className="size-6" src={item.icon} />
                      )}
                      <div className="flex justify-between">
                        {item.title}
                        <LoadingIndicator />
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 font-normal">
                      {item.icon && (
                        <MyImage className="size-6" src={item.icon} />
                      )}
                      {item.title}
                    </div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

interface props {
  items: sidebarGroupsProps[];
  lang?: Locale;
  otherData1?: ReactNode[];
}

export function AppSidebar({ items, lang, otherData1 }: props) {
  return (
    <Sidebar className="pt-14" collapsible="offcanvas">
      <SidebarContent className="border-base-300 border-r">
        <div className="max-h-[calc(100vh-5.5rem) space-y-1 overflow-y-auto">
          {items.map((group, index) => (
            <SidebarGroupComponent
              key={index}
              label={group.label}
              items={group.items}
              index={index}
              lang={lang}
              otherData1={otherData1}
            />
          ))}
          <div className="h-[1.5rem]]" />
        </div>
        <SidebarFooter className=" ">
          {/* TODO: add aside footer */}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
