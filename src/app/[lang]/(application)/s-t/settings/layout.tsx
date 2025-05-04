import SchoolSettingsNav from "@/components/page/school-staff/school-setting/school-setting-nav";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "School setting",
  description: "Join School Requests",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
  children: React.ReactNode;
}

const SchoolSettingLayout = async (props: props) => {
  const { children } = props;
  const params = await props.params;
  const { lang } = params;
  const currentUser = await getAuthUserServer();
  if (!currentUser?.role) return redirect(`/${lang}/auth/login`);
  return (
    <section className=" px-4 py-2 space-y-4">
      <SchoolSettingsNav lang={lang} />
      {children}
    </section>
  );
};

export default SchoolSettingLayout;
