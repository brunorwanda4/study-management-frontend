import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "School Setting",
  description: "Join School Requests",
};
interface props {
  params: Promise<{ lang: Locale; classId: string }>;
  children: React.ReactNode;
}

const ClassSettingLayout = async (props: props) => {
  const { children } = props;
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) return redirect(`/${lang}/auth/login`);
  return <section className="space-y-4 px-4 py-2">{children}</section>;
};

export default ClassSettingLayout;
