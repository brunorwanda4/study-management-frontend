import MainClassInformationCard from "@/components/page/admin/main-class/main-class-information-card";
import DialogTemplateSubject from "@/components/page/admin/tempate-subject/dialog-template-subject";
import TemplateSubjectCardContents from "@/components/page/admin/tempate-subject/template-subject-card-contents";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type {
  MainClassModel,
  MainClassModelWithOthers,
} from "@/lib/schema/admin/main-classes-schema";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Activity } from "react";
/**
 * ✅ Dynamic metadata: runs on server before rendering.
 * It fetches the main class and uses its name/username in the <title>.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ mainClassUsername: string }>;
}): Promise<Metadata> {
  const { mainClassUsername } = await params;
  const auth = await authContext();
  if (!auth) return { title: "Main Class" };

  const request = await apiRequest<void, MainClassModelWithOthers>(
    "get",
    `/main-classes/username/${mainClassUsername}`,
    undefined,
    { token: auth.token },
  );

  if (!request.data) return { title: "Main Class Not Found | Space-Together" };

  const nameOrUsername =
    request.data.name || request.data.username || "Main Class";

  return {
    title: `${nameOrUsername} | Main Class`,
    description: `${request.data.description}, Details for main class ${nameOrUsername}`,
  };
}

const MainClassUsernamePage = async (
  props: PageProps<"/[lang]/a/collections/main_classes/[mainClassUsername]">,
) => {
  const params = await props.params;
  const { mainClassUsername, lang } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  const request = await apiRequest<void, MainClassModel>(
    "get",
    `/main-classes/username/${mainClassUsername}`,
    undefined,
    { token: auth.token, realtime: "main_class" },
  );

  if (request.statusCode === 404)
    return <NotFoundPage message={request.message} />;

  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  const subjectRes = await apiRequest<void, TemplateSubjectWithOther[]>(
    "get",
    `/template-subjects/prerequisite/${request.data._id}/others`,
    undefined,
    {
      token: auth.token,
      realtime: "template_subject",
    },
  );

  return (
    <RealtimeProvider<MainClassModel | TemplateSubjectWithOther>
      channels={[
        { name: "main_class", initialData: [request.data] },
        { name: "template_subject", initialData: subjectRes.data ?? [] },
      ]}
    >
      <main className="flex flex-col gap-4 lg:flex-row">
        <MainClassInformationCard mainClass={request.data} auth={auth} />
        <Activity>
          <div className="w-full flex flex-col gap-4">
            <div className=" flex justify-between items-center">
              <h4 className=" h5">All templates subjects</h4>
              <DialogTemplateSubject mainClass={request.data} auth={auth} />
            </div>
            <TemplateSubjectCardContents
              cardProps={{
                lang: lang as Locale,
                auth: auth,
                isOnSubjectPage: false,
              }}
              data={subjectRes.data ?? []}
              className="flex flex-col gap-4"
            />
          </div>
        </Activity>
      </main>
    </RealtimeProvider>
  );
};

export default MainClassUsernamePage;
