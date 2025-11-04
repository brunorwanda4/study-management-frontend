import ChangeDisplay from "@/components/display/change-diplay";
import CreateClassDialog from "@/components/page/school-staff/dialog/create-class-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BsSearch } from "react-icons/bs";

const SchoolStaffClassFilter = () => {
  return (
    <div>
      <div className=" flex justify-between w-full items-center">
        <div className=" flex gap-4 items-center">
          {/* choose table or card */}
          <ChangeDisplay />
          <div className=" flex gap-0 flex-row">
            <Input
              type="text"
              placeholder="Search class by name"
              className=" rounded-r-none "
            />
            <Button
              className=" rounded-l-none h-9 border border-base-content/50"
              variant={"outline"}
              library="daisy"
              size={"sm"}
            >
              <BsSearch />
              <span className=" sr-only">search</span>
            </Button>
          </div>
        </div>
        <CreateClassDialog />
      </div>
      <Separator />
    </div>
  );
};

export default SchoolStaffClassFilter;
