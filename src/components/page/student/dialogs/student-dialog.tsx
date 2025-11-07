"use client";

import StudentForm from "@/components/page/student/form/student-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Student } from "@/lib/schema/school/student-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
  student?: Student;
}

const StudentDialog = ({ auth, isSchool, student }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={student ? undefined : "create"}
          library="daisy"
          variant={student ? "outline" : "primary"}
          size="sm"
        >
          {student ? "Update Student" : "Create Student"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {student ? `Update ${student.name}` : "Create Student"}
          </DialogTitle>
        </DialogHeader>

        <StudentForm auth={auth} isSchool={isSchool} student={student} />
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;
