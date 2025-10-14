import UserCollectionDetails from "@/components/page/admin/users/user-collection-details";
import UsersTableCollection from "@/components/page/admin/users/usersTableCollection";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { UserModel } from "@/lib/schema/user/user-schema";
import { UserStats } from "@/lib/types/User-stats";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Users - collection",
  description: "All users in database",
};

const UserPageCollection = async () => {
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  // Run requests in parallel
  const [usersRequest, statsRequest] = await Promise.all([
    apiRequest<void, UserModel[]>("get", "/users?limit=10", undefined, {
      token: auth.token,
      realtime: "user",
    }),
    apiRequest<void, UserStats>("get", "/users/stats", undefined, {
      token: auth.token,
      realtime: "user",
    }),
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
    <RealtimeProvider<UserModel>
      channels={[{ name: "user", initialData: usersRequest.data }]}
    >
      <div className="happy-page space-y-4">
        <UserCollectionDetails stats={statsRequest.data} />
        <UsersTableCollection auth={auth} users={usersRequest.data} />
      </div>
    </RealtimeProvider>
  );
};

export default UserPageCollection;
