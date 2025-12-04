import SubjectCard from "@/components/cards/subject-card";
import SubjectDialog from "@/components/page/class/dialog/subject-dialog";
import { Separator } from "@/components/ui/separator";

const ClassSettingsSubjectsPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings/subjects">,
) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" w-full flex flex-col gap-4">
      <div>
        <h3 className=" h3">Subjects Settings</h3>
        <p className=" text-base-content/50">
          Controls how subjects work inside the class
        </p>
        <Separator />
      </div>
      <div className=" flex  flex-col">
        <div className=" flex flex-row justify-between w-full mt-2">
          <h3 className=" h3">12 Subjects</h3>
          <SubjectDialog />
        </div>
        <Separator />
        <main className=" grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[...Array(9).keys()].map((_, i) => (
            <SubjectCard auth={auth} lang={lang as Locale} showModify key={i} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default ClassSettingsSubjectsPage;
