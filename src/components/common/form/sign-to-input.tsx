"use client";
import type React from "react";
import { useMemo, useState } from "react";
import { UserSmCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import MyAvatarGroup from "../image/my-avatar-group";
import NoItemsPage from "../pages/no-items-page";

interface SignToInputProps {
  onChange: (
    value: Pick<
      UserModel,
      "_id" | "id" | "email" | "name" | "image" | "gender" | "age" | "username"
    >[],
  ) => void;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  name?: string;
  disabled?: boolean;
  users?: Pick<
    UserModel,
    "_id" | "id" | "email" | "name" | "image" | "gender" | "age" | "username"
  >[];
}

const SignToInput = ({
  onChange,
  disabled,
  name,
  open,
  className,
  title,
  description,
  users = [], // Default to empty array
}: SignToInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isInternalOpen, setIsInternalOpen] = useState(open || false);

  // 1. Filter Users based on Search
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const lowerQuery = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(lowerQuery) ||
        u.username?.toLowerCase().includes(lowerQuery) ||
        u.email?.toLowerCase().includes(lowerQuery),
    );
  }, [users, searchQuery]);

  // 2. Derive Selected User Objects for the Trigger/OnChange
  const selectedUsers = useMemo(() => {
    return users.filter((u) => selectedIds.has(u._id || u.id || ""));
  }, [users, selectedIds]);

  // 3. Handle Individual Toggle
  const toggleUser = (userId: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(userId)) {
      newSet.delete(userId);
    } else {
      newSet.add(userId);
    }
    setSelectedIds(newSet);
  };

  // 4. Handle "Select All" (Applies to currently filtered view)
  const handleSelectAll = () => {
    const newSet = new Set(selectedIds);
    const allFilteredSelected = filteredUsers.every((u) =>
      newSet.has(u._id || u.id || ""),
    );

    if (allFilteredSelected) {
      // Deselect all currently filtered
      filteredUsers.forEach((u) => newSet.delete(u._id || u.id || ""));
    } else {
      // Select all currently filtered
      filteredUsers.forEach((u) => newSet.add(u._id || u.id || ""));
    }
    setSelectedIds(newSet);
  };

  // 5. Determine State of "Select All" Checkbox
  const isAllSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedIds.has(u._id || u.id || ""));

  // 6. Sync with parent onChange when Dialog closes (or you can do it realtime)
  const handleDone = () => {
    onChange(selectedUsers);
    setIsInternalOpen(false);
  };

  return (
    <Dialog open={isInternalOpen} onOpenChange={setIsInternalOpen}>
      <DialogTrigger asChild disabled={disabled} className=" w-fit">
        {/* Logic: If users are selected, show AvatarGroup, else show Button */}
        <div className="cursor-pointer inline-block">
          {selectedUsers.length > 0 && selectedUsers.length !== users.length ? (
            // Display the Avatar Group
            <div className="flex items-center gap-2 p-1 border-sm card  flex-row w-fit">
              <MyAvatarGroup
                items={selectedUsers.map((user) => ({
                  src: user.image,
                  alt: user.name,
                }))}
                size="sm"
                limit={5}
                type="cycle"
                className=" w-fit"
              />
              <span className="text-xs text-muted-foreground ml-2">Edit</span>
            </div>
          ) : (
            <Button type="button" variant={"outline"}>
              {name ?? "Sign to"}
            </Button>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className={cn("sm:max-w-xl", className)}>
        <DialogHeader>
          <DialogTitle>{title ?? "Select Users"}</DialogTitle>
          <DialogDescription>
            {description ?? "Search and select users from the list below."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Search Input */}
          <div>
            <Input
              placeholder="Search name, username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* All Students Checkbox */}
          <div className="flex gap-2 items-center pb-2 border-b">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              id="select-all"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium cursor-pointer"
            >
              Select All ({filteredUsers.length})
            </label>
          </div>

          {/* User List */}
          <div className="flex flex-col gap-2 pr-1 w-full">
            {filteredUsers.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-4">
                <NoItemsPage
                  imageClassName="  w-48 h-27"
                  title="No users found."
                />
              </div>
            ) : (
              filteredUsers.map((user) => {
                const uid = user._id || user.id || "";
                return (
                  <div
                    key={uid}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => toggleUser(uid)}
                  >
                    <Checkbox
                      checked={selectedIds.has(uid)}
                      onCheckedChange={() => toggleUser(uid)}
                    />
                    <div className="pointer-events-none">
                      <UserSmCard
                        name={user.name || "Unknown"}
                        image={user.image || ""}
                        gender={user.gender || "MALE"}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <DialogFooter className=" ">
          {/* Use custom click handler to trigger onChange */}
          <Button
            type="button"
            variant={"info"}
            library="daisy"
            onClick={handleDone}
          >
            Done ({selectedUsers.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignToInput;
