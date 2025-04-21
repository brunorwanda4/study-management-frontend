import SchoolContacts from "@/components/page/school/school-contacts";
import SchoolHomeAbout from "@/components/page/school/school-home-about";
import SchoolImages from "@/components/page/school/school-images";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
 interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolAboutPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = await getAuthUserServer()
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" min-h-screen px-4 space-x-4 flex ">
      <div className=" w-1/2 space-y-4">
        <SchoolHomeAbout isAboutSchool lang={lang} />
      </div>
      <div className=" w-1/2 space-y-4">
        <SchoolContacts />
        <SchoolImages />
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default SchoolAboutPage;
