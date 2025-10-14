import CreateMainSubjectForm from "@/components/page/admin/main-subject/create-main-subject-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { AuthContext } from "@/lib/utils/auth-context";

interface props {
  auth: AuthContext;
  mainClass?: MainClassModel;
}

const CreateMainSubjectDialog = ({ auth, mainClass }: props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"primary"} library="daisy" role="create">
          Create main subject
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            Create new main subject{" "}
            {!!mainClass && <span>for {mainClass.name}</span>}
          </DialogTitle>
          <DialogDescription>
            add new main subject{" "}
            {!!mainClass && <span>in {mainClass?.name}</span>}
          </DialogDescription>
        </DialogHeader>
        <CreateMainSubjectForm isDialog mainClass={mainClass} auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateMainSubjectDialog;
