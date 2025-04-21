import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TbMessageCircleFilled } from "react-icons/tb";
import { GoPersonFill } from "react-icons/go";
import { Module, User, } from "../../../prisma/prisma/generated";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n";
import { TextTooltip } from "@/context/tooltip/text-tooltip";
import { getSubjectById } from "@/services/data/subject-data";

interface props {
  lang: Locale;
  user?: User | null;
  modules?: Module[] | null;
}

const UserCard = ({ lang, user, modules }: props) => {
  return (
    <div className=" p-0 basic-card w-80">
      <MyImage
        classname="card rounded-b-none"
        className=" w-full"
        src={user?.image ? user.image :"/images/2.jpg"}
      />
      <Separator />
      <div className="  p-4">
        <div className="flex  space-x-2 items-center">
          <h4 className=" font-semibold text-lg">
            {user ? user.name : "John Doe"}
          </h4>
          <p className=" text-sm text-gray-400">
            @ {user ? user.username : "JonhnDoe"}
          </p>
        </div>
        <div>
          {user && user.role === "TEACHER" && (
            <div>
              <h3 className=" font-medium text-myGray"> Subjects</h3>
              <div className=" grid grid-cols-2 gap-2">
                {modules &&
                  modules.map(async (item) => {
                    const getSubject = await getSubjectById(item.subject_id);
                    return (
                      <div key={item.id} className=" flex link-hover">
                        <Dot />
                        <span>{!!getSubject ? getSubject.name : "Math"}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Separator />
      <div className=" flex justify-between items-center gap-2 p-4">
        <Button className=" w-2/3 text-white" variant="info">
          <TbMessageCircleFilled size={28} /> Message
        </Button>
        <TextTooltip
          trigger={
            <Link href={`/${lang}/profile/bruno`} className=" w-1/3 btn">
              <GoPersonFill size={28} />
            </Link>
          }
          content={"See profile"}
        />
      </div>
    </div>
  );
};

export default UserCard;
