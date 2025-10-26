"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";

const PostCardHeaderDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button library="daisy" variant="ghost" size="sm" shape="circle">
          <BsThreeDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Report</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-error cursor-pointer">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostCardHeaderDropdown;
