import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import JoinClassCodeForm from "../form/join-class-code-form";

const JoinClassDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"info"}>
          <MyImage src="/icons/classroom.png" role="ICON" />
          Join your Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Class</DialogTitle>
          <DialogDescription>Enter class username and code</DialogDescription>
        </DialogHeader>
        <JoinClassCodeForm />
      </DialogContent>
    </Dialog>
  );
};

export default JoinClassDialog;
