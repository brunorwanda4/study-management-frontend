import LoadingClassHeader from "@/components/loadings/class/loading-class-header";
import ClassNavbar from "@/components/page/class/class-navbar";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { getClassById } from "@/service/class/class.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ lang: Locale; classId: string }>;
  children: React.ReactNode;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const { classId } = params;
  const classResponse = await getClassById(classId);

  return {
    title: classResponse.data?.name || "Class not found",
    description: `${classResponse.data?.name}`,
  };
};

const ClassIdLayout = async (props: Props) => {
  const { children } = props;
  const params = await props.params;
  const { lang, classId } = params;
  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <section className="space-y-4 px-4 py-2">
      <Suspense fallback={<LoadingClassHeader />}>
        {/* <ClassHeader
          lang={lang}
          currentSchool={currentSchool ?? undefined}
          currentUser={currentUser}
          currentCls={currentCls.data}
        /> */}
      </Suspense>

      <Separator />
      <ClassNavbar lang={lang} classId={classId} />
      {children}
    </section>
  );
};

export default ClassIdLayout;
