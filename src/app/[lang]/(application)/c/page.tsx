import DevelopingPage from "@/components/page/developing-page";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "School Join Requests",
  description: "Join School Requests",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}

const ClassPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) return redirect(`/${lang}/auth/login`);
  return <DevelopingPage role={auth.user.role} lang={lang} />;
};

export default ClassPage;
