import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const CreateClassDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button role="create" library="daisy" variant={"primary"} size={"sm"}>
          Create class
        </Button>
      </DialogTrigger>
      <DialogContent>Create class dialog</DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
