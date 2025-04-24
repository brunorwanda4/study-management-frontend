import SchoolJoinRequestCard from "@/components/cards/school-Join-request-card";
import JoinSchoolDialog from "@/components/dialog/join-school-dialg";
import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { GetAllJoinSchoolRequestByCurrentUserEmail } from "@/service/school/school-join-request.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
  const getSchoolJoinRequest = await GetAllJoinSchoolRequestByCurrentUserEmail(
    currentUser.email
  );
  return (
    <div className="w-full px-4 py-2 space-y-4 grid place-content-center h-full">
      <JoinSchoolDialog />
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
