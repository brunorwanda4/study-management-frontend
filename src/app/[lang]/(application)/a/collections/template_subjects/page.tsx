import CommonEmpty from "@/components/common/common-empty";
import DisplaySwitcher from "@/components/display/display-switcher";
import DialogTemplateSubject from "@/components/page/admin/tempate-subject/dialog-template-subject";
import FilterTemplateSubject from "@/components/page/admin/tempate-subject/filter-template-subject";
import TemplateSubjectCardContents from "@/components/page/admin/tempate-subject/template-subject-card-contents";
import TemplateSubjectTable from "@/components/page/admin/tempate-subject/template-subject-table";
import AppPageHeader from "@/components/page/common/app-page-header";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

async function TemplateSubjectsPage(
  props: PageProps<"/[lang]/a/collections/template_subjects">,
) {
  const params = await props.params;
  const { lang } = params;

  const auth = await authContext();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const templateRes = await apiRequest<
    void,
    Paginated<TemplateSubjectWithOther>
  >("get", "/template-subjects/others?limit=9", undefined, {
    token: auth.token,
    realtime: "user",
  });

  return (
    <RealtimeProvider<TemplateSubjectWithOther>
      channels={[
        {
          name: "template_subject",
          initialData: templateRes?.data?.data ?? [],
        },
      ]}
    >
      <div className=" flex flex-col gap-2">
        <AppPageHeader
          title="Template subjects"
          description="Main subject which is connected to class subjects."
        />
        <FilterTemplateSubject auth={auth} />

        {templateRes.data && templateRes.data?.data.length >= 0 ? (
          <DisplaySwitcher
            table={
              <TemplateSubjectTable
                auth={auth}
                currentSubjects={templateRes.data.data ?? []}
                lang={params.lang as Locale}
              />
            }
            cards={
              <TemplateSubjectCardContents
                cardProps={{
                  lang: lang as Locale,
                  auth: auth,
                  isOnSubjectPage: false,
                }}
                data={templateRes.data.data ?? []}
              />
            }
          />
        ) : (
          <CommonEmpty
            auth={auth}
            icon="/icons/book.png"
            title="Template subjects not found"
            description="They are currently no template subjects found, please create one. If you are an admin, you can create a new template subject."
          >
            <DialogTemplateSubject auth={auth} />
          </CommonEmpty>
        )}
      </div>
    </RealtimeProvider>
  );
}

export default TemplateSubjectsPage;
