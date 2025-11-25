"use client";

import ImageEditorDialog from "@/components/common/dialog/image-editor-dialog";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);

  // ORIGINAL IMAGE
  const [imageSrc, setImageSrc] = useState("/images/3.jpg");

  // UPDATED CROPPED IMAGE (Blob URL)
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);

  // Handle editor completion
  const handleComplete = (blob: Blob | null) => {
    if (!blob) return;

    const newUrl = URL.createObjectURL(blob);

    // Save the new image
    setCroppedUrl(newUrl);

    // Close dialog
    setOpen(false);
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      <button
        type="button"
        className="btn btn-primary w-40"
        onClick={() => setOpen(true)}
      >
        Open Editor
      </button>

      {/* Show Updated Image */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Updated Image Preview</h2>
        <img
          src={croppedUrl || imageSrc}
          alt="Preview"
          className="rounded-xl border w-[300px] h-auto"
        />
      </div>

      <ImageEditorDialog
        open={open}
        onOpenChange={setOpen}
        src={croppedUrl || imageSrc} // always show latest
        onComplete={handleComplete}
      />
    </div>
  );
}
