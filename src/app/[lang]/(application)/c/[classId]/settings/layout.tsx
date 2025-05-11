import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
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
  const currentUser = await getAuthUserServer();
  if (!currentUser?.role) return redirect(`/${lang}/auth/login`);
  return (
    <section className=" px-4 py-2 space-y-4">
      {children}
    </section>
  );
};

export default ClassSettingLayout;
