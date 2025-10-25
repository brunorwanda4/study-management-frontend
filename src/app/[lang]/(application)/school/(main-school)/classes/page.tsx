import SchoolClasses from "@/components/page/school/school-classese";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolClassesPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className="space-x-4 px-4">
      <SchoolClasses
        onThePage
        auth={auth}
        className="grid-cols-2"
        lang={lang}
      />
    </div>
  );
};

export default SchoolClassesPage;
