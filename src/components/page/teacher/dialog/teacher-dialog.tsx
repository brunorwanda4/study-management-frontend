import TeacherForm from "@/components/page/teacher/form/teacher-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  auth: AuthContext;
  isSchool?: boolean;
  teacher?: Teacher;
}

const TeacherDialog = ({ auth, isSchool, teacher }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={teacher ? undefined : "create"}
          library="daisy"
          variant={teacher ? "outline" : "primary"}
          size={"sm"}
        >
          {teacher ? "Update teacher" : "Create teacher"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {teacher ? `update ${teacher.name}` : "Create teacher"}
            <span>{teacher?._id}</span>
          </DialogTitle>
        </DialogHeader>
        <TeacherForm auth={auth} isSchool={isSchool} teacher={teacher} />
      </DialogContent>
    </Dialog>
  );
};

export default TeacherDialog;
