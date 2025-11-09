// import { Metadata } from "next";
import DevelopingPage from "@/components/page/developing-page";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const metadata = async (): Promise<Metadata> => {
  const auth = await authContext();
  return {
    title: auth?.school?.name
      ? `School Staff in ${auth?.school?.name}`
      : "School not found",
    description: auth?.school?.name
      ? `Staff in ${auth?.school?.name}`
      : "school not found",
  };
};
const SchoolStaffStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  if (!auth.school)
    return <NotFoundPage message="You need to have school to view this page" />;


    return <DevelopingPage lang={lang} role={auth.user.role} />;

};
export default SchoolStaffStaffPage;
