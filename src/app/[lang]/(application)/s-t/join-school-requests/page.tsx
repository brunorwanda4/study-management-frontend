import JoinSchoolPage from "@/components/page/join-school-page";
import SchoolJoinRequestsTable from "@/components/page/school-staff/table/school-join-request-table/join-school-request-table";
import { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { Class } from "@/lib/schema/class/class-schema";
import { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const auth = await authContext();
  if (!auth?.school)
    return {
      title: "School not found",
      description: "It school not login",
    };
  return {
    title: `Join school request of ${auth.school?.name}` || "School not found",
  };
};

interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}
const JoinSchoolRequestPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) return redirect(`/${lang}/auth/login`);
  if (!auth.school) return <JoinSchoolPage />;

  const [requests_res, classes_res] = await Promise.all([
    apiRequest<void, JoinSchoolRequestWithRelations[]>(
      "get",
      `/join-school-requests/with-relations?school_id=${auth.school.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "join_school_request",
      },
    ),
    apiRequest<void, Class[]>("get", `/school/classes`, undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
      realtime: "class",
    }),
  ]);

  return (
    <RealtimeProvider<JoinSchoolRequestWithRelations | Class>
      channels={[
        {
          name: "join_school_request",
          initialData: requests_res.data ?? [],
        },
        {
          name: "class",
          initialData: classes_res.data ?? [],
        },
      ]}
    >
      <div className="max-w-full space-y-2 p-4">
        <h2 className="title-page">School Join Request</h2>
        <SchoolJoinRequestsTable
          auth={auth}
          requests={requests_res.data ?? []}
          lang={lang}
          classes={classes_res.data ?? []}
          realtimeEnabled
        />
      </div>
    </RealtimeProvider>
  );
};

export default JoinSchoolRequestPage;
