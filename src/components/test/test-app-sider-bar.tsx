"use client"
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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import MyImage from "../common/myImage";
import { buttonVariants } from "../ui/button";

interface TestAppSideBarProps {
  propName?: any;
}

const TestAppSideBar = ({ propName }: TestAppSideBarProps) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" text-sm text-base-content/50">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItemLink />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Side footer</SidebarFooter>
    </Sidebar>
  );
};

export default TestAppSideBar;

export const SidebarItemLink = () => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(buttonVariants({ variant: "ghost", library: "daisy" }))}
      >
        <MyImage src="/icons/dashboard.png" className=" size-5" />
        Page name
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const SchoolSidebarGroup = () => {
  return <SidebarGroup></SidebarGroup>;
};
