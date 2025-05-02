"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { ToastAction } from "@/components/ui/toast"; // Import if needed for actions
import { useToast } from "@/lib/context/toast/ToastContext";
// import { useToast } from "@/hooks/use-toast";

interface props {
  requestId: string;
}

const JoinSchoolTableDropdown = ({ requestId }: props) => {
  //   const handleDelete = async () => {
  //     const deleteRequest = await deleteSchoolJoinRequestById(requestId)
  //   };
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast({
      type: "success",
      title: "Success!",
      description: "Your profile was updated successfully.",
      duration: 3000, // Optional: override default duration
    });
  };

  const handleError = () => {
    showToast({
      type: "error",
      title: "Update Failed",
      description: "Could not save changes. Please try again.",
      // Example with an action
      action: (
        <ToastAction
          altText="Retry"
          onClick={() => console.log("Retry clicked!")}
        >
          Retry
        </ToastAction>
      ),
    }); // Uses default duration
  };

  const handleWarning = () => {
    showToast({
      type: "warning",
      title: "Session Expiring",
      description: "Your session will expire in 5 minutes.",
    });
  };

  const handleInfo = () => {
    showToast({
      type: "info",
      title: "Did you know?",
      description: "You can customize your dashboard widgets.",
      duration: 7000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button library="daisy" variant={"ghost"} size={"sm"}>
          <HiOutlineDotsHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" px-2 py-1 flex flex-col space-y-2">
        {/* <Button
          size={"xs"}
          library="daisy"
          variant={"ghost"}
          className=" justify-start"
        >
          Reject
        </Button>
        <Button
          size={"xs"}
          library="daisy"
          variant={"warning"}
          className=" justify-start"
        >
          Cancel
        </Button>
        <Button
          size={"xs"}
          library="daisy"
          variant={"error"}
          className=" justify-start"
        >
          Delete
        </Button> */}
        <Button onClick={handleSuccess}>Show Success Toast</Button>
        <Button variant="destructive" onClick={handleError}>
          Show Error Toast
        </Button>
        <Button variant="outline" onClick={handleWarning}>
          Show Warning Toast
        </Button>
        <Button variant="secondary" onClick={handleInfo}>
          Show Info Toast
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JoinSchoolTableDropdown;
