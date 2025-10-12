import EditUserForm from "@/components/page/admin/users/edit-user-form";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserModel } from "@/lib/schema/user/user-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const EditUserPage = async (props: {
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
      <Card>
        <CardHeader>
          <CardTitle>Edit user</CardTitle>
        </CardHeader>
        <CardContent>
          <EditUserForm user={request.data} auth={auth} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserPage;
