"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRef, useState } from "react";
import {
  CircleStencil,
  Cropper,
  type CropperRef,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { Separator } from "@/components/ui/separator";
import { FlipHorizontal, RotateCw } from "lucide-react";

interface ImageEditorProps {
  open: boolean; // <-- parent controls dialog
  onOpenChange: (open: boolean) => void;
  src: string;
  onComplete: (blob: Blob | null) => void;
  initialAspectRatio?: number;
}

export default function ImageEditorDialog({
  open,
  onOpenChange,
  src,
  onComplete,
  initialAspectRatio = 1,
}: ImageEditorProps) {
  const cropperRef = useRef<CropperRef>(null);

  const [rotate, setRotate] = useState(0);
  const [flipMode, setFlipMode] = useState<"none" | "h" | "v">("none");
  const [saving, setSaving] = useState(false);

  const handleRotate = () => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    const nextAngle = (rotate + 90) % 360;
    cropper.rotateImage?.(nextAngle, { transitions: false });
    setRotate(nextAngle);
  };

  const handleFlip = () => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    let h = false;
    let v = false;
    let next: "none" | "h" | "v" = "none";

    if (flipMode === "none") {
      next = "h";
      h = true;
    } else if (flipMode === "h") {
      next = "v";
      v = true;
    } else if (flipMode === "v") {
      next = "h";
      h = true;
    }

    cropper.flipImage?.(h, v, { transitions: false });
    setFlipMode(next);
  };

  const handleSave = () => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    setSaving(true);
    const canvas = cropper.getCanvas?.();

    if (!canvas) {
      setSaving(false);
      onComplete(null);
      return;
    }

    canvas.toBlob((blob) => {
      setSaving(false);
      onComplete(blob || null);
      onOpenChange(false); // close dialog after save
    }, "image/jpeg");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-full p-2 bg-base-200">
        <DialogHeader>
          <DialogTitle>Crop your picture</DialogTitle>
        </DialogHeader>

        {/* Cropper Area */}
        <div className="relative h-[70vh] w-full bg-base-200">
          <Cropper
            ref={cropperRef}
            src={src}
            className="w-full h-full"
            stencilProps={{ aspectRatio: initialAspectRatio, grid: true }}
            stencilComponent={CircleStencil}
          />
        </div>

        {/* Footer */}
        <DialogFooter className="flex sm:justify-between flex-row w-full items-center">
          <div className="join ">
            <Button
              title="Rotate"
              onClick={handleRotate}
              className="join-item border-r border-base-content/50"
              library="daisy"
              variant={"secondary"}
            >
              <RotateCw />
            </Button>
            <Separator
              orientation="vertical"
              className="border-base-content/50 join-item p-0 m-0 w-0.5"
            />
            <Button
              title="Flip"
              onClick={handleFlip}
              className="join-item"
              library="daisy"
              variant={"secondary"}
            >
              <FlipHorizontal />
            </Button>
          </div>

          <div className="flex gap-2">
            <DialogClose asChild>
              <Button library="daisy" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              library="daisy"
              variant="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Done"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
