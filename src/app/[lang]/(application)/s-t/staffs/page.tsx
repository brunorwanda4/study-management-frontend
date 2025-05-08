// import { Metadata } from "next";
import type { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import NotFoundPage from "@/components/page/not-found";
import { getAllStaffBySchoolId } from "@/service/school/staff-services";
import SchoolStaffTable from "@/components/page/school-staff/table/staff-table/table-staff";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const metadata = async (): Promise<Metadata> => {
  const school = await getSchoolServer();
  return {
    title: school?.name
      ? `All Staff in ${school?.schoolName}`
      : "School not found",
    description: school?.name
      ? `All Staff in ${school?.schoolName}`
      : "school not found",
  };
};
const SchoolStaffStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    getAuthUserServer(),
    getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentSchool)
    return <NotFoundPage message="You need to have school to view this page" />;
  const [allStaffs] = await Promise.all([
    getAllStaffBySchoolId(currentSchool.schoolId),
  ]);

  return (
    <div className="p-4 space-y-4 ">
      <div>
      <SchoolStaffTable
         schoolId={currentSchool.schoolId}
         lang={lang}
         staffs={allStaffs.data ?? []}
      />
      </div>
    </div>
  );
};
export default SchoolStaffStaffPage;
