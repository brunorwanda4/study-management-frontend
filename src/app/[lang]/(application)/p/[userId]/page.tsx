import ProfileAside from "@/components/profile/profile-aside";
import ProfileStudentClassesCard from "@/components/profile/student/profile-student-classes-card";
import StudentPerformanceCard from "@/components/profile/student/student-perfomance-card";
import UserFavoriteSubjects from "@/components/profile/user-favorite-subjects";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ProfilePageById = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser] = await Promise.all([getAuthUserServer()]);

  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    return redirect(`/${lang}/auth/onboarding`);
  }
  return (
    <div className=" px-4 py-2 space-x-4 md:space-y-4 flex">
      {/* <ProfileAside lang={lang} /> */}
      <div className=" w-2/3 space-y-4">
        <UserFavoriteSubjects />
        <StudentPerformanceCard />
        <ProfileStudentClassesCard lang="en" />
      </div>
    </div>
  );
};

export default ProfilePageById;
