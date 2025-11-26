import { UserSmCard } from "@/components/cards/user-card";
import ClassTeacherPermissionForm from "@/components/page/class/setting/form/class-teacher-permission-form";
import ClassTeacherSettingPageFilter from "@/components/page/class/setting/teacher/class-teachers-settings-page-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ClassSettingsTeachersPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings/students">,
) => {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-4">
      <div>
        <h3 className=" h3">Teacher Settings</h3>
        <p className=" text-base-content/50">
          This is for managing all teachers connected to the class
        </p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Teacher permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ClassTeacherPermissionForm />
          </CardContent>
        </Card>
      </div>

      <div className=" flex flex-col gap-2 ">
        <ClassTeacherSettingPageFilter />
        <Separator />
        {/*students*/}
        <div className=" grid grid-cols-2  gap-2 gap-x-8 w-full">
          {[...Array(9)].map((_, t) => {
            return (
              <UserSmCard
                key={t}
                showMessage
                name="Teacher name"
                gender="MALE"
                className="w-full"
                subjects={["Kinyarwanda", "English"]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassSettingsTeachersPage;
