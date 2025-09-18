"use client";
import MyImage from "@/components/common/myImage";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import Link from "next/link";
import { TextTooltip } from "../comon/text-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface props {
  lang: Locale;
  isClassTeacher?: boolean;
  isStudent?: boolean;
  className?: string;
}

const SchoolCard = ({ lang, className, isClassTeacher, isStudent }: props) => {
  return (
    <div className={cn("basic-card relative h-auto p-0", className)}>
      <div className="relative">
        <MyImage
          src="https://i.pinimg.com/1200x/26/cd/e6/26cde6253b9328baeaa9bf10a7b32427.jpg"
          className="h-28 w-full"
          classname=" card rounded-b-none"
        />
        <Separator />
        <div className="absolute -bottom-20 flex items-center gap-2 p-4">
          <Avatar className="size-20">
            <AvatarImage src="https://img.freepik.com/free-vector/gradient-school-logo-design-template_23-2149664347.jpg?t=st=1745211049~exp=1745214649~hmac=678f349c9bd7752892a1fe4e786b2071c68c9c58a033d1066eab7663a99d4f4c&w=826" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className="mt-6 space-x-1">
            <Link href={`/${lang}/school/student`}>
              <h3 className="font-medium">SOS Technical School</h3>
            </Link>
            <Link className="text-sm" href={`/${lang}/school/student`}>
              @ SOSTS
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 p-4">
        {/* class members */}
        <div className="flex gap-2">
          <div className="text-myGray flex items-center -space-x-2">
            <Dot size={32} />
            <span className="text-sm">
              1k32 <TextTooltip content={"Student"} trigger={<span>ST</span>} />
            </span>
          </div>
          <div className="text-myGray flex items-center -space-x-2">
            <Dot size={32} />
            <span className="line text-sm">
              67 <TextTooltip content={"Teacher"} trigger={<span>TEA</span>} />
            </span>
          </div>
          <div className="text-myGray flex items-center -space-x-2">
            <Dot size={32} />
            <div className="flex items-center space-x-2 text-sm">
              <Avatar className="size-4">
                <AvatarImage src="/images/16.jpg" />
                <AvatarFallback className="text-sm">LOGO</AvatarFallback>
              </Avatar>
              {/* add link of class teacher */}
              <Link
                className={cn(
                  "link-hover line-clamp-1",
                  isClassTeacher ? "text-myGray" : "",
                )}
                href={`/${lang}/profile/1232`}
              >
                <TextTooltip
                  content={"Head master"}
                  trigger={<span>_Happy</span>}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {!isStudent && (
        <div className="px-4">
          <div className="flex justify-between">
            <h5 className="text-myGray font-medium capitalize">your classes</h5>
          </div>
          <div className="grid w-full grid-cols-2">
            <div className="flex -space-x-2">
              <Dot size={32} />
              <div className="flex items-center space-x-2 text-sm">
                <Avatar className="size-4">
                  <AvatarImage src="/images/19.jpg" />
                  <AvatarFallback className="text-sm">LOGO</AvatarFallback>
                </Avatar>
                {/* add link of class teacher */}
                <Link
                  className={cn(
                    "link-hover line-clamp-1",
                    isClassTeacher ? "text-myGray" : "",
                  )}
                  href={`/${lang}/class/1232`}
                >
                  <TextTooltip
                    content={"Level 5 Software Development"}
                    trigger={<span>L5SOD</span>}
                  />
                </Link>
              </div>
            </div>
            <div className="flex -space-x-2">
              <Dot size={32} />
              <div className="flex items-center space-x-2 text-sm">
                <Avatar className="size-4">
                  <AvatarImage src="/images/19.jpg" />
                  <AvatarFallback className="text-sm">LOGO</AvatarFallback>
                </Avatar>
                {/* add link of class teacher */}
                <Link
                  className={cn(
                    "link-hover line-clamp-1",
                    isClassTeacher ? "text-myGray" : "",
                  )}
                  href={`/${lang}/class/1232`}
                >
                  <TextTooltip
                    content={"Level 3 Networking"}
                    trigger={<span>L3SOD</span>}
                  />
                </Link>
              </div>
            </div>
            <div className="flex -space-x-2">
              <Dot size={32} />
              <div className="flex items-center space-x-2 text-sm">
                <Avatar className="size-4">
                  <AvatarImage src="/images/19.jpg" />
                  <AvatarFallback className="text-sm">LOGO</AvatarFallback>
                </Avatar>
                {/* add link of class teacher */}
                <Link
                  className={cn(
                    "link-hover line-clamp-1",
                    isClassTeacher ? "text-myGray" : "",
                  )}
                  href={`/${lang}/class/1232`}
                >
                  <TextTooltip
                    content={"Level 4 Software Development"}
                    trigger={<span>L4SOD</span>}
                  />
                </Link>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm">
              And others 3
            </Button>
          </div>
        </div>
      )}
      <Separator />
      <div className="p-4">
        {/* TODO: add link of class */}
        <Link href={`/${lang}/teacher/school/student`}>
          <Button
            library="daisy"
            variant={className ? "info" : isClassTeacher ? "info" : "primary"}
            className="w-full"
          >
            Join School
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SchoolCard;
