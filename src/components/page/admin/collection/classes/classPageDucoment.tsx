import MyImage from "@/components/common/myImage";
import DocumentPageStatic, {
  DocumentPageStaticError,
} from "@/components/page/admin/static/documentPageStatic";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/functions/format_date_fn";
import { cn } from "@/lib/utils";
import { fetchAllUserRoles, getClassAPI } from "@/service/admin/fetchDataFn";

interface props {
  collectionName: string;
  documentId: string;
}
const ClassPageDocument = async ({ collectionName, documentId }: props) => {
  const data = await getClassAPI(documentId);

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
            <MyImage src={"/profiles/b/17.png"} className="size-60" />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col gap-2">
              <h3 className={cn("card-title capitalize", "text-warning")}>
                {data.name}
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  username: <p>{data.username}</p>
                </div>
                <p>{data.class_room}</p>
                <p className="text-sm">{data.code}</p>
                <div>{data.class_teacher} </div>
                <p>{formatDate(data.created_on)}</p>
                {data.updated_on && (
                  <p className="text-warning">{formatDate(data.updated_on)}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              {/* <DeleteUserDialog user={data} /> */}
              {/* <UserDisableButton id={data.id} disable={data.disable} /> */}
              {/* <UpdateUserDialog user={data} usersRole={userRoles} /> */}
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </DocumentPageStatic>
  );
};

export default ClassPageDocument;
