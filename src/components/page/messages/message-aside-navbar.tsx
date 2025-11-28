"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { FiEdit } from "react-icons/fi";

const MessagesAsideNavbar = () => {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  setOpen(false);

  return (
    <nav className="border-b border-b-base-300 p-2 flex  justify-between items-center">
      <div>
        <h5 className=" h5">Discussion</h5>
      </div>
      <div>
        <Button library="daisy" variant="ghost">
          <FiEdit />
        </Button>
      </div>
    </nav>
  );
};

export default MessagesAsideNavbar;
