import { Locale } from "@/i18n";
import MyImage from "../myComponents/myImage";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { classImage } from "@/lib/context/images";
import MyLink from "../myComponents/myLink";

interface props {
  lang: Locale;
}
const SubjectCard = ({ lang }: props) => {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle className="">
          <MyLink
            className=" underline-offset-0"
            href={`/${lang}/c/classId/subjects/1234`}
          >
            Kinyarwanda
          </MyLink>
        </CardTitle>
        <p className="text-sm mb-4">
          <MyLink
            className=" underline-offset-0"
            href={`/${lang}/c/classId/subjects/1234`}
          >
            Code: 754De
          </MyLink>
        </p>
      </CardHeader>

      {/* Module Details */}
      <CardContent>
        <div className=" text-base mb-4">
          <p>Subject Type: General</p>
          <p>Curriculum: REB</p>
          <p>Topics: 12</p>
          <p>Learning Hours: Hr 75</p>
        </div>

        {/* Teacher Information */}
        <MyLink
          href={`/${lang}/p/hello?teacherID=00343`}
          className="flex items-center mb-4 border-t pt-4 border-t-base-content/20"
        >
          <MyImage
            className="w-10 h-10 rounded-full mr-4 object-cover"
            src={"/images/p.jpg"}
            alt={`Teacher`}
          />
          <div className="text-sm">
            <p className="leading-none">Teacher: Teacher name</p>
            {/* Add other teacher details if needed */}
          </div>
        </MyLink>

        {/* Class Information */}
        <MyLink
          href={`/${lang}/c/12434`}
          className="flex items-center mb-4 border-t pt-4 border-t-base-content/20"
        >
          <MyImage
            className="w-10 h-10 rounded-full mr-4 object-cover"
            src={classImage}
            alt={classImage}
          />
          <div className="text-sm">
            <p className="leading-none">Class: class name</p>
          </div>
        </MyLink>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
