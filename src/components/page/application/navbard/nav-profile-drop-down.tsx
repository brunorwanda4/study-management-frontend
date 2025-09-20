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
import { AuthUserDto } from "@/lib/schema/user/user.dto";
import { logout } from "@/lib/utils/auth";
import { generateImageProfile } from "@/lib/utils/generate-profile-image";
import { LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface props {
  lang: Locale;
  user: AuthUserDto;
}

const NavProfileDropDown = ({ lang, user }: props) => {
  const { theme } = useTheme();
  const image = generateImageProfile(user.gender);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button library="daisy" variant="ghost" shape="circle">
          <Avatar className="size-10">
            <AvatarImage src={user?.image ? user.image : image} />
            <AvatarFallback>{user.role}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" data-theme={theme}>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={user?.image ? user.image : image} />
            <AvatarFallback>{user.role}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span> {user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/profile`}>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User />
              <span>Your Profile</span>
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            onClick={() => logout(lang)}
            type="button"
            variant="ghost"
            size="sm"
            className="text-error w-full cursor-pointer justify-start"
          >
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
