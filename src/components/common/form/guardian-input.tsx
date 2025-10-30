"use client";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Relationships } from "@/lib/const/common-details-const";
import type { GuardianInfo } from "@/lib/schema/parent/guardian-schema";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

interface GuardiansInputProps {
  value?: GuardianInfo[] | null;
  onChange?: (value: GuardianInfo[] | undefined) => void;
  disabled?: boolean;
  error?: string | string[]; // optional: field-level or per-item errors
  label?: string;
  className?: string;

  // keep these props if you still want auto-prefill on mount
  currentUser?: GuardianInfo;
  autoIncludeCurrentUser?: boolean;
}

export default function GuardiansInput({
  value,
  onChange,
  disabled,
  error,
  label = "Guardians / Parents",
  className,
  currentUser,
  autoIncludeCurrentUser = false,
}: GuardiansInputProps) {
  const { theme } = useTheme();
  const initial = value ?? [];
  const [list, setList] = useState<GuardianInfo[]>(initial);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    initial.length > 0 ? 0 : null,
  );
  const firstNameRef = useRef<HTMLInputElement | null>(null);

  // sync external value -> internal list
  useEffect(() => {
    setList(value ?? []);
    setExpandedIndex((v) => {
      if (value && v !== null && v < value.length) return v;
      return value && value.length > 0 ? 0 : null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // auto include current user on mount if requested and no guardians exist
  useEffect(() => {
    if (
      autoIncludeCurrentUser &&
      (!value || value.length === 0) &&
      currentUser
    ) {
      const next = [{ ...currentUser }];
      setList(next);
      setExpandedIndex(0);
      onChange?.(next);
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // focus the first input when expandedIndex changes to that item
  useEffect(() => {
    if (expandedIndex === 0 && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [expandedIndex]);

  const makeNewGuardian = (): GuardianInfo => ({
    name: undefined,
    phone: undefined,
    email: undefined,
    relationship: undefined,
  });

  const emit = (next: GuardianInfo[]) => {
    onChange?.(next.length ? next : undefined);
  };

  const handleAdd = () => {
    const next = [...list, makeNewGuardian()];
    setList(next);
    setExpandedIndex(next.length - 1);
    emit(next);
  };

  const handleRemove = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    setList(next);
    if (next.length === 0) setExpandedIndex(null);
    else
      setExpandedIndex((prev) => {
        if (prev === null) return 0;
        if (index < prev) return prev - 1;
        if (index === prev) return Math.max(0, prev - 1);
        return prev;
      });
    emit(next);
  };

  const handleChange = (
    index: number,
    key: keyof GuardianInfo,
    val?: string,
  ) => {
    const next = list.map((g, i) => {
      if (i !== index) return g;
      return { ...(g ?? {}), [key]: val ?? undefined };
    });
    setList(next);
    emit(next);
  };

  return (
    <div className={cn("space-y-3 w-full", className)}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>

        <Button
          role="create"
          type="button"
          size="sm"
          library="daisy"
          variant={"info"}
          onClick={handleAdd}
          disabled={disabled}
        >
          Add
        </Button>
      </div>

      {/* List of guardians */}
      <div className="space-y-4">
        {list.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No guardians added.
          </div>
        )}

        {list.map((g, idx) => (
          <div key={idx} className="">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <div className="flex gap-2">
                  <div className="w-full">
                    <Label className="text-sm">Name</Label>
                    <Input
                      ref={idx === 0 ? firstNameRef : undefined}
                      disabled={disabled}
                      placeholder="Full name"
                      value={g?.name ?? ""}
                      onChange={(e) =>
                        handleChange(idx, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="w-full">
                    <Label className="text-sm">Phone</Label>
                    <Input
                      disabled={disabled}
                      placeholder="+250 7xx xxx xxx"
                      value={g?.phone ?? ""}
                      onChange={(e) =>
                        handleChange(idx, "phone", e.target.value)
                      }
                      inputMode="tel"
                    />
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Email</Label>
                    <Input
                      disabled={disabled}
                      placeholder="guardian@example.com"
                      value={g?.email ?? ""}
                      onChange={(e) =>
                        handleChange(idx, "email", e.target.value)
                      }
                      type="email"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Relationship</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        type="button"
                        onClick={() => handleRemove(idx)}
                        disabled={disabled}
                        role="delete"
                      >
                        Remove
                      </Button>
                    </div>

                    <Select
                      disabled={disabled}
                      value={g?.relationship ?? ""}
                      onValueChange={(val) =>
                        handleChange(idx, "relationship", val || undefined)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent data-theme={theme}>
                        {Relationships.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show field-level error(s) */}
      {error &&
        (Array.isArray(error) ? (
          <FormMessage>{error.filter(Boolean).join(", ")}</FormMessage>
        ) : (
          <FormMessage>{error}</FormMessage>
        ))}
    </div>
  );
}
