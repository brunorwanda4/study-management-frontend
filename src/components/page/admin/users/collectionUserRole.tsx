import { Separator } from "@/components/ui/separator";
import { UserRoleModel } from "@/lib/types/userModel";
import { fetchUsersByRole } from "@/service/admin/fetchDataFn";
import CollectionUserRoleNew from "./collectionUserRoleNew";
import DeleteUserRoleDialog from "./deleteUserRoleDialog";
import UpdateUserRoleDialog from "./updateUserRoleDialog";

type props = {
  roles: UserRoleModel[];
};
const CollectionUserRole = ({ roles }: props) => {
  return (
    <div className="happy-card w-1/2 p-0">
      <div className="flex items-center justify-between p-4">
        <h2 className="happy-title-base">Collection Roles ({roles.length})</h2>
        <CollectionUserRoleNew />
      </div>
      <Separator />
      <div className="h-36 max-h-36 space-y-2 overflow-y-auto p-4">
        {roles.map(async (item) => {
          let totalUsers: number = 0;
          const getUsers = await fetchUsersByRole(item.role);
          if (!("message" in getUsers)) {
            totalUsers = getUsers.length;
          }
          return (
            <div key={item.id} className="flex justify-between">
              <span className="capitalize">
                {item.role} ({totalUsers})
              </span>
              <div>
                <UpdateUserRoleDialog userRole={item} />
                <DeleteUserRoleDialog totalUsers={totalUsers} role={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionUserRole;
