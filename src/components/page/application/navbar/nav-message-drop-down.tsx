"use client";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavMessageDropDownCard from "./nav-message-dropdown-card";


const NavMessageDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button library="daisy" variant="ghost" shape="circle">
          <MyImage className="size-8" src="/icons/chat.png" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>
          <h3 className="basic-title">Messages</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NavMessageDropDownCard />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavMessageDropDown;
