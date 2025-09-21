"use client";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { isString } from "@tiptap/react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FaRotate } from "react-icons/fa6";

interface Props {
  images: string | string[];
  className?: string;
  classname?: string;
  ClassName?: string;
  open?: boolean; // keep original
  isAvatar?: boolean;
  initialIndex?: number; // 👈 NEW
  onClose?: () => void; // 👈 NEW
}

const OpenImages = ({
  images,
  ClassName,
  open,
  className,
  classname,
  isAvatar,
  initialIndex = 0,
  onClose,
}: Props) => {
  const [imageIndex, setImageIndex] = useState<number>(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(3);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(open ?? false);

  // sync open with parent
  useEffect(() => {
    if (typeof open === "boolean") {
      setIsOpen(open);
    }
  }, [open]);

  // set initial index when provided
  useEffect(() => {
    if (typeof initialIndex === "number") {
      setImageIndex(initialIndex);
    }
  }, [initialIndex]);

  // reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(3);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      if (onClose) onClose(); // 👈 notify parent
    }
  }, [isOpen, imageIndex, onClose]);

  // keyboard nav
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "+":
        case "=":
          setZoomLevel((prev) => Math.min(prev + 0.25, 6));
          break;
        case "-":
          setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
          break;
        case "r":
          setRotation((prev) => (prev + 90) % 360);
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleDownload = () => {
    if (!images || (Array.isArray(images) && images.length === 0)) return;
    const link = document.createElement("a");
    link.href = Array.isArray(images) ? images[imageIndex] : images;
    link.download = `image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) setZoomLevel((prev) => Math.min(prev + 0.1, 6));
    else setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   if (zoomLevel <= 1) return;
  //   setIsDragging(true);
  //   setPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  // };

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (!isDragging || zoomLevel <= 1) return;
  //   setPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  // };

  const handleMouseUp = () => setIsDragging(false);

  // --- Single image case ---
  if (isString(images)) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <MyImage
            role={isAvatar ? "AVATAR" : undefined}
            className={cn("cursor-pointer", className)}
            classname={classname}
            src={images}
            onClick={() => setIsOpen(true)}
          />
        </DialogTrigger>
        <DialogContent className="h-[90vh] overflow-hidden p-0 sm:max-w-3xl">
          <div className="relative flex h-full w-full items-center justify-center">
            <MyImage
              src={images}
              className="h-full w-full"
              classname="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (images.length === 0) return null;

  // multiple images case
  const handleOpen = (index: number) => {
    setIsOpen(true);
    setImageIndex(index);
  };

  const initialItemsToShow = 4;
  const prevImage = () =>
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const resetTransformations = () => {
    setZoomLevel(3);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2",
        className,
        initialIndex && "block gap-0",
      )}
    >
      {!initialIndex &&
        images.slice(0, initialItemsToShow).map((item, index) => {
          if (
            index + 1 === initialItemsToShow &&
            images.length - initialItemsToShow !== 0
          )
            return (
              <div
                key={index}
                className={cn("relative h-24 w-full", classname)}
              >
                <MyImage
                  onClick={() => handleOpen(index)}
                  src={item}
                  className={cn("h-full w-full cursor-pointer", classname)}
                  classname="rounded-2xl"
                />
                <div
                  onClick={() => handleOpen(initialItemsToShow - 1)}
                  className={cn(
                    "absolute top-0 z-20 grid h-24 w-full cursor-pointer place-content-center rounded-2xl bg-black/50",
                    classname,
                  )}
                >
                  <span className="text-lg text-white">
                    + {images.length - initialItemsToShow} more
                  </span>
                </div>
              </div>
            );
          return (
            <MyImage
              onClick={() => handleOpen(index)}
              src={item}
              key={index}
              className={cn("h-24 w-full cursor-pointer", classname)}
              classname="rounded-2xl"
            />
          );
        })}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="h-[95vh] overflow-hidden p-0 sm:max-w-6xl"
          onInteractOutside={resetTransformations}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 z-50 flex flex-row-reverse gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleDownload}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={resetTransformations}
              className="bg-background/80 backdrop-blur-sm"
            >
              <FaRotate />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setZoomLevel((p) => Math.min(p + 0.25, 6))}
              className="bg-background/80 backdrop-blur-sm"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setZoomLevel((p) => Math.max(p - 0.25, 0.5))}
              className="bg-background/80 backdrop-blur-sm"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setRotation((p) => (p + 90) % 360)}
              className="bg-background/80 backdrop-blur-sm"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <Button
            onClick={prevImage}
            variant="ghost"
            className="bg-background/50 absolute top-1/2 left-2 z-20 backdrop-blur-sm"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={nextImage}
            variant="ghost"
            className="bg-background/50 absolute top-1/2 right-2 z-20 backdrop-blur-sm"
          >
            <ChevronRight />
          </Button>

          {/* Main Image */}
          <div className="flex h-full flex-col">
            <div
              className="relative flex flex-1 items-center justify-center overflow-hidden"
              onWheel={handleWheel}
              // onMouseDown={handleMouseDown}
              // onMouseMove={handleMouseMove}
              // onMouseUp={handleMouseUp}
              // onMouseLeave={handleMouseUp}
            >
              <div
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: isDragging ? "none" : "transform 0.2s ease",
                }}
                className="will-change-transform"
              >
                <MyImage
                  src={images[imageIndex]}
                  className="max-h-full max-w-full"
                  classname="object-contain"
                />
              </div>

              {zoomLevel > 1 && (
                <div className="bg-background/80 absolute bottom-4 left-4 rounded-md px-3 py-1 text-sm backdrop-blur-sm">
                  Zoom: {Math.round(zoomLevel * 100)}%
                </div>
              )}
            </div>

            <div className="bg-background/80 border-t p-3 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {imageIndex + 1} of {images.length}
                </span>
              </div>

              <div className="flex w-full justify-center gap-2 overflow-x-auto pb-2">
                {images.map((item, index) => (
                  <MyImage
                    onClick={() => {
                      setImageIndex(index);
                      resetTransformations();
                    }}
                    src={item}
                    key={index}
                    className={cn(
                      "size-8 flex-shrink-0 cursor-pointer rounded-md md:size-14 md:rounded-lg",
                      imageIndex === index && "border-primary border-2",
                    )}
                    classname="rounded-md md:rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenImages;
