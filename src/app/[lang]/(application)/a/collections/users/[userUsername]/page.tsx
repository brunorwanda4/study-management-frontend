import UserInformation from "@/components/page/admin/users/user-information-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userUsername: string }>;
}): Promise<Metadata> {
  const { userUsername } = await params;
  const auth = await authContext();
  if (!auth) return { title: "Main Class" };

  const request = await apiRequest<void, UserModel>(
    "get",
    `/users/username/${userUsername}`,
    undefined,
    { token: auth.token },
  );

  if (!request.data) return { title: "user not found | Space-Together" };

  const nameOrUsername = request.data.name || request.data.username || "User";

  return {
    title: `${nameOrUsername} | Main Class`,
    description: `${request.data.bio}, Details for user ${nameOrUsername}`,
  };
}

const UserAdminPage = async (props: {
  params: Promise<{ userUsername: string }>;
}) => {
  const params = await props.params;
  const { userUsername } = params;

  const auth = await authContext();
  if (!auth) redirect("/auth/login");
  const userRes = await apiRequest<void, UserModel>(
    "get",
    `/users/username/${userUsername}`,
    undefined,
    { token: auth.token, realtime: "user" },
  );
  if (userRes.statusCode === 404)
    return <NotFoundPage message={userRes.message} />;
  if (!userRes.data)
    return <ErrorPage message={userRes.message} error={userRes.error} />;

  return (
    <RealtimeProvider<UserModel>
      channels={[{ name: "user", initialData: [userRes.data] }]}
    >
      <main>
        <UserInformation auth={auth} initialUser={userRes.data} />
      </main>
    </RealtimeProvider>
  );
};

export default UserAdminPage;
