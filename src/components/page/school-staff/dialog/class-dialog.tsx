import CreateClassForm from "@/components/page/class/form/class-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Class } from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  auth: AuthContext;
  isSchool?: boolean;
  cls?: Class;
}

const ClassDialog = ({ auth, isSchool, cls }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={cls ? undefined : "create"}
          library="daisy"
          variant={cls ? "outline" : "primary"}
          size={"sm"}
        >
          {cls ? "Update class" : "Create class"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          {cls ? `update ${cls.name}` : "Create Class"}
        </DialogHeader>
        <DialogDescription>
          {cls
            ? "Update class when you change class username like which class was using will not work will use other username"
            : "Create new class which is not exits"}
        </DialogDescription>
        <CreateClassForm auth={auth} isSchool={isSchool} cls={cls} />
      </DialogContent>
    </Dialog>
  );
};

export default ClassDialog;
