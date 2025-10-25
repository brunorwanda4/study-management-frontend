import SubjectCollectionDetails from "@/components/page/admin/main-subject/main-subject-collection-detas";
import MainSubjectsTableCollection from "@/components/page/admin/main-subject/main-subjects-table-collection";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "main subject collection | space-together",
  description: "All main subject in database",
};

const MainSubjectsPage = async () => {
  const auth = await authContext();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, MainSubject[]>(
    "get",
    "/main-subjects?limit=10",
    undefined,
    { token: auth.token, realtime: "main_subject" },
  );
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <RealtimeProvider<MainSubject>
      channels={[{ name: "main_subject", initialData: request.data }]}
    >
      <div className="space-y-8">
        <SubjectCollectionDetails initialSubjects={request.data} />
        <MainSubjectsTableCollection
          currentSubjects={request.data}
          realtimeEnabled
          auth={auth}
          serverMode
        />
      </div>
    </RealtimeProvider>
  );
};

export default MainSubjectsPage;
