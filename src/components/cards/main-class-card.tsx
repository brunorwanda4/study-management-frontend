import { Locale } from "@/i18n";
import { ClassDto } from "@/lib/schema/class/class-schema";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface props {
  lang: Locale;
  mainClass?: ClassDto | null;
}

const MainClassCard = ({ lang, mainClass }: props) => {
  return (
    <div className="basic-card relative h-full justify-between p-0">
      <div className="relative">
        <div className="flex items-center gap-2 p-4">
          <Avatar className="size-20">
            <AvatarImage
              src={mainClass?.image ? mainClass.image : "/images/19.jpg"}
            />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className="space-x-1">
            <h3 className="line-clamp-3 leading-5 font-medium">
              {mainClass?.name ?? "Level 5 Software development"}
            </h3>
            <Link
              className="line-clamp-1 flex space-x-1 text-sm"
              href={`/${lang}/class/${mainClass?.id}`}
            >
              <span>@</span>{" "}
              <span className="line-clamp-1">
                {mainClass?.username ?? "L5SOD"}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* description of main class */}
      <div className="line-clamp-2 px-4 text-sm">
        <p>{/* {mainClass?.description } */}</p>
      </div>
      <div className="px-4">
        <div className="flex justify-between">
          <h5 className="text-myGray font-medium capitalize">Lessons</h5>
        </div>
        <div className="grid w-full grid-cols-4">
          <div className="flex items-center -space-x-2">
            <Dot size={32} />
            <span className="line text-sm">Math</span>
          </div>
          <div className="flex items-center -space-x-2">
            <Dot size={32} />
            <span className="line text-sm">Kiny</span>
          </div>
          <div className="flex items-center -space-x-2">
            <Dot size={32} />
            <span className="line text-sm">Kisw</span>
          </div>
        </div>
      </div>
      <Separator />
      <div className="p-4">
        <Link
          href={`/${lang}/admin/main-classes/${mainClass?.id ? mainClass.id : 123}`}
        >
          <Button library="daisy" variant={"info"} className="w-full">
            Join main class
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainClassCard;
