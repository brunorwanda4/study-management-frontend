import { Separator } from "@/components/ui/separator";
import { ClassTypeModelGet } from "@/lib/types/classTypeModel";
import CreateClassType from "./CreateClassTypeDialog";
import DeleteClassTypeDialog from "./DeleteClassTypeDialog";
import UpdateClassTypeDialog from "./updateClassTypeDialog";

type props = {
  roles: ClassTypeModelGet[];
};
const ClassRoles = ({ roles }: props) => {
  return (
    <div className="happy-card w-1/2 p-0">
      <div className="flex items-center justify-between p-4">
        <h2 className="happy-title-base">Collection Roles ({roles.length})</h2>
        <CreateClassType />
      </div>
      <Separator />
      <div className="h-36 space-y-2 p-4">
        {roles.map(async (item) => {
          return (
            <div
              key={item.id}
              className="flex max-h-36 justify-between overflow-y-auto"
            >
              <span className="capitalize">{item.name}</span>
              <div className="space-x-2">
                <DeleteClassTypeDialog role={item} />
                <UpdateClassTypeDialog classType={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassRoles;
