import UserCollectionDetails from "@/components/page/admin/users/user-collection-details";
import UsersTableCollection from "@/components/page/admin/users/usersTableCollection";
import ErrorPage from "@/components/page/error-page";
import { UserStats } from "@/lib/types/User-stats";
import { UserModel } from "@/lib/types/userModel";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const UserPageCollection = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");

  // Run requests in parallel
  const [usersRequest, statsRequest] = await Promise.all([
    apiRequest<void, UserModel[]>(
      "get",
      "/users?limit=10",
      undefined,
      auth.token,
    ),
    apiRequest<void, UserStats>("get", "/users/stats", undefined, auth.token),
  ]);

  if (!usersRequest.data || !statsRequest.data) {
    return (
      <ErrorPage
        message={usersRequest.message || statsRequest.message}
        error={usersRequest.error || statsRequest.error}
      />
    );
  }

  return (
    <div className="happy-page space-y-4">
      <UserCollectionDetails stats={statsRequest.data} />
      <UsersTableCollection users={usersRequest.data} token={auth.token} />
    </div>
  );
};

export default UserPageCollection;
