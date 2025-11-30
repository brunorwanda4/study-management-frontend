import SubjectCard from "@/components/cards/subject-card";
import SubjectDialog from "@/components/page/class/dialog/subject-dialog";
import NotFoundPage from "@/components/page/not-found";
import { Separator } from "@/components/ui/separator";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Subject } from "@/lib/schema/subject/subject-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const ClassSubjectPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/subjects">,
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

  const [subjectsRes] = await Promise.all([
    apiRequest<void, Subject[]>(
      "get",
      `/school/subjects/class/${clsRes.data._id || clsRes.data.id}`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  return (
    <div className=" flex  flex-col">
      <div className=" flex flex-row justify-between w-full mt-2">
        <h3 className=" h3">
          {subjectsRes.data ? subjectsRes.data.length : 0} Subjects
        </h3>
        <SubjectDialog />
      </div>
      <Separator />
      {subjectsRes.data && (
        <main className=" grid grid-cols-1 gap-4 lg:grid-cols-2">
          {subjectsRes.data.map((subject) => (
            <SubjectCard key={subject._id || subject.id} subject={subject} />
          ))}
        </main>
      )}
    </div>
  );
};

export default ClassSubjectPage;
