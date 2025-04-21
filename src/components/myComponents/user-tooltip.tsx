import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import Link from "next/link";

interface props {
  trigger: string | React.ReactNode;
  lang: Locale;
}

export default function UserTooltip({ trigger , lang}: props) {
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent className=" w-72">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className=" size-12">
              <AvatarImage src="/profiles/b/20.png" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
            <div>
              <div className="space-y-0.5 flex space-x-2">
                <h5 className="text-sm font-medium">Keith Kennedy</h5>
                <p className="text-xs text-muted-foreground">@k.kennedy</p>
              </div>
              <strong className=" text-xs text-myGray ">STUDENT</strong>
            </div>
          </div>
          <div className=" flex space-x-2">
            <div className=" flex -space-x-2 text-myGray items-center text-sm">
              <Dot size={32} />
              <span>SOSTHCS</span>
            </div>
            <div className=" flex -space-x-2 text-myGray items-center text-sm">
              <Dot size={32} />
              <span>L5SOD</span>
            </div>
          </div>
          <Link href={`/${lang}/messages/student`}>
          <Button library="daisy" variant="info" size="sm" className=" w-full">Message</Button>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
