import SubjectCard from "@/components/cards/subject-card";
import ClassWorkCard from "@/components/common/cards/class-work-card";
import NoteCard from "@/components/common/cards/note-card";
import MyLink from "@/components/common/myLink";
import ErrorPage from "@/components/page/error-page";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import type { ClassSubjectWithRelations } from "@/lib/schema/subject/class-subject-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const SubjectIdClassPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/subjects/[subjectCode]">,
) => {
  const params = await props.params;
  const { lang, subjectCode } = params;
  const [auth] = await Promise.all([authContext()]);

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  const [subjectRes] = await Promise.all([
    apiRequest<void, ClassSubjectWithRelations>(
      "get",
      `/school/class-subjects/code/${subjectCode}/others`,
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
      },
    ),
  ]);

  if (!subjectRes.data)
    return <ErrorPage message={subjectRes.message} error={subjectRes.error} />;

  return (
    <div className=" flex gap-4 mt-2">
      <main className=" w-3/5 space-y-2 ">
        <SubjectCard
          subject={subjectRes.data}
          auth={auth}
          lang={lang as Locale}
          isOnSubjectPage
        />
        <div className=" flex flex-col mt-4">
          <div className=" flex flex-row justify-between w-full items-center">
            <h3 className="h5">Classwork</h3>
            <div className=" flex flex-row gap-2">
              <MyLink
                href=""
                button={{
                  role: "create",
                  size: "sm",
                  variant: "primary",
                  library: "daisy",
                }}
              >
                New class work
              </MyLink>
            </div>
          </div>
          <Separator />
          {/*all classwork*/}
          <div className=" flex flex-col gap-2 mt-2">
            {[...Array(3)].map((_, t) => {
              return <ClassWorkCard key={t} />;
            })}
          </div>
          <MyLink
            href=""
            button={{ variant: "ghost", library: "daisy", role: "page" }}
            className=" flex w-full justify-center items-center mt-2"
            classname=" w-full"
          >
            View all classwork
          </MyLink>
        </div>
      </main>
      {/*left*/}
      <div className=" w-2/5">
        <div className=" flex flex-row justify-between w-full items-center">
          <h3 className="h5">Notes</h3>
          <div className=" flex flex-row gap-2">
            <MyLink
              href=""
              button={{
                role: "create",
                size: "sm",
                variant: "primary",
                library: "daisy",
              }}
            >
              New note
            </MyLink>
          </div>
        </div>
        <Separator />
        <div className=" flex flex-col gap-2 mt-2">
          {[...Array(3)].map((_, index) => (
            <NoteCard key={index} />
          ))}
          <MyLink
            href=""
            button={{ variant: "ghost", library: "daisy", role: "page" }}
            className=" flex w-full justify-center items-center mt-2"
            classname=" w-full"
          >
            View all notes
          </MyLink>
        </div>
      </div>
    </div>
  );
};

export default SubjectIdClassPage;
