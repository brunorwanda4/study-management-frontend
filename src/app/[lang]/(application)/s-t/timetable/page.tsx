import DevelopingPage from "@/components/page/developing-page";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const TimeTablePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  return <DevelopingPage lang={lang} role={auth.user.role} />;
};

export default TimeTablePage;
