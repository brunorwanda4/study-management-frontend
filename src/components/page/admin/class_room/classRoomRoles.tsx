import { Separator } from "@/components/ui/separator";
import CreateClassRoomTypeDialog from "./CreateClassRoomTypeDialog";
import DeleteClassRoomTypeDialog from "./DeleteClassRoomTypeDialog";
import { ClassRoomTypeModelGet } from "@/types/classRoomTypeModel";
import UpdateClassRoomTypeDialog from "./updateClassRoomRoleDailog";

type props = {
  roles: ClassRoomTypeModelGet[];
};
const ClassRoomRoles = ({ roles }: props) => {
  return (
    <div className=" happy-card w-1/2 p-0">
      <div className=" p-4 flex justify-between items-center">
        <h2 className="happy-title-base">Collection Roles ({roles.length})</h2>
        <CreateClassRoomTypeDialog />
      </div>
      <Separator />
      <div className=" h-36 p-4 space-y-2 overflow-y-auto max-h-36">
        {roles.map(async (item) => {
          return (
            <div key={item.id} className=" flex justify-between">
              <span className="  capitalize">
                {item.name}
              </span>
              <div className=" space-x-2">
                <UpdateClassRoomTypeDialog classRoleType={item}/>
                <DeleteClassRoomTypeDialog role={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassRoomRoles;
