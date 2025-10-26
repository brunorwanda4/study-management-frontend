import { LucideChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UseTheme from "@/lib/context/theme/use-theme";

const ProfileButton = () => {
  const theme = UseTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button variant="ghost" className="  " size="sm">
          <LucideChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent ata-theme={theme} className="w-56 bg-base-300 p-4">
        hello world
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
