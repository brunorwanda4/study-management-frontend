import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n";
import { studentImage } from "@/lib/context/images";
import { StudentWithRelations } from "@/lib/schema/school/student-schema";
import { BsGear, BsPlusCircle } from "react-icons/bs";

interface props {
  lang: Locale;
  student: StudentWithRelations[];
}

const ClassStudentCard = ({ lang, student }: props) => {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Students</CardTitle>
        <Button variant={"primary"} library="daisy" size={"sm"}>
          <BsPlusCircle /> Add Student
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        {student.map((item) => {
          return (
            <div
              key={item.id}
              className="hover:bg-base-300 card flex w-full flex-row justify-between p-2 duration-200"
            >
              <div className="flex space-x-2">
                <MyLink
                  loading
                  href={`/${lang}/p/${item.user?.username}?studentId=${item.id}`}
                >
                  <MyImage
                    role="AVATAR"
                    src={item.user?.image || studentImage}
                    className="size-12"
                    classname=" mask mask-squircle"
                  />
                </MyLink>
                <div>
                  <MyLink
                    loading
                    href={`/${lang}/p/${item.user?.username}?studentId=${item.id}`}
                    className="small-title underline-offset-0"
                  >
                    {item.name}
                  </MyLink>
                  <p>{item.gender}</p>
                </div>
              </div>
              {/* TODO: make dialog for managing student */}
              <Button shape={"circle"} library="daisy" variant={"ghost"}>
                <BsGear size={24} />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ClassStudentCard;
