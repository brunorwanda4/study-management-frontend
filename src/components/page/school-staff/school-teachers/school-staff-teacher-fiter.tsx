import ChangeDisplay from "@/components/display/change-diplay";
import TeacherDialog from "@/components/page/teacher/dialog/teacher-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { AuthContext } from "@/lib/utils/auth-context";
import { BsSearch } from "react-icons/bs";

interface props {
  auth: AuthContext;
}

const SchoolStaffTeacherFilter = ({ auth }: props) => {
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
        <TeacherDialog auth={auth} isSchool />
      </div>
      <Separator />
    </div>
  );
};

export default SchoolStaffTeacherFilter;
