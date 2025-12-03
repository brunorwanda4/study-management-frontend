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

export const AllFormErrors = ({ errors }: { errors: any }) => {
    const flatErrors = Object.values(errors).flatMap((err: any) => {
      if (!err) return [];
      if (Array.isArray(err)) return err.map((e) => e.message);
      if (err.message) return [err.message];
      return [];
    });

    if (flatErrors.length === 0) return null;

    return (
      <div className="bg-base-300 border border-red-300 text-red-700 p-3 rounded-lg space-y-1">
        {flatErrors.map((msg, i) => (
          <p key={i} className="text-sm">• {msg}</p>
        ))}
      </div>
    );
  };
