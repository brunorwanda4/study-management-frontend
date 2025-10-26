"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { type AuthContext, logout } from "@/lib/utils/auth-context";
import { generateImageProfile } from "@/lib/utils/generate-profile-image";
import { LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface props {
  auth: AuthContext;
}

const NavProfileDropDown = ({ auth }: props) => {
  const { theme } = useTheme();
  const image = generateImageProfile(auth.user.name, auth.user.gender);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button library="daisy" variant="ghost" shape="circle">
          <Avatar className="size-10">
            <AvatarImage src={auth.user?.image ? auth.user.image : image} />
            <AvatarFallback>{auth.user.role}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" data-theme={theme}>
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={auth.user?.image ? auth.user.image : image} />
            <AvatarFallback>{auth.user.role}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{auth.user.name}</span>
            <span> {auth.user.email}</span>
          </div>
        </div>
        <Separator />
        <Link href={`/p`}>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <User />
            <span>Your Profile</span>
          </Button>
        </Link>
        <Separator />
        <Button
          onClick={() => logout()}
          type="button"
          variant="ghost"
          size="sm"
          className="text-error w-full cursor-pointer justify-start"
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NavProfileDropDown;
