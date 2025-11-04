import CreateClassForm from "@/components/page/class/form/create-class-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  auth: AuthContext;
  isSchool?: boolean;
}

const CreateClassDialog = ({ auth, isSchool }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button role="create" library="daisy" variant={"primary"} size={"sm"}>
          Create class
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>Create Class</DialogHeader>
        <DialogDescription>
          Create new class which is not exits
        </DialogDescription>
        <CreateClassForm auth={auth} isSchool />
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
