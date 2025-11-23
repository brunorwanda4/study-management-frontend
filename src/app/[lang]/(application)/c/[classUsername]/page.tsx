import AnnouncementCard from "@/components/common/cards/announcement-card";
import NoteCard from "@/components/common/cards/note-card";
import AddAnnouncementDialog from "@/components/common/dialog/add-announcement-dialog";
import ClassHero from "@/components/page/class/class-hero";
import TeacherSubjectCard from "@/components/page/class/teacher-sujects-card";
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
      <Separator className=" mt-4 mb-4" />
      <main className=" flex gap-4 w-full">
        <div className=" w-2/3 flex flex-col gap-4">
          <AddAnnouncementDialog />
          <TeacherSubjectCard />
          <AnnouncementCard />
          <NoteCard />
        </div>
        <div className=" w-1/3">time table here</div>
      </main>
      <div className=" h-screen " />
    </div>
  );
};

export default ClassUsernamePage;
