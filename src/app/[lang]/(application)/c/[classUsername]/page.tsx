import AnnouncementCard from "@/components/common/cards/announcement-card";
import ClassWorkCard from "@/components/common/cards/class-work-card";
import NoteCard from "@/components/common/cards/note-card";
import AddAnnouncementDialog from "@/components/common/dialog/add-announcement-dialog";
import ClassHero from "@/components/page/class/class-hero";
import SmallClassTimeTable from "@/components/page/class/small-class-time-table-card";
import TeacherSubjectsCard from "@/components/page/class/teacher-subjects-card";
import NotFoundPage from "@/components/page/not-found";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (
  props: PageProps<"/[lang]/c/[classUsername]">,
): Promise<Metadata> => {
  const params = await props.params;

  return {
    title: "Class not found",
    description: `classUsername`,
  };
};

const ClassUsernamePage = async (
  props: PageProps<"/[lang]/c/[classUsername]">,
) => {
  const params = await props.params;
  const { lang, classUsername } = params;

  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const [clsRes] = await Promise.all([
    apiRequest<void, Class>(
      "get",
      `/school/classes/username/${classUsername}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  if (!clsRes.data) return <NotFoundPage message="Class not found" />;

  const [
    totalStudentsRes,
    totalTeachersRes,
    totalSubjectsRes,
    classTeacherRes,
  ] = await Promise.all([
    apiRequest<void, { count: number }>(
      "get",
      `/school/students/stats/count-by-class/${clsRes.data._id || clsRes.data.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    apiRequest<void, { count: number }>(
      "get",
      `/school/teachers/stats/count-by-class/${clsRes.data._id || clsRes.data.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    apiRequest<void, { count: number }>(
      "get",
      `/school/subjects/stats/count-by-class/${clsRes.data._id || clsRes.data.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    apiRequest<void, Teacher>(
      "get",
      `/school/teachers/${clsRes.data.class_teacher_id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);
  return (
    <div className=" w-full">
      <ClassHero
        totalSubjects={totalSubjectsRes.data?.count ?? 0}
        totalStudents={totalStudentsRes.data?.count ?? 0}
        totalTeachers={totalTeachersRes.data?.count ?? 0}
        lang={lang as Locale}
        cls={clsRes.data}
        classTeacher={classTeacherRes.data}
      />
      <Separator className=" mt-4 mb-4" />
      <main className=" flex gap-4 w-full">
        <div className=" w-2/3 flex flex-col gap-4">
          <AddAnnouncementDialog auth={auth} />
          <TeacherSubjectsCard />
          <AnnouncementCard />
          <NoteCard />
          <ClassWorkCard />
        </div>
        <div className=" w-1/3">
          <SmallClassTimeTable />
        </div>
      </main>
    </div>
  );
};

export default ClassUsernamePage;
