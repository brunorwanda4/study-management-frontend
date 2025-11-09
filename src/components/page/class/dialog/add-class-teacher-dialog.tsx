"use client";
import ClassTeacherForm from "@/components/page/class/form/class-teacher-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  cls?: Class;
  teacher?: Teacher;
  name?: string;
  title?: string;
}

const ClassTeacherDialog = ({ auth, cls, name, title, teacher }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={name ? "ghost" : "secondary"}
          role={name ? undefined : "create"}
          size={"sm"}
          library="daisy"
        >
          {name ?? "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {cls?.class_teacher_id
              ? `change class teacher in ${cls.name}`
              : cls
                ? `Add class teacher ${cls.name}`
                : (title ?? "Add class teacher")}
          </DialogTitle>
        </DialogHeader>
        <ClassTeacherForm teacher={teacher} cls={cls} auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default ClassTeacherDialog;
