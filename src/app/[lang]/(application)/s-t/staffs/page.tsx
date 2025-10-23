// import { Metadata } from "next";
import NotFoundPage from "@/components/page/not-found";
import SchoolStaffTable from "@/components/page/school-staff/table/staff-table/table-staff";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { SchoolStaffWithRelations } from "@/lib/schema/school/school-staff-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const metadata = async (): Promise<Metadata> => {
  const auth = await authContext();
  return {
    title: auth?.school?.name
      ? `School Staff in ${auth?.school?.name}`
      : "School not found",
    description: auth?.school?.name
      ? `Staff in ${auth?.school?.name}`
      : "school not found",
  };
};
const SchoolStaffStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  if (!auth.school)
    return <NotFoundPage message="You need to have school to view this page" />;
  const [school_staffs_res] = await Promise.all([
    apiRequest<void, SchoolStaffWithRelations[]>(
      "get",
      `/school/staff/with-details?limit=10`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "school_staff",
      },
    ),
  ]);

  return (
    <RealtimeProvider<SchoolStaffWithRelations>
      channels={[
        {
          name: "school_staff",
          initialData: school_staffs_res.data ? school_staffs_res.data : [],
        },
      ]}
    >
      <div className="space-y-4 p-4">
        <div>
          <SchoolStaffTable
          realtimeEnabled
            auth={auth}
            lang={lang}
            staffs={school_staffs_res.data ?? []}
          />
        </div>
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffStaffPage;
