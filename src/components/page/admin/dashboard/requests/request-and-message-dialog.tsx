"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RequestAndMessagesCardTypes } from "./request-and-messages-card";

const RequestAndMessageDialog = ({
  name,
  email,
  message,
  sendOn,
}: RequestAndMessagesCardTypes) => {
  return (
    <Dialog>
      <DialogTrigger className="btn btn-sm btn-info">Reply</DialogTrigger>
      <DialogContent>
        <DialogTitle>Reply hello</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default RequestAndMessageDialog;
