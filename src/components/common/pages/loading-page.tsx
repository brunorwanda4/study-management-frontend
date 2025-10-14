"use client";
import MyImage from "@/components/common/myImage";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  details?: string;
  className?: string;
  imageClassName?: string;
}

const LoadingPage = ({ title, details, className, imageClassName }: Props) => {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <div className="flex flex-col items-center">
        <MyImage
          className={cn("h-54 w-96", imageClassName)}
          src="/png/loading.png"
          classname={cn("object-contain")}
        />

        <div className="mt-4 space-y-2 text-center">
          <h4 className="text-lg font-medium">{title || "Loading..."}</h4>

          {details && <p className="text-sm text-gray-500">{details}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
