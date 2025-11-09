import MyImage from "@/components/common/myImage";
import type { Gender, userRole } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import { getInitialsUsername } from "@/lib/utils/generate-username";

interface Props {
  role?: { role?: userRole | null; gender?: Gender | null };
  type?: "squircle" | "square" | "cycle";
  size?: "default" | "lg" | "sm" | "xl" | "xs";
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
}: Props) => {
  // ✅ size classes
  const class_size =
    size === "default"
      ? "size-14 text-base"
      : size === "lg"
        ? "size-20 text-xl"
        : size === "xl"
          ? "size-24 text-2xl"
          : size === "sm"
            ? "size-10 text-sm"
            : size === "xs"
              ? "size-8 text-xs"
              : "size-12 text-sm";

  // ✅ type shape classes
  const class_type =
    type === "squircle"
      ? "mask mask-squircle"
      : type === "square"
        ? "card"
        : "rounded-full";

  // ✅ initials (2 or 3 uppercase letters depending on isSubClass)

  // ✅ deterministic HSL color from text (so “Bukara” ≠ “Baraksa”)
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

  // ✅ fallback images for known roles
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

  // ✅ CASE 1: When alt (name) exists but no src/role
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

  // ✅ CASE 2: When image or role is available
  if (role || src) {
    return (
      <MyImage
        src={src || getDefaultImage()}
        alt={alt || "User avatar"}
        className={cn(class_size, className)}
        classname={cn(class_type, classname)}
      />
    );
  }

  // ✅ CASE 3: When nothing is provided (generate random avatar)
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
