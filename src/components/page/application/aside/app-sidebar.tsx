"use client";

import MyLink, {
  LoadingIndicator,
  LoadingIndicatorText,
} from "@/components/common/myLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { Locale } from "@/i18n";
import { isActivePath } from "@/lib/helpers/link-is-active";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { sidebarGroupsProps } from "./app-side-content";

interface AppSidebarProps {
  items: sidebarGroupsProps[];
  lang: Locale;
}

export function AppSidebar({ items, lang }: AppSidebarProps) {
  const path = usePathname();
  const { theme } = useTheme();
  return (
    <Sidebar className="bg-base-100 gap-0 space-y-0 pt-14" collapsible="icon">
      <SidebarContent className="bg-base-100 text-on-primary dark:bg-surface-container dark:text-on-surface gap-0">
        {items.map((group) => (
          <SidebarGroup
            key={group.label ?? group.items[0]?.title ?? Math.random()}
          >
            {group.label && (
              <SidebarGroupLabel className="ml-2 text-sm font-medium text-gray-500">
                {group.label}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url ?? item.title}>
                    {item.children ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={item.url ?? item.title}>
                          <AccordionTrigger
                            className={cn(
                              buttonVariants({ variant: "ghost" }),
                              isActivePath(path, item.url, lang) &&
                                `bg-base-300 ${theme === "dark" && "bg-white/10"}`,
                              "hover:bg-base-200 w-full justify-between rounded-l-none",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && (
                                <Image
                                  src={item.icon}
                                  alt={item.title}
                                  width={20}
                                  height={20}
                                  className="h-5 min-h-5 w-5 min-w-5"
                                />
                              )}
                              <span className="text-base-content">
                                {item.title}
                              </span>
                            </div>
                            <LoadingIndicator />
                          </AccordionTrigger>

                          <AccordionContent className=" pb-0">
                            <SidebarMenuSub>
                              {item.children.map((subItem) => (
                                <SidebarMenuSubItem
                                  key={subItem.url ?? subItem.title}
                                  className={cn(
                                    buttonVariants({
                                      variant: "ghost",
                                      size: "sm",
                                    }),
                                    isActivePath(path, subItem.url, lang) &&
                                      "bg-base-300",
                                    "hover:bg-base-200 ml-0  justify-start rounded-l-none",
                                  )}
                                >
                                  <MyLink
                                    href={subItem.url || "/"}
                                    className="flex w-full items-center justify-between"
                                  >
                                    <div className="flex items-center gap-2">
                                      {subItem.icon && (
                                        <Image
                                          src={subItem.icon}
                                          alt={subItem.title}
                                          width={20}
                                          height={20}
                                          className="h-5 min-h-5 w-5 min-w-5"
                                        />
                                      )}
                                      <LoadingIndicatorText
                                        title={subItem.title}
                                      >
                                        {subItem.title}
                                      </LoadingIndicatorText>
                                    </div>
                                  </MyLink>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <SidebarMenuButton asChild>
                        <MyLink
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            isActivePath(path, item.url, lang) &&
                              `bg-base-300 ${theme === "dark" && "bg-white/10"}`,
                            "hover:bg-base-200 justify-between rounded-l-none",
                          )}
                          href={item.url || "/"}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && (
                              <Image
                                src={item.icon}
                                alt={item.title}
                                width={20}
                                height={20}
                                className="h-5 min-h-5 w-5 min-w-5"
                              />
                            )}
                            <LoadingIndicatorText title={item.title}>
                              {item.title}
                            </LoadingIndicatorText>
                          </div>
                        </MyLink>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-base-100 text-on-primary dark:bg-surface-container dark:text-on-surface">
        {/* add theme */}
      </SidebarFooter>
    </Sidebar>
  );
}
