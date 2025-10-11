import AdminUserData from "@/components/page/admin/dashboard/admin-user-data";
import DatabaseData from "@/components/page/admin/dashboard/database-data";
import MainCollectionsCard from "@/components/page/admin/dashboard/main-collections-card";
import UsersCollectionTableDashboard from "@/components/page/admin/users/users-collection-table-dashboard";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { DatabaseStats } from "@/lib/types/databaseStatus";
import { UserModel } from "@/lib/types/userModel";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin dashboard | space-together",
  description: "Admin dashboard management application space-together",
};
const AdminDashboardPage = async () => {
  const auth = await authUser();
  if (!auth?.user) redirect("/auth/login");
  const [usersResponse, dbStatusRes] = await Promise.all([
    apiRequest<void, UserModel[]>("get", "/users?limit=5", undefined, {
      token: auth.token,
      realtime: "user",
    }),
    apiRequest<void, DatabaseStats>("get", "/database/status", undefined, {
      token: auth.token,
    }),
  ]);

  if (!usersResponse.data || !dbStatusRes.data) {
    return (
      <ErrorPage
        message={usersResponse.message || dbStatusRes.message}
        error={usersResponse.error || dbStatusRes.error}
      />
    );
  }
  return (
    <RealtimeProvider<UserModel>
      channels={[{ name: "user", initialData: usersResponse.data }]}
    >
      <div className="space-y-4">
        <AdminUserData auth={auth} />
        <DatabaseData />
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="lg:w-1/2">
            <MainCollectionsCard collections={dbStatusRes.data.collections} />
          </div>
          <div className="lg:w-1/2">
            <UsersCollectionTableDashboard
              initialUsers={usersResponse.data}
              realtimeEnabled
            />
          </div>
        </div>
      </div>
    </RealtimeProvider>
  );
};

export default AdminDashboardPage;
