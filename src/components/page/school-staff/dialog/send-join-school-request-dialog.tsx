"use client";
import type { Locale } from "@/i18n";
import type { Class } from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { Plus } from "lucide-react";
import SendJoinSchoolRequestForm from "../../../table/school/send-join-school-request-form";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";

interface Props {
  lang: Locale;
  auth: AuthContext;
  classes: Class[];
}

const SendJoinSchoolRequest = ({ auth, classes }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} library="daisy" variant="info">
          <Plus /> New People
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[85vh] max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send request to Join {auth.school?.name}</DialogTitle>
          <DialogDescription>
            Join school request will expires in 7 days
          </DialogDescription>
        </DialogHeader>
        <SendJoinSchoolRequestForm classes={classes || []} auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default SendJoinSchoolRequest;
