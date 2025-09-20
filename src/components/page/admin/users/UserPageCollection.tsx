import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/components/page/admin/static/collectionPageStatic";
import { FetchError } from "@/lib/types/fetchErr";
import { UserModel, UserRoleModel } from "@/lib/types/userModel";
import { fetchUserRole } from "@/service/admin/fetchDataFn";
import { ApiClient } from "@/service/admin/fetchingAPIClient";
import CollectionUserRole from "./collectionUserRole";
import UserCollectionDetails from "./user-collection-details";
import UsersTableCollection from "./usersTableCollection";

const apiClient = new ApiClient();

interface props {
  collectionName: string;
}

const UserPageCollection = async ({ collectionName }: props) => {
  const data: UserModel[] | FetchError = await apiClient.allData<UserModel[]>(
    "users",
    "users",
  );

  const userRoles: UserRoleModel[] | FetchError = await fetchUserRole();

  if (Array.isArray(data)) {
    return (
      <CollectionPageStatic
        className="overflow-x-hidden"
        collection={collectionName}
      >
        <div className="flex min-h-48 justify-between gap-4">
          <UserCollectionDetails
            totalUserRole={Array.isArray(userRoles) && userRoles.length}
            totalUser={data.length}
          />
          {Array.isArray(userRoles) && <CollectionUserRole roles={userRoles} />}
        </div>
        <UsersTableCollection
          collectionName={collectionName}
          usersRole={userRoles}
          users={data}
        />
      </CollectionPageStatic>
    );
  }

  return <CollectionPageErrorStatic error={data} collection={collectionName} />;
};
export default UserPageCollection;
