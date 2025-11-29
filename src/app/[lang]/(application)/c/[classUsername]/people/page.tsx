import ClassPeopleContent from "@/components/page/class/people/class-people-content";
import NotFoundPage from "@/components/page/not-found";
import { Separator } from "@/components/ui/separator";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Student } from "@/lib/schema/school/student-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const ClassIdPeoplePage = async (
  props: PageProps<"/[lang]/c/[classUsername]/people">,
) => {
  const params = await props.params;
  const { lang, classUsername } = params;
  const [auth] = await Promise.all([authContext()]);

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

  const [studentsRes, teachersRes] = await Promise.all([
    apiRequest<void, Student[]>(
      "get",
      `/school/students/class/${clsRes.data._id || clsRes.data.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
    apiRequest<void, Teacher[]>(
      "get",
      `/school/teachers/class/${clsRes.data._id || clsRes.data.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  const total =
    (studentsRes.data?.length ?? 0) + (teachersRes.data?.length ?? 0);

  return (
    <RealtimeProvider<Student | Teacher>
      channels={[
        {
          name: "teacher",
          initialData: teachersRes.data ?? [],
        },
        {
          name: "student",
          initialData: studentsRes.data ?? [],
        },
      ]}
    >
      <div className="flex flex-col w-full space-y-4">
        <div className=" flex flex-col gap-2 w-full mt-2">
          <h3 className=" h3">{total} People</h3>
          <Separator />
        </div>
        <ClassPeopleContent
          students={studentsRes.data ?? []}
          teachers={teachersRes.data ?? []}
        />
      </div>
    </RealtimeProvider>
  );
};

export default ClassIdPeoplePage;
