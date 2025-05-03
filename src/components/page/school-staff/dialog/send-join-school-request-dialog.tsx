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
import SendJoinSchoolRequestForm from "../../../table/school/send-join-school-request-form";
import { getClassesBySchoolIdViewData } from "@/service/class/class.service";
import { Plus } from "lucide-react";

interface Props {
  lang: Locale;
  currentSchool: UserSchool;
}

const SendJoinSchoolRequest = async ({ currentSchool }: Props) => {
  const response = await getClassesBySchoolIdViewData(currentSchool.schoolId);
  const classes = response.data;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} library="daisy" variant="info">
       <Plus />   New People
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Send request to Join{" "}
            <span className=" font-medium">{currentSchool.name}</span>
          </DialogTitle>
        </DialogHeader>
        <SendJoinSchoolRequestForm classes={classes || []} currentSchool={currentSchool} />
      </DialogContent>
    </Dialog>
  );
};

export default SendJoinSchoolRequest;
