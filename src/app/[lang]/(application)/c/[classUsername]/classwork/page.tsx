import ClassWorkCard from "@/components/common/cards/class-work-card";
import ClassworkPageFilter from "@/components/page/class/classwork/classwork-page-filter";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface ClassWorkPageProps {
  params: Promise<{ lang: Locale; classId: string }>;
}

const ClassWorkPage = async (props: ClassWorkPageProps) => {
  const params = await props.params;
  const { lang, classId } = params;
  const [auth] = await Promise.all([authContext()]);

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div>
      <div className=" flex flex-col gap-2 w-full mt-2">
        <h3 className=" h3">32 Classwork</h3>
        <ClassworkPageFilter auth={auth} />
      </div>
      <Separator />
      <main className=" grid grid-cols-2 gap-2">
        {[...Array(9)].map((_, i) => {
          return <ClassWorkCard key={i} />;
        })}
      </main>
    </div>
  );
};

export default ClassWorkPage;
