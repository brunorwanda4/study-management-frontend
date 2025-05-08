import NotFoundPage from "@/components/page/not-found";
import { BasicInformationForm } from "@/components/page/school-staff/school-setting/forms/basic-information";
import { ContactLocationForm } from "@/components/page/school-staff/school-setting/forms/contact-location";
import { FacilitiesOperationsForm } from "@/components/page/school-staff/school-setting/forms/facilities-operations";
// import UpdateSchoolPublicInfo from "@/components/page/school-staff/school-setting/forms/update-school-public-info-form";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "School setting",
  description: "Join School Requests",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}

const SchoolSettingsPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([getAuthUserServer(), getSchoolServer()]);
  if (!currentUser?.role) return redirect(`/${lang}/auth/login`);
  if (!currentSchool) return <NotFoundPage message="You need to have school to access this page"/>
  const school = await getSchoolByIdService(currentSchool.schoolId);
  if (!school.data) return <NotFoundPage />
  return (
    <div className=" space-y-4">
      <h2 className=" title-page">School Public Information</h2>
      <BasicInformationForm schoolId={school.data.id} initialData={school.data} />
      {/* <AcademicDetailsForm
        initialData={{
          ...school.data,
          affiliation: ["Government", "Religious", "NGO", "independent"].includes(school.data.affiliation || "")
            ? (school.data.affiliation as "Government" | "Religious" | "NGO" | "independent")
            : undefined,
        }}
      /> */}
      <ContactLocationForm schoolId={school.data.id} initialData={school.data}/>
      <FacilitiesOperationsForm initialData={school.data}/>
      {/* <UpdateSchoolPublicInfo lang={lang} initialData={school.data} /> */}
    </div>
  );
};

export default SchoolSettingsPage;
