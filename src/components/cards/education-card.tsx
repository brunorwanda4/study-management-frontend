import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Dot } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n";
import { Education } from "../../../prisma/prisma/generated";
import EducationDialogDetails from "../site/collection/education/education-dialog-daitails";

interface props {
  lang: Locale;
  education?: Education | null;
}

const EducationCard = ({ lang, education }: props) => {
  return (
    <div className=" basic-card p-0 relative h-auto justify-between">
      <div className=" relative">
        <div className=" p-4 flex items-center gap-2">
          <Avatar className=" size-20">
            <AvatarImage
              src={
                education?.symbol ? education.symbol : "/images/REB_Logo.png"
              }
            />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className=" space-x-1">
            <h3 className=" font-medium leading-5 line-clamp-3">
              {education?.name ?? "Rwanda Education Board"}
            </h3>
            <Link
              className=" text-sm line-clamp-1 flex space-x-1"
              href={`/${lang}/class/${education?.id}`}
            >
              <span>@</span>{" "}
              <span className=" line-clamp-1">
                {education?.username ?? "REB"}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* description of main class */}
      <div className="  text-sm line-clamp-2 px-4">
        <p>
          {education?.description
            ? education.description
            : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur  error itaque neque esse delectus ad dolorum dolores facere, asperiores quaerat dolor maxime ex fugiat suscipit distinctio ut obcaecati sequi"}{" "}
          cum?
        </p>
      </div>
      <div className=" px-4">
        <div className=" flex justify-between">
          <h5 className=" capitalize font-medium text-myGray">Sector</h5>
        </div>
        <div className=" grid grid-cols-3 w-full">
          <div className=" flex items-center -space-x-2">
            <Dot size={32} />
            <span className=" text-sm line">Primary</span>
          </div>
          <div className=" flex items-center -space-x-2">
            <Dot size={32} />
            <span className=" text-sm line">O-Level</span>
          </div>
          <div className=" flex items-center -space-x-2">
            <Dot size={32} />
            <span className=" text-sm line">A-Level</span>
          </div>
        </div>
      </div>
      <Separator />
      <div className=" p-4">
       <EducationDialogDetails education={education}/>
      </div>
    </div>
  );
};

export default EducationCard;
