import { cn } from "@/lib/utils";
import MyAvatar, { type MyAvatarProps } from "./my-avatar";

// Define the shape of a single avatar item based on your existing props

interface AvatarGroupProps {
  items: Pick<MyAvatarProps, "alt" | "src" | "role">[];
  limit?: number;
  size?: "default" | "lg" | "sm" | "xl" | "xs" | "2xl" | "2xs";
  type?: "squircle" | "square" | "cycle";
  className?: string;
}

const MyAvatarGroup = ({
  items,
  limit = 3,
  size = "default",
  type = "squircle",
  className,
}: AvatarGroupProps) => {
  // 1. Separate visible items from the hidden count
  const visibleItems = items.slice(0, limit);
  const remainingCount = items.length - limit;

  // 2. Size classes logic (Replicated from MyAvatar for the counter circle)
  const counterSizeClasses =
    size === "default"
      ? "size-14 text-base min-h-14 min-w-14"
      : size === "lg"
        ? "size-20 text-xl min-h-20 min-w-20"
        : size === "xl"
          ? "size-24 text-2xl min-h-24 min-w-24"
          : size === "2xl"
            ? "size-32 text-3xl min-h-32 min-w-32"
            : size === "sm"
              ? "size-10 text-sm min-h-10 min-w-10"
              : size === "xs"
                ? "size-8 text-xs min-h-8 min-w-8"
                : size === "2xs"
                  ? "size-6 text-xs min-h-6 min-w-6"
                  : "size-12 text-sm min-h-12 min-w-12";

  // 3. Shape classes (Replicated for consistency)
  const shapeClasses =
    type === "squircle"
      ? "mask mask-squircle"
      : type === "square"
        ? "rounded-md" // Changed 'card' to rounded-md for generic usage
        : "rounded-full";

  return (
    <div
      className={cn(
        "flex items-center -space-x-4 rtl:space-x-reverse", // -space-x-4 creates the overlap
        size === "2xs" && " -space-x-2",
        className,
      )}
    >
      {visibleItems.map((item, index) => (
        <div
          key={index}
          // zIndex logic: high index for first items creates "Left on Top" effect
          style={{ zIndex: visibleItems.length + index + 1 }}
          className="transition-transform hover:scale-110 hover:z-50"
        >
          <MyAvatar
            {...item}
            size={size}
            type={type}
            // Add a ring/border matching the background color to create the "cutout" effect
            className=" ring-base-content/50 ring"
          />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center font-bold text-base-content  z-20 bg-base-300  ring-1 ring-base-content/50",
            counterSizeClasses,
            shapeClasses,
          )}
          style={{ zIndex: 10 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default MyAvatarGroup;
