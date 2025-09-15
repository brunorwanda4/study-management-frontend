import ClassStudentCard from "@/components/page/class/cards/class-students-card";
import ClassTeacherCard from "@/components/page/class/cards/class-teachers-card";
import NotFoundPage from "@/components/page/not-found";
import { Locale } from "@/i18n";
import { authUser } from "@/lib/utils/auth-user";;
import { getAllStudentByClassId } from "@/service/school/class-student-services";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassIdPeoplePage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [currentUser] = await Promise.all([authUser()]);

  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    return redirect(`/${lang}/auth/onboarding`);
  }

  const [student] = await Promise.all(
    [getAllStudentByClassId(classId)]
  )
  if (!student.data) {
    return <NotFoundPage />;
  }

  return (
    <div className=" flex space-x-4 w-full">
      <div className=" w-1/2">
        <ClassStudentCard student={student.data || []} lang={lang} />
      </div>
      <div className=" w-1/2">
        <ClassTeacherCard lang={lang} clsId={classId} />
      </div>
    </div>
  );
};

export default ClassIdPeoplePage;
