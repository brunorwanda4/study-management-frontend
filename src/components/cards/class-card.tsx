import MyImage from "@/components/common/myImage";
import { Locale } from "@/i18n";
import { ClassDto } from "@/lib/schema/class/class.schema";
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
  isSchool?: boolean;
  isOther?: boolean; // others users which are not in class
  isStudent?: boolean;
  isNotes?: boolean;
  myClass?: ClassDto | null;
}

const ClassCard = async ({
  lang,
  isClassTeacher,
  isSchool,
  isOther,
  isStudent,
  myClass,
  isNotes,
}: props) => {
  const getUser = await authUser();
  return (
    <div className="basic-card relative h-auto p-0">
      <div className="relative">
        <MyImage
          src="https://img.freepik.com/free-photo/students-knowing-right-answer_329181-14271.jpg?t=st=1745210505~exp=1745214105~hmac=3f882c695e86b9db87db4ae4830ce8e407e5b44305df6ae24cb07a89942eb99d&w=1380"
          className="h-28 w-full"
          classname=" card rounded-b-none"
        />
        <Separator />
        <div className="absolute -bottom-20 flex items-center gap-2 p-4">
          <Avatar className="size-20">
            <AvatarImage
              src={
                myClass?.image
                  ? myClass.image
                  : "https://img.freepik.com/free-photo/boy-helping-his-friend-with-books_23-2148764069.jpg?t=st=1745210582~exp=1745214182~hmac=e009776674767118dd22fff3a6d02541ae9c89fb290cf7440ac7757cfc6f9123&w=1060"
              }
            />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className="mt-6 space-x-1">
            <h3 className="line-clamp-3 leading-5 font-medium">
              {myClass?.name ?? "Level 5 Software development"}
            </h3>
            <Link
              className="line-clamp-1 flex space-x-1 text-sm"
              href={`/${lang}/class/${myClass?.id}`}
            >
              <span>@</span>{" "}
              <span className="line-clamp-1">
                {myClass?.username ?? "L5SOD"}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 p-4">
        {/* class members */}
        {!isNotes && (
          <div className="flex gap-2">
            <div className="text-myGray flex items-center -space-x-2">
              <Dot size={24} />
              <span className="text-xs">
                32{" "}
                <TextTooltip
                  content={"Student"}
                  trigger={<span className="text-myGray text-xs">ST</span>}
                />
              </span>
            </div>
            <div className="text-myGray flex items-center -space-x-2">
              <Dot size={24} />
              <span className="line text-xs">
                <TextTooltip
                  content={"Teacher"}
                  trigger={<span className="text-myGray text-xs">TEA</span>}
                />
              </span>
            </div>
            <div className="text-myGray flex items-center -space-x-2">
              <Dot size={24} />
              <div className="flex items-center space-x-2 text-sm">
                <Avatar className="size-4">
                  <AvatarImage
                    src={getUser?.image ? getUser.image : "/images/17.jpg"}
                  />
                  <AvatarFallback className="text-sm">LOGO</AvatarFallback>
                </Avatar>
                {/* add link of class teacher */}
                <Link
                  className={cn(
                    "link-hover line-clamp-1",
                    isClassTeacher ? "text-myGray" : "",
                  )}
                  href={`/${lang}/profile/${
                    myClass?.creatorId ? myClass.creatorId : 1232
                  }`}
                >
                  <TextTooltip
                    content={"Class Teacher"}
                    trigger={
                      <span>
                        {getUser?.username ? getUser.username : getUser?.name}
                      </span>
                    }
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {isNotes && (
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
      )}
      {!isStudent && (
        <div className="px-4">
          <div className="flex justify-between">
            <h5 className="text-myGray font-medium capitalize">your lessons</h5>
            {isSchool && (
              <div className="flex space-x-2 py-2">
                <Avatar className="size-4">
                  <AvatarImage src="/images/19.jpg" />
                  <AvatarFallback className="text-sm">LOGO</AvatarFallback>
                </Avatar>
                {/* TODO: add school link */}
                <Link
                  href={`/${lang}/school/student`}
                  className="link-hover line-clamp-1 text-sm font-medium"
                >
                  SOSTHS
                </Link>
              </div>
            )}
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
      )}
      <Separator />
      <div className="p-4">
        {/* TODO: add link of class */}
        {isOther ? (
          <Link href={`/${lang}/class/student/about`} className="btn w-full">
            About class
          </Link>
        ) : (
          <Link
            href={
              isNotes
                ? `/${lang}/notes/classes/1234`
                : `/${lang}/class/${myClass?.id ? myClass.id : "student"}`
            }
          >
            <Button
              library="daisy"
              variant={isClassTeacher ? "info" : "primary"}
              className="w-full"
            >
              {isNotes ? "See notes" : "Join class"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
