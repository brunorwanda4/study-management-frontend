import SchoolContacts from "@/components/page/school/school-contacts";
import SchoolHeader from "@/components/page/school/school-header";
import SchoolHomeAbout from "@/components/page/school/school-home-about";
import SchoolImages from "@/components/page/school/school-images";
import SchoolStaff from "@/components/page/school/school-staff";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolIdPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = await getAuthUserServer();
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className=" px-4 space-y-4">
      <SchoolHeader lang={lang} />
      <Separator />
      <div className=" flex space-x-4 ">
        <div className=" w-1/2  space-y-2">
          <SchoolHomeAbout isAboutSchool lang={lang} />
          <SchoolImages />
        </div>
        <div className=" w-1/2 space-y-2">
          <SchoolContacts />
          <SchoolStaff lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default SchoolIdPage;
