import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import DevelopingPage from "@/components/page/developing-page";
import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import JoinClassDialog from "@/components/page/student/dialogs/join-class-dialog";
import { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
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
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const join_school_requestsRes = await apiRequest<
    void,
    JoinSchoolRequestWithRelations[]
  >("get", `/join-school-requests/my/pending`, undefined, {
    token: auth.token,
    schoolToken: auth.schoolToken,
    realtime: "join_school_request",
  });

  if (auth.school) {
    return <DevelopingPage lang={lang} role={auth.user.role} />;
  }

  return (
    <RealtimeProvider<JoinSchoolRequestWithRelations>
      channels={[
        {
          name: "join_school_request",
          initialData: join_school_requestsRes.data
            ? join_school_requestsRes.data
            : [],
        },
      ]}
    >
      <div className="grid h-full min-h-screen w-full place-content-center space-y-4 px-4 py-2">
        <div className="flex space-x-4">
          <JoinSchoolDialog />
          <JoinClassDialog />
        </div>
        {join_school_requestsRes.data && (
          <JoinSchoolRequestBody
            lang={lang}
            auth={auth}
            requests={join_school_requestsRes.data}
            realtimeEnabled={true}
          />
        )}
      </div>
    </RealtimeProvider>
  );
};

export default StudentPage;
