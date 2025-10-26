import SubjectCard from "@/components/cards/subject-card";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassSubjectPage = async (props: Props) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [auth] = await Promise.all([authContext()]);

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const classModules = { data: [] };
  if (!classModules.data) return <NotFoundPage />;
  return (
    <div className="grid grid-cols-3 gap-4">
      {classModules.data.map((item, i) => {
        return <SubjectCard key={i} module={item} lang={lang} />;
      })}
    </div>
  );
};

export default ClassSubjectPage;
