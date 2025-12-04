"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import { useFieldArray, type Control } from "react-hook-form";

interface TopicsInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function TopicsInput<T extends FieldValues>({
  control,
  name,
}: TopicsInputProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as any,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Topics</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              order: "",
              title: "",
              estimated_hours: "",
              credits: "",
              subtopics: [],
            } as any)
          }
        >
          <Plus className="h-4 w-4 mr-1" /> Add Topic
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <TopicItem
            key={field.id}
            control={control}
            name={`${name}.${index}` as FieldPath<T>}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
}

/** ----- Nested One Topic ------ */
interface TopicItemProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  onRemove: () => void;
}

function TopicItem<T extends FieldValues>({
  control,
  name,
  onRemove,
}: TopicItemProps<T>) {
  const [open, setOpen] = useState(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.subtopics` as any,
  });

  return (
    <div className="border-l rounded-l-none border-base-content/20 p-2 bg-base-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-left"
          type="button"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="font-semibold">Topic</span>
        </button>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {open && (
        <div className="mt-2 flex flex-col gap-3">
          {/* Topic fields */}
          <CommonFormField
            control={control}
            name={`${name}.order` as FieldPath<T>}
            label="Order"
            placeholder="1"
            fieldType="input"
          />

          <CommonFormField
            control={control}
            name={`${name}.title` as FieldPath<T>}
            label="Title"
            placeholder="Introduction..."
            fieldType="input"
          />

          <CommonFormField
            control={control}
            name={`${name}.description` as FieldPath<T>}
            label="Description"
            placeholder="Introduction..."
            fieldType="textarea"
          />

          <CommonFormField
            control={control}
            name={`${name}.estimated_hours` as FieldPath<T>}
            label="Estimated Hours"
            type="number"
            placeholder="10"
            fieldType="input"
            inputProps={{
              min: 1,
              max: 1000,
              defaultValue: 60,
              numberMode: "hours",
            }}
          />

          <CommonFormField
            control={control}
            name={`${name}.credits` as FieldPath<T>}
            label="Credits"
            type="number"
            inputProps={{
              min: 1,
              max: 1000,
              defaultValue: 60,
              numberMode: "percent",
            }}
            placeholder="3"
            fieldType="input"
          />

          {/* Subtopics */}
          <div className="mt-3 p-2">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Subtopics</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    order: "",
                    title: "",
                    estimated_hours: "",
                    credits: "",
                    subtopics: [],
                  } as any)
                }
                role="create"
              >
                Add Subtopic
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {fields.map((sub, i) => (
                <TopicItem
                  key={sub.id}
                  control={control}
                  name={`${name}.subtopics.${i}` as FieldPath<T>}
                  onRemove={() => remove(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
