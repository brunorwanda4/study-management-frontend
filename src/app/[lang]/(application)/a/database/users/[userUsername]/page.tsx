import UserInformation from "@/components/page/admin/users/user-information-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { UserModel } from "@/lib/types/userModel";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const UserAdminPage = async (props: {
  params: Promise<{ userUsername: string }>;
}) => {
  const params = await props.params;
  const { userUsername } = params;

  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, UserModel>(
    "get",
    `/users/username/${userUsername}`,
    undefined,
    { token: auth.token },
  );
  if (request.statusCode === 404)
    return <NotFoundPage message={request.message} />;
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div>
      <UserInformation auth={auth} user={request.data} />
    </div>
  );
};

export default UserAdminPage;
