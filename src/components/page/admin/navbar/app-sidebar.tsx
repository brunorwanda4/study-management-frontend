"use client";

import { AiOutlineSetting } from "react-icons/ai";
import { LiaUsersSolid } from "react-icons/lia";
import { MdClass } from "react-icons/md";
import { CiGrid31 } from "react-icons/ci";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
import SiteLogo from "./site-logo";
import AuthChangeTheme from "@/components/auth/nav/auth-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileButton from "./profile-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AiFillDatabase } from "react-icons/ai";
import { TfiLayoutGrid3 } from "react-icons/tfi";

// Define type for sidebar items
type SidebarItem = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  url?: string;
  children?: SidebarItem[];
};

// Sidebar configurations
const sidebarGroups: { label: string; items: SidebarItem[] }[] = [
  {
    label: "Dashboard",
    items: [
      {
        title: "Dashboard",
        icon: CiGrid31,
        url: "/",
      },
      {
        title: "Database",
        icon: AiFillDatabase,
        url: "/database",
      },
      {
        title: "Collections",
        icon: TfiLayoutGrid3,
        url: "/collections",
      },
    ],
  },
  {
    label: "Main collections",
    items: [
      {
        title: "Users",
        icon: LiaUsersSolid,
        url: "/collection/users",
        children: [
          { title: "Students", url: "/users/students" },
          { title: "Teachers", url: "/users/teachers" },
          { title: "Manage Users", url: "/users/crud" },
        ],
      },
      {
        title: "Classes",
        icon: MdClass,
        children: [
          { title: "All Classes", url: "/classes/all" },
          { title: "Create Class", url: "/classes/create" },
          { title: "Manage Classes", url: "/classes/manage" },
        ],
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        title: "Settings",
        icon: AiOutlineSetting,
        url: "/setting",
      },
    ],
  },
];

// Reusable component for rendering sidebar groups
const SidebarGroupComponent = ({
  label,
  items,
}: {
  label: string;
  items: SidebarItem[];
}) => {
  const path = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) =>
            item.children ? (
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
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SidebarMenuSub>
                        {item.children.map((subItem, subIndex) => (
                          <SidebarMenuSubItem key={subIndex}>
                            {subItem.url ? (
                              <Link
                                href={subItem.url}
                                className={cn(
                                  "ml-8 flex items-center gap-2 btn-xs btn-ghost  rounded-md",
                                  path === subItem.url && "btn-info",
                                )}
                              >
                                {subItem.icon && (
                                  <subItem.icon className="w-4 h-4" />
                                )}
                                {subItem.title}
                              </Link>
                            ) : (
                              <button className="ml-8 flex items-center gap-2 btn-xs btn-ghost  rounded-md">
                                {subItem.icon && (
                                  <subItem.icon className="w-4 h-4" />
                                )}
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
                      href={item.url}
                      className={cn(
                        "flex items-center gap-2 font-normal",
                        path === item.url && "text-info",
                      )}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      {item.title}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 font-normal">
                      {item.icon && <item.icon className="w-5 h-5" />}
                      {item.title}
                    </div>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export function AppSidebar() {
  return (
    <Sidebar className=" bg-base-300">
      <SidebarContent className=" bg-base-300">
        {/* Sidebar Header */}
        <SidebarHeader className="flex  w-[16rem] justify-between gap-2 flex-row items-center fixed top-0 bg-gradient-to-b h-16 pb-4 from-base-300 via-base-300  to-transparent z-50">
          <SiteLogo />
          {/* <AdminButton /> */} <AuthChangeTheme />
        </SidebarHeader>

        {/* Render Sidebar Groups */}
        <div className=" overflow-y-auto max-h-[calc(100vh-5.5rem)] mt-12">
          {sidebarGroups.map((group, index) => (
            <SidebarGroupComponent
              key={index}
              label={group.label}
              items={group.items}
            />
          ))}
          <div className="h-[1.5rem]]" />
        </div>
        <SidebarFooter className=" fixed bottom-0 bg-gradient-to-t from-base-300 via-base-300  to-transparent h-20 w-[16rem] ">
          <div className=" flex justify-between items-center ">
            <div className="flex  items-center space-x-1 pt-6">
              <Avatar>
                <AvatarImage src="/images/2.jpg" />
                <AvatarFallback>CEO</AvatarFallback>
              </Avatar>
              <div className=" flex flex-col">
                <h6 className="text-sm font-medium">Bruno Rwanda</h6>
                <span className=" my-sm-text">CEO</span>
              </div>
            </div>
            <ProfileButton />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
