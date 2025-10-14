import DevelopingPage from "@/components/page/developing-page";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";
interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassesActivesPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser] = await Promise.all([authContext()]);

  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    return redirect(`/${lang}/auth/onboarding`);
  }
  return <DevelopingPage lang={lang} role={currentUser.role} />;
};

export default ClassesActivesPage;
