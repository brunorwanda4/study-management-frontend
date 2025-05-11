import { Locale } from "@/i18n";
import MyImage from "../myComponents/myImage";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { classImage } from "@/lib/context/images";
import MyLink from "../myComponents/myLink";
import { moduleANdOthers } from "@/lib/schema/class/module.dto";
import { BsGear } from "react-icons/bs";

interface props {
  lang: Locale;
  module: moduleANdOthers;
}
const SubjectCard = ({ lang, module }: props) => {
  return (
    <Card>
      <CardHeader className=" flex justify-between items-center">
        <CardTitle className=" flex flex-col space-y-2">
          <MyLink
            loading
            className=" underline-offset-0 capitalize"
            href={`/${lang}/c/${module.classId}/subjects/${module.id}`}
          >
            {module.name}
          </MyLink>
          <MyLink
            loading
            className=" underline-offset-0"
            href={`/${lang}/c/${module.classId}/subjects/${module.id}`}
          >
            <span className=" text-sm ">{module.code}</span>
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
        <div className=" text-base mb-4">
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
            className="flex items-center mb-4 border-t pt-4 border-t-base-300"
          >
            <MyImage
              className="w-10 h-10 rounded-full mr-4 object-cover"
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
            className="flex items-center mb-4 border-t pt-4 border-t-base-content/20"
          >
            <MyImage
              className="w-10 h-10 rounded-full mr-4 object-cover"
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
