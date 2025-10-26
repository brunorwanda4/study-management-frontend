import JoinSchoolPage from "@/components/page/join-school-page";
import NotFoundPage from "@/components/page/not-found";
import SchoolHeader from "@/components/page/school/school-header";
import SchoolHomeNav from "@/components/page/school/school-home-navbar";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const layout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) return <JoinSchoolPage />;
  const school = await apiRequest<void, School>(
    "get",
    `/schools/${auth.school.id}`,
    undefined,
    { token: auth.token, schoolToken: auth.schoolToken },
  );

  if (!school.data) return <NotFoundPage />;

  return (
    <section>
      <div className="space-y-4 px-4 pb-4">
        <SchoolHeader school={school.data} auth={auth} lang={lang as Locale} />
        <Separator />
        <SchoolHomeNav lang={lang as Locale} />
      </div>
      {children}
    </section>
  );
};

export default layout;
