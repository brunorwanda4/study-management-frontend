"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SchoolStaffDto } from "@/lib/schema/school/school-staff-schema";
import type { ReactNode } from "react";

interface AssignRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffMembers: SchoolStaffDto[];
  trigger?: ReactNode;
}

export function AssignRoleDialog({
  open,
  onOpenChange,
  staffMembers,
  trigger,
}: AssignRoleDialogProps) {
  const handleAssignRole = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to assign role would go here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Role to Staff Member</DialogTitle>
          <DialogDescription>
            Select a staff member and assign them a new role.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAssignRole}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="staff-select" className="text-right">
                Staff Member
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staffMembers.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id.toString()}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-role" className="text-right">
                Current Role
              </Label>
              <Input
                id="current-role"
                className="col-span-3"
                disabled
                value="Teacher"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-role" className="text-right">
                New Role
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select new role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Librarian">Librarian</SelectItem>
                  <SelectItem value="Counselor">Counselor</SelectItem>
                  <SelectItem value="Department Head">
                    Department Head
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Input
                id="reason"
                className="col-span-3"
                placeholder="Reason for role change"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Assign Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
