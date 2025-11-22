import AddAnnouncementDialog from "@/components/common/dialog/add-announcement-dialog";
import ClassHero from "@/components/page/class/class-hero";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classUsername: string }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  return {
    title: "Class not found",
    description: `classUsername`,
  };
};

const ClassUsernamePage = async (props: Props) => {
  const params = await props.params;
  const { lang, classUsername } = params;

  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <div className=" w-full">
      <ClassHero />
      <Separator />
      <main className=" flex gap-4 w-full">
        <div className=" w-2/3">
          <AddAnnouncementDialog />
        </div>
        <div className=" w-1/3">time table here</div>
      </main>
      <div className=" h-screen " />
    </div>
  );
};

export default ClassUsernamePage;
