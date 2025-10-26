import SchoolSettingsNav from "@/components/page/school-staff/school-setting/school-setting-nav";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "School Setting",
  description: "Join School Requests",
};

interface SchoolSettingLayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function SchoolSettingLayout({
  children,
  params,
}: SchoolSettingLayoutProps) {
  const { lang } = await params;
  const currentUser = await authContext();

  if (!currentUser?.user.role) {
    redirect(`/${lang}/auth/login`);
  }

  return (
    <section className="space-y-4 px-4 py-2">
      <SchoolSettingsNav lang={lang as Locale} />
      {children}
    </section>
  );
}
