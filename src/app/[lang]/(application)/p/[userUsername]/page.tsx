import DevelopingPage from "@/components/page/developing-page";
import NotFoundPage from "@/components/page/not-found";
import ProfileAside from "@/components/profile/profile-aside";
import ProfileStudentClassesCard from "@/components/profile/student/profile-student-classes-card";
import StudentPerformanceCard from "@/components/profile/student/student-perfomance-card";
import UserFavoriteSubjects from "@/components/profile/user-favorite-subjects";
import { Locale } from "@/i18n";
import { UserModel } from "@/lib/schema/user/user-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";
interface Props {
  params: Promise<{ lang: Locale; userUsername: string }>;
}
const ProfilePageById = async (props: Props) => {
  const params = await props.params;
  const { lang, userUsername } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const [user] = await Promise.all([
    apiRequest<void, UserModel>(
      "get",
      `/users/username/${userUsername}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  if (!user.data) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex space-x-4 px-4 py-2 md:space-y-4">
      <ProfileAside lang={lang} user={user.data} />
      {user.data.role === "STUDENT" ? (
        <div className="w-2/3 space-y-4">
          <UserFavoriteSubjects />
          <StudentPerformanceCard />
          <ProfileStudentClassesCard lang="en" />
        </div>
      ) : (
        <DevelopingPage role={auth.user.role} lang={lang} />
      )}
    </div>
  );
};

export default ProfilePageById;
