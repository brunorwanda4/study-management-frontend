import type { Gender } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import MyAvatar from "../common/image/my-avatar";
import MyLink from "../common/myLink";

export interface UserSmCardProps {
  name: string;
  image?: string;
  link?: string;
  gender?: Gender;
  role?: string;
  date?: string;
  subjects?: string[];
  showMessage?: boolean;
}

export const UserSmCard = ({
  name,
  image,
  gender,
  link,
  role,
  date,
  subjects,
  showMessage,
}: UserSmCardProps) => {
  const Image = <MyAvatar src={image} size="sm" alt={name} />;
  return (
    <div
      className={cn(
        showMessage && " flex flex-row justify-between items-center",
      )}
    >
      <div className="flex space-x-2 items-center">
        {link ? <MyLink href={link}>{Image}</MyLink> : Image}
        <div className=" flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <p className=" gap-2 leading-4">{name} </p>
            {gender && (
              <span className=" text-sm text-base-content/50">{gender}</span>
            )}
            {date && (
              <span className=" text-sm text-base-content/50">{date}</span>
            )}
          </div>
          <div className="flex flex-row gap-2 items-center">
            {role && (
              <span className=" text-sm text-base-content/50">{role}</span>
            )}
            {subjects && (
              <div className=" text-sm flex flex-row  gap-2text-base-content/50">
                Subjects: {subjects.join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>
      {showMessage && (
        <div>
          <MyLink
            href={""}
            loading
            button={{
              variant: "primary",
              library: "daisy",
              size: "sm",
              role: "message",
            }}
          >
            Message
          </MyLink>
        </div>
      )}
    </div>
  );
};
