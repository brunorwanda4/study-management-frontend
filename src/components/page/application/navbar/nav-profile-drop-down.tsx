"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { type AuthContext, logout } from "@/lib/utils/auth-context";
import { LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface props {
  auth: AuthContext;
}

const NavProfileDropDown = ({ auth }: props) => {
  const { theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button library="daisy" variant="ghost" shape="circle">
          <MyAvatar
            size="sm"
            src={auth.user.image}
            alt={auth.user.name}
            type="cycle"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" data-theme={theme}>
        <div className="flex items-center gap-2">
          <MyAvatar
            size="sm"
            src={auth.user.image}
            alt={auth.user.name}
            type="cycle"
          />
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
