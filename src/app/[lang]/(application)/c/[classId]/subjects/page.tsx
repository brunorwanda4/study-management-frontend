import SubjectCard from "@/components/cards/subject-card";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
}
const ClassSubjectPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser] = await Promise.all([getAuthUserServer()]);

  if (!currentUser) {
    return redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    return redirect(`/${lang}/auth/onboarding`);
  }

  return (
    <div className=" grid grid-cols-3 gap-4">
      {[...Array(12)].map((_, i) => (
        <SubjectCard key={i} lang={lang} />
      ))}
    </div>
  );
};

export default ClassSubjectPage;
