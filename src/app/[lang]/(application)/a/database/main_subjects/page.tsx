import SubjectCollectionDetails from "@/components/page/admin/main-subject/main-subject-collection-detas";
import MainSubjectsTableCollection from "@/components/page/admin/main-subject/main-subjects-table-collection";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "main subject collection | space-together",
  description: "All main subject in database",
};

const MainSubjectsPage = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, MainSubject[]>(
    "get",
    "/main-subjects",
    undefined,
    { token: auth.token },
  );
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <RealtimeProvider<MainSubject>
      channels={[{ name: "main_subject", initialData: request.data }]}
    >
      <div className="space-y-8">
        <SubjectCollectionDetails initialSubjects={request.data} />
        <MainSubjectsTableCollection realtimeEnabled auth={auth} />
      </div>
    </RealtimeProvider>
  );
};

export default MainSubjectsPage;
