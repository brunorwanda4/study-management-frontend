import NotFoundPage from "@/components/page/not-found";
import SchoolContacts from "@/components/page/school/school-contacts";
import SchoolHeader from "@/components/page/school/school-header";
import SchoolHomeAbout from "@/components/page/school/school-home-about";
import SchoolImages from "@/components/page/school/school-images";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getSchoolServer } from "@/lib/utils/auth";
import { authUser } from "@/lib/utils/auth-user";
import { getSchoolByIdService } from "@/service/school/school.service";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}

const SchoolIdPage = async (props: props) => {
  const params = await props.params;
  const { lang, schoolId } = params;
  const [currentUser, currentSchool] = await Promise.all([
    authUser(),
    getSchoolServer(),
  ]);
  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  const school = await getSchoolByIdService(schoolId);
  if (!school.data) return <NotFoundPage />;
  return (
    <div className="space-y-4 px-4">
      <SchoolHeader
        currentSchool={currentSchool ?? undefined}
        currentUser={currentUser}
        lang={lang}
      />
      <Separator />
      <div className="flex space-x-4">
        <div className="w-1/2 space-y-2">
          <SchoolHomeAbout school={school.data} isAboutSchool lang={lang} />
          <SchoolImages />
        </div>
        <div className="w-1/2 space-y-2">
          <SchoolContacts school={school.data} />
          {/* <SchoolStaff lang={lang} /> */}
        </div>
      </div>
    </div>
  );
};

export default SchoolIdPage;
