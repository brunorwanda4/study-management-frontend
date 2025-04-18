import { TextTooltip } from "@/components/myComponents/text-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";

interface props {
  lang: Locale;
}

const NavMessageDropDownCard = ({ lang }: props) => {
  return (
    <DropdownMenuItem>
      <Avatar className=" size-10  ">
        <AvatarImage src={"/images/14.jpg"} />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div>
        <Link
          href={`/${lang}/messages/students`}
          className=" flex  space-x-2 items-center"
        >
          <h4>Bruno Irakoze</h4>
          <TextTooltip
            content={<span>Teacher</span>}
            trigger={
              <span className=" font-medium text-xs text-myGray">TR</span>
            }
          />
        </Link>
        <p className=" line-clamp-1 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
        </p>
      </div>
    </DropdownMenuItem>
  );
};

export default NavMessageDropDownCard;
