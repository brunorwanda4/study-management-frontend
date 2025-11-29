"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const MessagesAsideNavbar = () => {
  const { open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar } =
    useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
  }, []);

  return (
    <nav className="border-b border-b-base-300 p-2 flex justify-between items-center">
      <h5 className="h5">Discussion</h5>

      <Button library="daisy" variant="ghost">
        <FiEdit />
      </Button>
    </nav>
  );
};

export default MessagesAsideNavbar;
