"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger, // Added trigger for potential use
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

interface BulkDeleteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number; // Number of students selected
  trigger?: React.ReactNode; // Optional trigger element
}

export function BulkDeleteStudentModal({
  isOpen,
  onClose,
  onConfirm,
  count,
  trigger,
}: BulkDeleteStudentModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(); // Call parent's bulk delete handler
    } catch (error) {
      console.error("Failed to bulk delete students:", error);
      // Add user feedback
    } finally {
      setIsDeleting(false);
      // Again, parent should ideally handle closing by setting isOpen=false
      // onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Don't render if count is 0
  if (count === 0 && !isOpen) {
    return trigger ? <>{trigger}</> : null; // Render trigger if provided, else nothing
  }
  if (!isOpen) {
    return null; // Don't render the dialog if not open
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && !isOpen && <DialogTrigger asChild>{trigger}</DialogTrigger>}{" "}
      {/* Show trigger only when closed */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Bulk Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected{" "}
            <strong>{count}</strong> student{count !== 1 ? "s" : ""}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting
              ? "Deleting..."
              : `Delete ${count} Student${count !== 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
