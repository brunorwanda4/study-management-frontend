import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteAnnouncementDialogProps {
  announcement?: any;
}

const DeleteAnnouncementDialog = ({
  announcement,
}: DeleteAnnouncementDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size={"sm"}
          type="button"
          variant={"ghost"}
          className=" hover:text-error justify-start flex"
          library="daisy"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this announcement?
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button type="button" variant={"outline"} library="daisy">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button type="button" variant={"error"} library="daisy">
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAnnouncementDialog;
