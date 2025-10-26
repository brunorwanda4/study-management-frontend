import DevelopingPage from "@/components/page/developing-page";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const SchoolSettingEducationSettingsPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return <DevelopingPage lang={lang} role={auth.user.role} />;
};

export default SchoolSettingEducationSettingsPage;
