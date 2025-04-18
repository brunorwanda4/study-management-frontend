"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n";
import MyImage from "@/components/myComponents/myImage";
import NavMessageDropDownCard from "./nav-message-dropdown-card";

interface props {
  lang: Locale;
}

const NavMessageDropDown = ({lang}: props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button library="daisy" variant="ghost" shape="circle">
          <MyImage className=" size-8" src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-72">
        <DropdownMenuLabel>
          <h3 className=" happy-title-base">Messages</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NavMessageDropDownCard lang={lang}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavMessageDropDown;
