import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import MyImage from "../../../myComponents/myImage";
import { Button } from "../../../ui/button";
import InputJoinSchoolFormForm from "../../../table/school/join-school-form";

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
