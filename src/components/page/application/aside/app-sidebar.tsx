"use client";

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

const isActivePath = (
  currentPath: string,
  targetUrl: string | undefined,
  lang?: Locale,
) => {
  if (!targetUrl) return false;

  const normalizedTarget = lang ? `/${lang}${targetUrl}` : targetUrl;

  const exactMatchRoutes = ["/a/", "/a", "/s-t", "/s-t/"];

  const requiresExactMatch = exactMatchRoutes.some(
    (route) => route === targetUrl || `/${lang}${route}` === normalizedTarget,
  );

  if (requiresExactMatch) {
    return (
      currentPath === normalizedTarget || currentPath === `${normalizedTarget}/`
    );
  }

  return (
    currentPath.startsWith(normalizedTarget) &&
    (currentPath === normalizedTarget ||
      currentPath.startsWith(`${normalizedTarget}/`))
  );
};

export function AppSidebar({ items, lang }: AppSidebarProps) {
  const path = usePathname();
  const { theme } = useTheme();
  return (
    <Sidebar className="bg-base-100 pt-16" collapsible="icon">
      <SidebarContent className="bg-base-100 text-on-primary dark:bg-surface-container dark:text-on-surface">
        {items.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex} className="pl-0">
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
                              "hover:bg-base-200 w-full justify-start rounded-l-none",
                            )}
                          >
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
                          </AccordionTrigger>

                          <AccordionContent>
                            <SidebarMenuSub>
                              {item.children.map((subItem, subIndex) => (
                                <SidebarMenuSubItem key={subIndex}>
                                  <Link
                                    href={subItem.url || "/"}
                                    className={cn(
                                      buttonVariants({ variant: "ghost" }),
                                      isActivePath(path, subItem.url, lang) &&
                                        "btn-info",
                                      "hover:bg-base-200 ml-6 justify-start rounded-l-none",
                                    )}
                                  >
                                    <span className="text-base-content">
                                      {subItem.title}
                                    </span>
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
                            "hover:bg-base-200 justify-start rounded-l-none",
                            "",
                          )}
                          href={item.url || "/"}
                        >
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
