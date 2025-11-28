import MyImage from "@/components/common/myImage";
import type { Gender, userRole } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import { getInitialsUsername } from "@/lib/utils/generate-username";

export interface MyAvatarProps {
  role?: { role?: userRole | null; gender?: Gender | null };
  type?: "squircle" | "square" | "cycle";
  size?: "default" | "lg" | "sm" | "xl" | "xs" | "2xl" | "2xs" | "3xl";
  src?: string | null;
  alt?: string | null;
  className?: string;
  classname?: string;
  isSubClass?: boolean;
}

const MyAvatar = ({
  role,
  type = "squircle",
  className,
  classname,
  size = "default",
  src,
  alt,
  isSubClass,
}: MyAvatarProps) => {
  const class_size =
    size === "default"
      ? "size-14 text-base min-h-14 min-w-14"
      : size === "lg"
        ? "size-20 text-xl min-h-20 min-w-20"
        : size === "xl"
          ? "size-24 text-2xl min-h-24 min-w-24"
          : size === "2xl"
            ? "size-32 text-3xl min-h-32 min-w-32"
            : size === "3xl"
              ? "size-44 text-4xl min-h-44 min-w-44"
              : size === "sm"
                ? "size-10 text-sm min-h-10 min-w-10"
                : size === "xs"
                  ? "size-8 text-xs min-h-8 min-w-8"
                  : size === "2xs"
                    ? "size-6 text-xs min-h-6 min-w-6"
                    : "size-12 text-sm min-h-12 min-w-12";

  const class_type =
    type === "squircle"
      ? "mask mask-squircle"
      : type === "square"
        ? "card"
        : "rounded-full";

  const getHslFromText = (text: string) => {
    if (!text) return "hsl(210 16% 24%)";
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash |= 0;
    }
    const hue = Math.abs(hash) % 360;
    const sat = 55 + (Math.abs(hash) % 15);
    const light = 40 + (Math.abs(hash >> 3) % 10);
    return `hsl(${hue} ${sat}% ${light}%)`;
  };

  const getDefaultImage = () => {
    if (!role?.role) return "/images/k.jpg";
    switch (role.role) {
      case "STUDENT":
        return role.gender === "MALE"
          ? "/images/students/male.jpg"
          : "/images/students/female.jpg";
      case "ADMIN":
        return role.gender === "MALE"
          ? "/images/staffs/male.jpg"
          : "/images/staffs/female.jpg";
      case "TEACHER":
        return role.gender === "MALE"
          ? "/images/teachers/male-teacher.jpg"
          : "/images/teachers/female-teacher.jpg";
      case "SCHOOLSTAFF":
        return role.gender === "MALE"
          ? "/images/staffs/male.jpg"
          : "/images/staffs/female.jpg";
      default:
        return "/images/k.jpg";
    }
  };

  if (!src && !role && alt) {
    const initials = getInitialsUsername(alt, isSubClass);
    const bg = getHslFromText(alt);

    return (
      <div
        className={cn(
          class_size,
          class_type,
          "flex items-center justify-center font-semibold text-white select-none uppercase",
          className,
        )}
        style={{ backgroundColor: bg }}
        title={alt}
      >
        {initials}
      </div>
    );
  }

  if (role || src) {
    return (
      <MyImage
        src={src || getDefaultImage()}
        alt={alt || "User avatar"}
        className={cn(class_size, class_type, className)}
        classname={cn(class_type, classname)}
      />
    );
  }

  const randomLetters = Array.from({ length: 2 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  ).join("");

  const bg = getHslFromText(randomLetters);

  return (
    <div
      className={cn(
        class_size,
        class_type,
        "flex items-center justify-center font-semibold text-white select-none uppercase",
        className,
      )}
      style={{ backgroundColor: bg }}
      title="Generated avatar"
    >
      {randomLetters}
    </div>
  );
};

export default MyAvatar;
