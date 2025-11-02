import NotFoundPage from "@/components/page/not-found";
import { BasicInformationForm } from "@/components/page/school-staff/school-setting/forms/basic-information";
import { ContactLocationForm } from "@/components/page/school-staff/school-setting/forms/contact-location";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
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
  const auth = await authContext();
  if (!auth) return redirect(`/${lang}/auth/login`);
  if (!auth.school)
    return (
      <NotFoundPage message="You need to have school to access this page" />
    );

  const [school] = await Promise.all([
    apiRequest<void, School>("get", `/schools/${auth.school.id}`, undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
    }),
  ]);

  if (!school.data) return <NotFoundPage message={auth.school.id} />;

  return (
    <div className="space-y-4">
      <h2 className="title-page">School Public Information</h2>
      <BasicInformationForm auth={auth} initialData={school.data} />
      <ContactLocationForm auth={auth} initialData={school.data} />
    </div>
  );
};

export default SchoolSettingsPage;
