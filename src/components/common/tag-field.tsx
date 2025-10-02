"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tag as EmblorTag, TagInput } from "emblor";
import { useId, useState } from "react";

interface TagFieldProps {
  tags?: string[];
  onChange: (tags: string[]) => void;
  label?: string | React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export default function TagField({
  tags = [],
  onChange,
  label,
  placeholder = "Add a tag",
  disabled = false,
  className,
  labelClassName,
  inputClassName,
}: TagFieldProps) {
  const id = useId();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  // Convert string[] -> EmblorTag[]
  const emblorTags: EmblorTag[] = tags.map((tag) => ({
    id: tag,
    text: tag,
  }));

  // Helper: EmblorTag[] -> string[]
  const toStringArray = (tags: EmblorTag[]): string[] =>
    tags.map((t) => t.text);

  // Handle changes from TagInput and pass string[] back up
  const handleTagsChange = (value: React.SetStateAction<EmblorTag[]>) => {
    let newTags: EmblorTag[];
    if (typeof value === "function") {
      newTags = value(emblorTags); // compute from current
    } else {
      newTags = value;
    }
    onChange(toStringArray(newTags));
  };

  return (
    <div className={cn("h-fit w-full space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      )}

      <TagInput
        id={id}
        tags={emblorTags} // always EmblorTag[]
        setTags={handleTagsChange} // returns string[]
        placeholder={placeholder}
        disabled={disabled}
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input: cn(
            "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            inputClassName,
          ),
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
    </div>
  );
}
