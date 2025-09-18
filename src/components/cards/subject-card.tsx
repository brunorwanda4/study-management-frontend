import { Locale } from "@/i18n";
import { classImage } from "@/lib/context/images";
import { moduleANdOthers } from "@/lib/schema/class/module.dto";
import { BsGear } from "react-icons/bs";
import MyImage from "../comon/myImage";
import MyLink from "../comon/myLink";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface props {
  lang: Locale;
  module: moduleANdOthers;
}
const SubjectCard = ({ lang, module }: props) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex flex-col space-y-2">
          <MyLink
            loading
            className="capitalize underline-offset-0"
            href={`/${lang}/c/${module.classId}/subjects/${module.id}`}
          >
            {module.name}
          </MyLink>
          <MyLink
            loading
            className="underline-offset-0"
            href={`/${lang}/c/${module.classId}/subjects/${module.id}`}
          >
            <span className="text-sm">{module.code}</span>
          </MyLink>
        </CardTitle>
        <MyLink
          loading
          type="button"
          button={{ library: "daisy", variant: "ghost", shape: "circle" }}
          href={`/${lang}/c/${module.classId}/subjects/${module.id}`}
        >
          <BsGear size={24} />
        </MyLink>
      </CardHeader>

      {/* Module Details */}
      <CardContent>
        <div className="mb-4 text-base">
          <p>Subject Type: {module.subjectType}</p>
          <p>Curriculum: {module.curriculum}</p>
          <p>Topics: 12</p>
          <p>Learning Hours: Hr 75</p>
        </div>

        {/* Teacher Information */}
        {module.teacher && (
          <MyLink
            loading
            href={`/${lang}/p/${module.teacher.userId}?teacherID=${module.teacher.id}`}
            className="border-t-base-300 mb-4 flex items-center border-t pt-4"
          >
            <MyImage
              className="mr-4 h-10 w-10 rounded-full object-cover"
              src={module.teacher?.image || "/images/p.jpg"}
              alt={`Teacher`}
            />
            <div className="text-sm">
              <p className="leading-none">Teacher: {module.teacher?.name}</p>
            </div>
          </MyLink>
        )}

        {/* Class Information */}
        {module.class && (
          <MyLink
            loading
            href={`/${lang}/c/${module.classId}`}
            className="border-t-base-content/20 mb-4 flex items-center border-t pt-4"
          >
            <MyImage
              className="mr-4 h-10 w-10 rounded-full object-cover"
              src={module.class.image || classImage}
              alt={module.class.name}
            />
            <div className="text-sm">
              <p className="leading-none">{module.class.name}</p>
            </div>
          </MyLink>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
