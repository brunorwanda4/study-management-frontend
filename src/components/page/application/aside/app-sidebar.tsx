"use client";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { ReactNode } from "react";
import { sidebarGroupsProps } from "./app-side-content";
import { useTheme } from "next-themes";
import MyImage from "@/components/myComponents/myImage";
import { LoadingIndicator } from "@/components/myComponents/myLink";

// Helper function to check if path starts with URL
const isActivePath = (
  currentPath: string,
  targetUrl: string | undefined,
  lang?: Locale
) => {
  if (!targetUrl) return false;
  
  const normalizedTarget = lang ? `/${lang}${targetUrl}` : targetUrl;
  
  // Special cases that require exact match
  const exactMatchRoutes = [
    '/admin/',
    '/admin', // in case there's no trailing slash
    '/s-t',
    '/s-t/', // school staff dashboard
    // Add any other routes that should only match exactly
  ];

  // Check if this is an exact match route
  const requiresExactMatch = exactMatchRoutes.some(route => 
    route === targetUrl || `/${lang}${route}` === normalizedTarget
  );

  if (requiresExactMatch) {
    return currentPath === normalizedTarget || 
           currentPath === `${normalizedTarget}/`;
  }

  // For all other routes, use startsWith
  return currentPath.startsWith(normalizedTarget) &&
         // Ensure we don't match partial segments
         (currentPath === normalizedTarget ||
          currentPath.startsWith(`${normalizedTarget}/`));
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
    <SidebarGroup className=" p-0">
      <div>
        {label ? (
          <span className=" font-medium text-sm text-gray-500 ml-2">
            {label}
          </span>
        ) : (
          <div>
            {index == 0 ? (
              <div className=" mt-2"></div>
            ) : (
              <Separator className="mb-2" />
            )}
          </div>
        )}
      </div>
      <SidebarGroupContent>
        <SidebarMenu className=" pr-2">
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
                          "hover:no-underline btn btn-sm btn-ghost py-0 rounded-l-none",
                          item.url &&
                            isActivePath(path, item.url, lang) &&
                            `bg-base-300 ${theme === "dark" && "bg-white/10"}`
                        )}
                      >
                        {item.url ? (
                          <Link
                            href={cn(lang ? `/${lang}${item.url}` : item.url)}
                            className={cn(
                              "flex items-center gap-2 font-normal justify-between rounded-l-none "
                            )}
                          >
                            {item.icon && (
                              <MyImage className=" size-6" src={item.icon} />
                            )}
                            <div className=" flex justify-between">
                              <span>{item.title}</span>
                              <LoadingIndicator />
                            </div>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 font-normal">
                            {item.icon && (
                              <MyImage className=" size-6" src={item.icon} />
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
                    <AccordionTrigger className="hover:no-underline btn btn-sm btn-ghost py-0">
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
                                  "ml-8 flex items-center gap-2  rounded-md",
                                  isActivePath(path, subItem.url, lang) &&
                                    "btn-info"
                                )}
                              >
                                <div className=" flex justify-between">
                                  <span className=" "> {subItem.title}</span>
                                  <LoadingIndicator />
                                </div>
                              </Link>
                            ) : (
                              <button className="ml-8 flex items-center gap-2 btn-xs btn-ghost  rounded-md">
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
                        "flex items-center gap-2  font-normal rounded-l-none",
                        isActivePath(path, item.url, lang) &&
                          `bg-base-300 ${theme === "dark" && "bg-white/10"}`
                      )}
                    >
                      {item.icon && (
                        <MyImage className=" size-6" src={item.icon} />
                      )}
                      <div className=" justify-between flex ">
                        {item.title}
                        <LoadingIndicator />
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 font-normal">
                      {item.icon && (
                        <MyImage className=" size-6" src={item.icon} />
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
    <Sidebar className=" pt-14" collapsible="offcanvas">
      <SidebarContent className=" border-r border-base-300">
        <div className=" overflow-y-auto max-h-[calc(100vh-5.5rem) space-y-1">
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
