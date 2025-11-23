import SubjectCard from "@/components/cards/subject-card";
import SubjectDialog from "@/components/page/class/dialog/subject-dialog";
import { Separator } from "@/components/ui/separator";
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

  return (
    <div className=" flex  flex-col">
      <div className=" flex flex-row justify-between w-full mt-2">
        <h3 className=" h3">12 Subjects</h3>
        <SubjectDialog />
      </div>
      <Separator />
      <main className=" space-y-4">
        {[...Array(12).keys()].map((index) => (
          <SubjectCard key={index} />
        ))}
      </main>
    </div>
  );
};

export default ClassSubjectPage;
