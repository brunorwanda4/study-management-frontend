import ClassStudentCard from "@/components/page/class/cards/class-students-card";
import ClassTeacherCard from "@/components/page/class/cards/class-teachers-card";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassIdPeoplePage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [auth] = await Promise.all([authContext()]);

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const student = { data: [] };
  if (!student.data) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex w-full space-x-4">
      <div className="w-1/2">
        <ClassStudentCard student={student.data || []} lang={lang} />
      </div>
      <div className="w-1/2">
        <ClassTeacherCard lang={lang} clsId={classId} />
      </div>
    </div>
  );
};

export default ClassIdPeoplePage;
