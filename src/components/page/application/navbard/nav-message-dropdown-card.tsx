import { TextTooltip } from "@/components/common/text-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

const NavMessageDropDownCard = () => {
  return (
    <DropdownMenuItem>
      <Avatar className="size-10">
        <AvatarImage src={"/images/14.jpg"} />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div>
        <Link
          href={`/messages/students`}
          className="flex items-center space-x-2"
        >
          <h4>Bruno Irakoze</h4>
          <TextTooltip
            content={<span>Teacher</span>}
            trigger={
              <span className="text-myGray text-xs font-medium">TR</span>
            }
          />
        </Link>
        <p className="line-clamp-1 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
        </p>
      </div>
    </DropdownMenuItem>
  );
};

export default NavMessageDropDownCard;
