import { cn } from "@/lib/utils";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";

interface Props {
  message?: string | null;
  className?: string | null;
}

export const FormError = ({ message, className }: Props) => {
  if (!message) return null;
  return (
    <div
      className={cn("bg-error/10 border-error border-l-2 px-1 py-2", className)}
    >
      <div className="text-error flex gap-3 text-sm">
        <IoIosWarning size={20} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export const FormSuccess = ({ message, className }: Props) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        "text-success bg-success/10 border-success flex gap-3 border-l-2 px-1 py-2 text-sm",
        className,
      )}
    >
      <CiCircleCheck size={20} />
      <span>{message}</span>
    </div>
  );
};
