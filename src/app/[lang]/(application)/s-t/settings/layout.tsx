import SchoolSettingsNav from "@/components/page/school-staff/school-setting/school-setting-nav";
import { Locale } from "@/i18n";
import { authUser } from "@/lib/utils/auth-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "School Setting",
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
  const currentUser = await authUser();
  if (!currentUser?.user.role) return redirect(`/${lang}/auth/login`);
  return (
    <section className="space-y-4 px-4 py-2">
      <SchoolSettingsNav lang={lang} />
      {children}
    </section>
  );
};

export default SchoolSettingLayout;
