import ClassClassworkSettingForm from "@/components/page/class/setting/form/class-classwork-setting-form";
import ClassStudentPermissionForm from "@/components/page/class/setting/form/class-students-permissions-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ClassSettingsStudentsPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings/students">,
) => {
  const params = await props.params;
  return (
    <div className=" w-full flex flex-col gap-4">
      <div>
        <h3 className=" h3">Student Settings</h3>
        <p className=" text-base-content/50">
          These settings control how students are added, managed, and behave
          inside the class
        </p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Student permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ClassStudentPermissionForm />
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className=" h3">Classwork rules</h3>
        <p>Configure how classwork is submitted, reviewed, and managed.</p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Classwork Submission Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ClassClassworkSettingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassSettingsStudentsPage;
