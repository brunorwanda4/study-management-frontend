import MyImage from "../../../comon/myImage";
import InputJoinSchoolFormForm from "../../../table/school/join-school-form";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";

const JoinSchoolDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"outline"}>
          <MyImage src="/icons/school.png" role="ICON" />
          Join your school
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join School</DialogTitle>
          <DialogDescription>Enter school username and code</DialogDescription>
        </DialogHeader>
        <InputJoinSchoolFormForm />
      </DialogContent>
    </Dialog>
  );
};

export default JoinSchoolDialog;
