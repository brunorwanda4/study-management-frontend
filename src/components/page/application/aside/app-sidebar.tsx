"use client";

import { LoadingIndicator } from "@/components/common/myLink";
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
import { Locale } from "@/i18n";
import { isActivePath } from "@/lib/helpers/link-is-active";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarGroupsProps } from "./app-side-content";

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
        {items.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex} className="py-0 pl-0">
            {group.label && (
              <SidebarGroupLabel className="ml-2 text-sm font-medium text-gray-500">
                {group.label}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent className=" ">
              <SidebarMenu className=" ">
                {group.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    {item.children ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`item-${itemIndex}`}>
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
                                  className="h-5 min-h-[20px] w-5 min-w-[20px]"
                                />
                              )}
                              <span className="text-base-content">
                                {item.title}
                              </span>
                            </div>
                            <LoadingIndicator />
                          </AccordionTrigger>

                          <AccordionContent>
                            <SidebarMenuSub>
                              {item.children.map((subItem, subIndex) => (
                                <SidebarMenuSubItem
                                  className={cn(
                                    buttonVariants({
                                      variant: "ghost",
                                      size: "sm",
                                    }),
                                    isActivePath(path, subItem.url, lang) &&
                                      "bg-base-300",

                                    "hover:bg-base-200 ml-6 justify-start rounded-l-none",
                                  )}
                                  key={subIndex}
                                >
                                  <Link
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
                                          className="h-5 min-h-[20px] w-5 min-w-[20px]"
                                        />
                                      )}
                                      <span className="text-base-content">
                                        {subItem.title}
                                      </span>
                                    </div>
                                    <LoadingIndicator />
                                  </Link>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <SidebarMenuButton asChild className=" ">
                        <Link
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            isActivePath(path, item.url, lang) &&
                              `bg-base-300 ${theme === "dark" && "bg-white/10"}`,
                            "hover:bg-base-200 justify-between rounded-l-none",
                            " ",
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
                                className="h-5 min-h-[20px] w-5 min-w-[20px]"
                              />
                            )}
                            <span className="text-base-content">
                              {item.title}
                            </span>
                          </div>
                          <LoadingIndicator />
                        </Link>
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
