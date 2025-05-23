import JoinSchoolPage from "@/components/page/join-school-page";
import NotFoundPage from "@/components/page/not-found";
import SchoolContacts from "@/components/page/school/school-contacts";
import SchoolHomeAbout from "@/components/page/school/school-home-about";
import SchoolImages from "@/components/page/school/school-images";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { redirect } from "next/navigation";
 interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolAboutPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
 const [currentUser, currentSchool] = await Promise.all([
     getAuthUserServer(),
     getSchoolServer(),
   ]);
  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
    if (!currentSchool) return <JoinSchoolPage />;
  
    const school = await getSchoolByIdService(currentSchool.schoolId);
    if (!school.data) return <NotFoundPage />;
  return (
    <div className=" min-h-screen px-4 space-x-4 flex ">
      <div className=" w-1/2 space-y-4">
        <SchoolHomeAbout school={school.data} isAboutSchool lang={lang} />
      </div>
      <div className=" w-1/2 space-y-4">
        <SchoolContacts school={school.data}/>
        <SchoolImages />
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default SchoolAboutPage;
