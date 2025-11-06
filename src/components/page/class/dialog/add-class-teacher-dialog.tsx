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
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
}

const ClassTeacherDialog = ({ auth }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"secondary"}
          role="create"
          size={"xs"}
          library="daisy"
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add class teacher</DialogTitle>
        </DialogHeader>
        <ClassTeacherForm auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default ClassTeacherDialog;
