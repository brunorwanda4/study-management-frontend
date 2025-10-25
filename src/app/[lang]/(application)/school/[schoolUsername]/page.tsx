import NotFoundPage from "@/components/page/not-found";
import SchoolContacts from "@/components/page/school/school-contacts";
import SchoolHeader from "@/components/page/school/school-header";
import SchoolHomeAbout from "@/components/page/school/school-home-about";
import SchoolImages from "@/components/page/school/school-images";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale; schoolUsername: string }>;
}

const SchoolUsernamePage = async (props: props) => {
  const params = await props.params;
  const { lang, schoolUsername } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const [school] = await Promise.all([
    apiRequest<void, School>(
      "get",
      `/schools/username${schoolUsername}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);
  if (!school.data) return <NotFoundPage />;
  return (
    <div className="space-y-4 px-4">
      <SchoolHeader auth={auth ?? undefined} lang={lang} />
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

export default SchoolUsernamePage;
