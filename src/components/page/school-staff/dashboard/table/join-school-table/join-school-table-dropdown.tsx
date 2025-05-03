"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// import { ToastAction } from "@/components/ui/toast"; // Import if needed for actions
import { useToast } from "@/lib/context/toast/ToastContext";
import { deleteSchoolJoinRequestById } from "@/service/school/school-join-request.service";
import { useState, useTransition } from "react";
// import { useToast } from "@/hooks/use-toast";

interface props {
  requestId: string;
}

const JoinSchoolTableDropdown = ({ requestId }: props) => {
  const [isPending, startTransition] = useTransition();
  const [isDelete, setIsDelete] = useState(false);
  const { showToast } = useToast();
  const handleDelete = () => {
    startTransition(async () => {
      setIsDelete(true);
      const deleteRequest = await deleteSchoolJoinRequestById(requestId);
      if (deleteRequest.data) {
        showToast({
          type: "warning",
          title: "Success!",
          description: "You have been delete request!",
          duration: 2000,
        });
      } else {
        showToast({
          type: "error",
          title: "Some thing went wrong to delete request",
          description: deleteRequest.message,
          duration: 3000,
        });
      }
      setIsDelete(false);
    });
  };

  // const handleError = () => {
  //   showToast({
  //     type: "error",
  //     title: "Update Failed",
  //     description: "Could not save changes. Please try again.",
  //     // Example with an action
  //     action: (
  //       <ToastAction
  //         altText="Retry"
  //         onClick={() => console.log("Retry clicked!")}
  //       >
  //         Retry
  //       </ToastAction>
  //     ),
  //   }); // Uses default duration
  // };

  // const handleWarning = () => {
  //   showToast({
  //     type: "warning",
  //     title: "Session Expiring",
  //     description: "Your session will expire in 5 minutes.",
  //   });
  // };

  // const handleInfo = () => {
  //   showToast({
  //     type: "info",
  //     title: "Did you know?",
  //     description: "You can customize your dashboard widgets.",
  //     duration: 7000,
  //   });
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button library="daisy" variant={"ghost"} size={"sm"}>
          <HiOutlineDotsHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" px-2 py-1 flex flex-col space-y-2">
        <Button
          disabled={isPending}
          size={"xs"}
          library="daisy"
          variant={"ghost"}
          className=" justify-start"
        >
          Reject
        </Button>
        <Button
          disabled={isPending}
          size={"xs"}
          library="daisy"
          variant={"warning"}
          className=" justify-start"
        >
          Cancel
        </Button>
        <Button
          disabled={isPending}
          size={"xs"}
          library="daisy"
          variant={"error"}
          className=" justify-start"
          onClick={() => handleDelete()}
        >
          Delete{" "}
          {isDelete && (
            <div
              role="status"
              aria-label="Loading"
              className="loading loading-spinner"
            />
          )}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JoinSchoolTableDropdown;
