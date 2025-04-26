import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Locale } from "@/i18n";
import { UserSchool } from "@/lib/utils/auth";
import SendJoinSchoolRequestForm from "../../school/send-join-school-request-form";

interface Props {
  lang: Locale;
  currentSchool: UserSchool;
}

const SendJoinSchoolRequest = ({ currentSchool }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} library="daisy" variant="info">
          Send join request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Send request to Join{" "}
            <span className=" font-medium">{currentSchool.name}</span>
          </DialogTitle>
        </DialogHeader>
        <SendJoinSchoolRequestForm currentSchool={currentSchool} />
      </DialogContent>
    </Dialog>
  );
};

export default SendJoinSchoolRequest;
