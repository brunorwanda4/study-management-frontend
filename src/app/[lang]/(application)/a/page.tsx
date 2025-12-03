import AdminUserData from "@/components/page/admin/dashboard/admin-user-data";
import DatabaseData from "@/components/page/admin/dashboard/database-data";
import MainCollectionsCard from "@/components/page/admin/dashboard/main-collections-card";
import UsersCollectionTableDashboard from "@/components/page/admin/users/users-collection-table-dashboard";
import ErrorPage from "@/components/page/error-page";
import PermissionPage from "@/components/page/permission-page";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { PaginatedUsers } from "@/lib/schema/relations-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { DatabaseStats } from "@/lib/types/databaseStatus";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin dashboard | space-together",
  description: "Admin dashboard management application space-together",
};
interface props {
  params: Promise<{ lang: Locale }>;
}

const AdminDashboardPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth?.user) redirect("/auth/login");
  if (auth.user.role !== "ADMIN") {
    return <PermissionPage lang={lang} role={auth.user.role} />;
  }
  const [usersResponse, dbStatusRes] = await Promise.all([
    apiRequest<void, PaginatedUsers[]>("get", "/users?limit=5", undefined, {
      token: auth.token,
    }),
    apiRequest<void, DatabaseStats>("get", "/database/status", undefined, {
      token: auth.token,
    }),
  ]);

  if (!dbStatusRes.data) {
    return (
      <ErrorPage
        message={usersResponse.message || dbStatusRes.message}
        error={usersResponse.error || dbStatusRes.error}
      />
    );
  }
  return (
    <RealtimeProvider<UserModel>
      channels={[
        { name: "user", initialData: usersResponse?.data?.users ?? [] },
      ]}
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
              initialUsers={usersResponse?.data?.users}
              realtimeEnabled
            />
          </div>
        </div>
      </div>
    </RealtimeProvider>
  );
};

export default AdminDashboardPage;
