import MainClassInformationCard from "@/components/page/admin/main-class/main-class-information-card";
import MainClassSubjectsCard from "@/components/page/admin/main-class/main-class-subjects-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
  const auth = await authUser();
  if (!auth) return { title: "Main Class" };

  const request = await apiRequest<void, MainClassModelWithOthers>(
    "get",
    `/main-classes/username/others/${mainClassUsername}`,
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

const MainClassUsernamePage = async (props: {
  params: Promise<{ mainClassUsername: string }>;
}) => {
  const params = await props.params;
  const { mainClassUsername } = params;
  const auth = await authUser();
  if (!auth) redirect("/auth/login");

  const request = await apiRequest<void, MainClassModelWithOthers>(
    "get",
    `/main-classes/username/others/${mainClassUsername}`,
    undefined,
    { token: auth.token, realtime: "main_class" },
  );

  if (request.statusCode === 404)
    return <NotFoundPage message={request.message} />;

  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  const getMainSubjects = await apiRequest<void, MainSubject[]>(
    "get",
    `/main-subjects/main-class/${request.data.id || request.data._id}`,
    undefined,
    { token: auth.token, realtime: "main_subject" },
  );

  if (!getMainSubjects.data)
    return (
      <ErrorPage
        message={getMainSubjects.message}
        error={getMainSubjects.error}
      />
    );

  return (
    <RealtimeProvider<MainClassModelWithOthers | MainSubject>
      channels={[
        { name: "main_class", initialData: [request.data] },
        { name: "main_subject", initialData: getMainSubjects.data },
      ]}
    >
      <main className="flex flex-col gap-4 lg:flex-row">
        <MainClassInformationCard mainClass={request.data} auth={auth} />
        <div className="w-full">
          <MainClassSubjectsCard
            subjects={getMainSubjects.data}
            MainClass={request.data}
            auth={auth}
          />
        </div>
      </main>
    </RealtimeProvider>
  );
};

export default MainClassUsernamePage;
