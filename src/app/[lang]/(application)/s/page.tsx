import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { GetAllJoinSchoolRequestByCurrentUserEmail } from "@/service/school/school-join-request.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import DevelopingPage from "@/components/page/developing-page";
import JoinClassDialog from "@/components/page/student/dialogs/join-class-dialog";

export const metadata: Metadata = {
  title: "School Dashboard",
};

interface props {
  params: Promise<{ lang: Locale }>;
}
const StudentPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    await getAuthUserServer(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    redirect(`/${lang}/auth/onboarding`);
  }

  const getSchoolJoinRequest = await GetAllJoinSchoolRequestByCurrentUserEmail(
    currentUser.email
  );
  if (currentSchool) {
    return <DevelopingPage lang={lang} role={currentUser.role} />;
  }
  return (
    <div className="w-full px-4 py-2 space-y-4 grid place-content-center h-full">
      <div className=" flex space-x-4">
        <JoinSchoolDialog />
        <JoinClassDialog />
      </div>
      {getSchoolJoinRequest.data && (
        <JoinSchoolRequestBody
          lang={lang}
          currentUser={currentUser}
          requests={getSchoolJoinRequest.data}
        />
      )}
    </div>
  );
};

export default StudentPage;
