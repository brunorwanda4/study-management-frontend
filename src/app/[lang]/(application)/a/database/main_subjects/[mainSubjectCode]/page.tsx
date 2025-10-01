import MainSubjectInformationCard from "@/components/page/admin/main-subject/MainSubjectInformationCard";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const MainSubjectCodePage = async (props: {
  params: Promise<{ mainSubjectCode: string }>;
}) => {
  const params = await props.params;
  const { mainSubjectCode } = params;
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, MainSubject>(
    "get",
    `/main-subjects/code/${mainSubjectCode}`,
    undefined,
    { token: auth.token },
  );
  if (request.statusCode === 404)
    return <NotFoundPage message={request.message} />;
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div>
      <MainSubjectInformationCard auth={auth} subject={request.data} />
    </div>
  );
};

export default MainSubjectCodePage;
