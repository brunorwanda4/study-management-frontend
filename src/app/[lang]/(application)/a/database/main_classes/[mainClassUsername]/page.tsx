import MainClassInformationCard from "@/components/page/admin/main-class/main-class-information-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

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
    auth.token,
  );
  if (request.statusCode === 404)
    return <NotFoundPage message={request.message} />;
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div>
      <MainClassInformationCard auth={auth} mainClass={request.data} />
    </div>
  );
};

export default MainClassUsernamePage;
