import TemplateSubjectCard from "@/components/page/admin/tempate-subject/template-subject-card";
import ErrorPage from "@/components/page/error-page";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const TemplateSubjectPage = async (
  props: PageProps<"/[lang]/a/collections/template_subjects/[subjectCode]">,
) => {
  const params = await props.params;
  const { lang, subjectCode } = params;
  const auth = await authContext();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const subjectRes = await apiRequest<void, TemplateSubjectWithOther>(
    "get",
    `/template-subjects/code/${subjectCode}/others`,
    undefined,
    {
      token: auth.token,
      realtime: "template_subject",
    },
  );

  if (!subjectRes.data)
    return <ErrorPage message={subjectRes.message} error={subjectRes.error} />;

  return (
    <RealtimeProvider<TemplateSubjectWithOther>
      channel="template_subject"
      initialData={[subjectRes.data]}
    >
      <div className=" flex gap-4 mt-2">
        <main className=" w-3/5 space-y-2 ">
          <TemplateSubjectCard
            lang={lang as Locale}
            templateSubject={subjectRes.data}
            isOnSubjectPage
            auth={auth}
          />
        </main>
      </div>
    </RealtimeProvider>
  );
};

export default TemplateSubjectPage;
