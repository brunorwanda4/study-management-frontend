import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import DevelopingPage from "@/components/page/developing-page";
import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import { Locale } from "@/i18n";
import { getSchoolServer } from "@/lib/utils/auth";
import { authContext } from "@/lib/utils/auth-context";
import { GetAllJoinSchoolRequestByCurrentUserEmail } from "@/service/school/school-join-request.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "School Dashboard",
};

interface props {
  params: Promise<{ lang: Locale }>;
}
const TeacherPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    await authContext(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.user.role) {
    redirect(`/${lang}/auth/onboarding`);
  }

  const getSchoolJoinRequest = await GetAllJoinSchoolRequestByCurrentUserEmail(
    currentUser.user.email,
  );
  if (currentSchool) {
    return <DevelopingPage lang={lang} role={currentUser.user.role} />;
  }
  return (
    <div className="grid h-full w-full place-content-center space-y-4 px-4 py-2">
      <JoinSchoolDialog />
      {getSchoolJoinRequest.data && (
        <JoinSchoolRequestBody
          lang={lang}
          currentUser={currentUser.user}
          requests={getSchoolJoinRequest.data}
        />
      )}
    </div>
  );
};

export default TeacherPage;
