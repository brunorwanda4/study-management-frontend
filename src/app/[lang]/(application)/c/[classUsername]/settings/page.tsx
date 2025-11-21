import DevelopingPage from "@/components/page/developing-page";
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

  return <DevelopingPage lang={lang} role={auth.user.role} />;

  // return (
  //   <div className="space-y-4">
  //     <h2 className="title-page">Class Setting</h2>
  //     {/* TODO: make school management where to add class subjects and class teacher management */}
  //     <UpdateClassPublicInfoForm classData={cls.data} />
  //     <UpdateClassMembers />
  //   </div>
  // );
};

export default ClassSettingPage;
