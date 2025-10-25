// src/components/page/school-staff/dialog/DeleteStudentModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Use Description for confirmation text
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

interface DeleteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studentName: string | null | undefined; // Name for confirmation message
}

export function DeleteStudentModal({
  isOpen,
  onClose,
  onConfirm,
  studentName,
}: DeleteStudentModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(); // Call the parent's delete handler
      // No need to onClose() here, parent handler should close via isOpen state change
    } catch (error) {
      console.error("Failed to delete student:", error);
      // Add user feedback
    } finally {
      setIsDeleting(false);
      // It's often better practice for the PARENT component to control closure
      // by setting isOpen to false after the delete operation completes (in its handler).
      // onClose(); // Optionally close here if parent logic doesn't handle it
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the student{" "}
            <strong>{studentName ?? "this student"}</strong>? This action cannot
            be undone.
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
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
