"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n";
import { LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface props {
//   user: AuthUserDto;
  lang: Locale;
}

const user = {
    name : "Rwanda Bruno",
    image : "https://img.freepik.com/free-photo/young-african-american-man-wearing-white-shirt_273609-21699.jpg?t=st=1744968201~exp=1744971801~hmac=be4a690e9c62b0600ff3ec1da6a45052c1e75549cfd66cd80f944a363f5b819e&w=1380",
    role: "STUDENT",
    email : "rwandabruno@gmail.com"
}

const NavProfileDropDown = ({ lang }: props) => {
    const {theme} = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button library="daisy" variant="ghost" shape="circle">
          <Avatar className=" size-10  ">
            <AvatarImage src={user?.image ? user.image : "/images/2.jpg"} />
            <AvatarFallback>{user.role}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-72" data-theme={theme}>
        <DropdownMenuLabel className=" flex gap-2 items-center">
          <Avatar className=" size-10">
            <AvatarImage src={user?.image ? user.image : "https://res.cloudinary.com/dg9f2wy0t/image/upload/v1744817900/avatars/aef1b831f2dcdf4df0197c07e21f6cda.jpg"} />
            <AvatarFallback>{user.role}</AvatarFallback>
          </Avatar>
          <div className=" flex flex-col">
          <span className=" font-medium">{user.name}</span>
          <span> {user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/profile`}>
           <Button variant="ghost" size="sm" className=" w-full justify-start">
           <User />
           <span>Your Profile</span>
           </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button type="button" variant="ghost" size="sm" className=" text-error w-full justify-start cursor-pointer">
            <LogOut />
            <span>Logout</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileDropDown;
