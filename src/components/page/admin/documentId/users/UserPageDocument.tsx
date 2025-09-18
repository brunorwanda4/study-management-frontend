import MyImage from "@/components/common/myImage";
import DocumentPageStatic, {
  DocumentPageStaticError,
} from "@/components/page/admin/static/documentPageStatic";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/functions/format_date_fn";
import { formatGender } from "@/lib/functions/string_fn";
import { UserModel } from "@/lib/types/userModel";
import { cn } from "@/lib/utils";
import {
  fetchAllUserRoles,
  fetchDocumentById,
} from "@/service/admin/fetchDataFn";
import DeleteUserDialog from "../../collection/users/deleteUserDialog";
import UpdateUserDialog from "./UpdateUserDialog";
import UserDisableButton from "./userDisableButton";

interface props {
  collectionName: string;
  documentId: string;
}
const UserPageDocument = async ({ collectionName, documentId }: props) => {
  const data = await fetchDocumentById<UserModel>(
    `users/${documentId}`,
    "users Id",
  );

  if ("message" in data) {
    return (
      <DocumentPageStaticError
        error={data}
        documentName={documentId}
        collectionName={collectionName}
      />
    );
  }

  const userRoles = await fetchAllUserRoles();
  if ("message" in userRoles) {
    return (
      <DocumentPageStaticError
        error={userRoles}
        documentName={documentId}
        collectionName={collectionName}
      />
    );
  }

  return (
    <DocumentPageStatic
      collectionName={collectionName}
      documentName={data.name}
    >
      <div className="happy-card p-0">
        <div className="flex w-full p-4">
          <div className="w-1/2">
            <MyImage
              src={(data.image && data.image[0]?.src) || "/profiles/b/17.png"}
              className="size-60"
            />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col gap-2">
              <h3
                className={cn(
                  "card-title capitalize",
                  data.disable && "text-warning",
                )}
              >
                {data.name}
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  username: <p>{data.username}</p>
                </div>
                <p>{data.email}</p>
                <p className="text-sm">{data.role}</p>
                {data.gender && <p>{formatGender(data.gender)}</p>}
                <p>{formatDate(data.create_on)}</p>
                {data.update_on && (
                  <p className="text-warning">{formatDate(data.update_on)}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <DeleteUserDialog user={data} />
              <UserDisableButton id={data.id} disable={data.disable} />
              <UpdateUserDialog user={data} usersRole={userRoles} />
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </DocumentPageStatic>
  );
};

export default UserPageDocument;
