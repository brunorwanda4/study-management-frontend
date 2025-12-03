import FilterTemplateSubject from "@/components/page/admin/tempate-subject/filter-template-subject";
import AppPageHeader from "@/components/page/common/app-page-header";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Paginated } from "@/lib/schema/common-schema";
import type { TemplateSubject } from "@/lib/schema/subject/template-schema";
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

  const templateRes = await apiRequest<void, Paginated<TemplateSubject>>(
    "get",
    "/template-subjects?limit=9",
    undefined,
    {
      token: auth.token,
      realtime: "user",
    },
  );

  return (
    <RealtimeProvider<TemplateSubject>
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
        <div>Bruno Rwanda</div>
      </div>
    </RealtimeProvider>
  );
}

export default TemplateSubjectsPage;
