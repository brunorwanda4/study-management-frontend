"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
  className?: string;
  classname?: string;
  role?: "ICON" | "AVATAR";
}

const MyImage = ({
  src,
  alt = "Default alt text",
  className,
  classname,
  role,
}: Props) => {
  return (
    <div
      className={cn(
        "size-32 relative",
        role === "ICON" && " size-4",
        className
      )}
    >
      <Image
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
        src={src}
        alt={alt}
        className={cn(
          "object-cover",
          role === "AVATAR" && "mask mask-squircle",
          classname
        )}
        fill
        blurDataURL={`${src}?w=10&q=10`}
        quality={90}
        priority
        onError={(e) => (e.currentTarget.src = "/images/p.jpg")}
      />
    </div>
  );
};

export default MyImage;
