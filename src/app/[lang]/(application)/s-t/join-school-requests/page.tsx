import JoinSchoolPage from "@/components/page/join-school-page";
import SchoolJoinRequestsTable from "@/components/page/school-staff/table/school-join-request-table/SchoolJoinRequestsTable";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { GetAllSchoolJoinRequestBySchoolId } from "@/service/school/school-join-request.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "School Join Requests",
  description: "Join School Requests",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}
const JoinSchoolRequestPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    getAuthUserServer(),
    getSchoolServer(),
  ]);
  if (!currentUser?.role) return redirect(`/${lang}/auth/login`);
  if (!currentSchool) return <JoinSchoolPage />;
  const requests = await GetAllSchoolJoinRequestBySchoolId(
    currentSchool.schoolId
  );
  return (
    <div className="p-4 space-y-2 max-w-full">
      <h2 className=" title-page">School Join Request</h2>
      <div>
        <SchoolJoinRequestsTable requests={requests.data || []} lang={lang} />
      </div>
    </div>
  );
};

export default JoinSchoolRequestPage;
