import ChangeClassUsernameAndCode from "@/components/page/class/setting/change-class-username-and-code";
import UpdateClassPublicInfo from "@/components/page/class/setting/form/update-class-public-info-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassSettingPage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [auth] = await Promise.all([authContext()]);

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className=" w-full flex flex-col gap-4">
      <div>
        <h3 className=" h3">General Settings</h3>
        <p className=" text-base-content/50">
          These control the identity and appearance of the class
        </p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Class public info</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateClassPublicInfo />
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className=" h3">Change class username & Code </h3>
        <Separator />
        <Card>
          <CardContent>
            <ChangeClassUsernameAndCode />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // return (
  //   <div className="space-y-4">
  //     <h2 className="title-page">Class Setting</h2>
  //     {/* TODO: make school management where to add class subjects and class teacher management */}
  //     <UpdateClassPublicInfoForm classData={cls.data} />
  //   </div>
  // );
};

export default ClassSettingPage;
