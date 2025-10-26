import SchoolHomePosts from "@/components/page/school/school-home-posts";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPostsPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = await authContext();
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className="flex space-x-4 px-4">
      <SchoolHomePosts className="grid-cols-2" isOnSchoolPost lang={lang} />
      <div className="h-screen" />
    </div>
  );
};

export default SchoolPostsPage;
