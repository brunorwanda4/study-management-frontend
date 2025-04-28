import ClassStudentCard from "@/components/page/class/cards/class-students-card";
import ClassTeacherCard from "@/components/page/class/cards/class-teachers-card";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassIdPeoplePage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [currentUser] = await Promise.all([getAuthUserServer()]);

  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    return redirect(`/${lang}/auth/onboarding`);
  }
  return (
    <div className=" flex space-x-4 w-full">
      <div className=" w-1/2">
        <ClassStudentCard lang={lang} />
      </div>
      <div className=" w-1/2">
        <ClassTeacherCard lang={lang} clsId={classId} />
      </div>
    </div>
  );
};

export default ClassIdPeoplePage;
