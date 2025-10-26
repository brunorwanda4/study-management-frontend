import type { Locale } from "@/i18n";
import { classImage } from "@/lib/context/images";
import type { SubjectWithRelations } from "@/lib/schema/subject/subject-schema";
import { BsGear } from "react-icons/bs";
import MyImage from "../common/myImage";
import MyLink from "../common/myLink";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface props {
  lang: Locale;
  module: SubjectWithRelations;
}
const SubjectCard = ({ lang, module }: props) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex flex-col space-y-2">
          <MyLink
            loading
            className="capitalize underline-offset-0"
            href={`/${lang}/c/${module.class}/subjects/${module.id}`}
          >
            {module.name}
          </MyLink>
          <MyLink
            loading
            className="underline-offset-0"
            href={`/${lang}/c/${module.class?.username}/subjects/${module.id}`}
          >
            <span className="text-sm">{module.code}</span>
          </MyLink>
        </CardTitle>
        <MyLink
          loading
          type="button"
          button={{ library: "daisy", variant: "ghost", shape: "circle" }}
          href={`/${lang}/c/${module.class?.username}/subjects/${module.id}`}
        >
          <BsGear size={24} />
        </MyLink>
      </CardHeader>

      {/* Module Details */}
      <CardContent>
        <div className="mb-4 text-base">
          <p>Subject Type: {module.subject_type}</p>
          <p>Curriculum: {module.main_subject?.category}</p>
          <p>Topics: 12</p>
          <p>Learning Hours: Hr 75</p>
        </div>

        {/* Teacher Information */}
        {module.class_teacher && (
          <MyLink
            loading
            href={`/${lang}/p/${module.class_teacher.user_id}?teacherID=${module.class_teacher.id}`}
            className="border-t-base-300 mb-4 flex items-center border-t pt-4"
          >
            <MyImage
              className="mr-4 h-10 w-10 rounded-full object-cover"
              src={module.class_teacher?.image || "/images/p.jpg"}
              alt={`Teacher`}
            />
            <div className="text-sm">
              <p className="leading-none">
                Teacher: {module.class_teacher?.name}
              </p>
            </div>
          </MyLink>
        )}

        {/* Class Information */}
        {module.class && (
          <MyLink
            loading
            href={`/${lang}/c/${module.class.username}`}
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
