import DevelopingPage from "@/components/page/developing-page";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "School Join Requests",
  description: "Join School Requests",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}
const JoinSchoolRequestPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = await getAuthUserServer();
  if (!currentUser?.role) return redirect(`/${lang}/auth/login`);
  return <DevelopingPage role={currentUser.role} lang={lang} />;
};

export default JoinSchoolRequestPage;
