import UpdateClassPublicInfoForm from "@/components/page/class/setting/form/update-class-public-info-form";
import NotFoundPage from "@/components/page/not-found";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { getClassById } from "@/service/class/class.service";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassSettingPage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [currentUser] = await Promise.all([getAuthUserServer()]);

  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    return redirect(`/${lang}/auth/onboarding`);
  }
  const cls = await getClassById(classId);
  if (!cls.data) return <NotFoundPage />;
  return (
    <div className=" space-y-4">
      <h2 className=" title-page">Class Setting</h2>
      {/* TODO: make school management where to add class subjects and class teacher management */}
      <UpdateClassPublicInfoForm classData={cls.data} />
    </div>
  );
};

export default ClassSettingPage;
