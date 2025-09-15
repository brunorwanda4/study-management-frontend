import JoinSchoolPage from "@/components/page/join-school-page";
import NotFoundPage from "@/components/page/not-found";
import SchoolHeader from "@/components/page/school/school-header";
import SchoolHomeNav from "@/components/page/school/school-home-navbar";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getSchoolServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const layout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const [currentUser, currentSchool] = await Promise.all([
    await authUser(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentSchool) return <JoinSchoolPage />;
  const school = await getSchoolByIdService(currentSchool.schoolId);
  if (!school.data) return <NotFoundPage />;

  return (
    <section>
      <div className=" px-4 space-y-4 pb-4">
        <SchoolHeader
          school={school.data}
          currentSchool={currentSchool}
          currentUser={currentUser}
          lang={lang}
        />
        <Separator />
        <SchoolHomeNav lang={lang} />
      </div>
      {children}
    </section>
  );
};

export default layout;
