import UserCollectionDetails from "@/components/page/admin/users/user-collection-details";
import ErrorPage from "@/components/page/error-page";
import { UserModel } from "@/lib/types/userModel";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const UserPageCollection = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");

  const request = await apiRequest<void, UserModel>(
    "get",
    "/users",
    undefined,
    auth.token,
  );

  if (!request.data) {
    return <ErrorPage message={request.message} />;
  }

  return (
    <div>
      <div className="flex min-h-48 justify-between gap-4">
        <UserCollectionDetails users={request.data} />
      </div>
      {/* <UsersTableCollection
        collectionName={collectionName}
        usersRole={userRoles}
        users={data}
      /> */}
    </div>
  );
};
export default UserPageCollection;
