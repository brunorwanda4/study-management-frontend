import type { Gender } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import MyAvatar, { type MyAvatarProps } from "../common/image/my-avatar";
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
  showModify?: boolean;
  className?: string;
  classname?: string;
  onlyImage?: boolean;
  onlyName?: boolean;
  avatarProps?: MyAvatarProps;
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
  showModify,
  className,
  classname,
  onlyImage,
  onlyName,
  avatarProps = {
    size: "sm",
  },
}: UserSmCardProps) => {
  const Image = <MyAvatar {...avatarProps} src={image} alt={name} />;

  if (onlyName) {
    return (
      <div className={cn(className)}>
        <p className=" gap-2 leading-4">{name} </p>
      </div>
    );
  }

  if (onlyImage) {
    return <div className={cn(className)}>{Image}</div>;
  }

  return (
    <div
      className={cn(
        showMessage && " flex flex-row justify-between items-center",
        className,
      )}
    >
      <div className={cn("flex gap-2 items-center", classname)}>
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
        <div className=" flex flex-row gap-2 ">
          {showModify && (
            <MyLink
              href={""}
              loading
              button={{
                variant: "outline",
                library: "daisy",
                size: "sm",
              }}
            >
              Modify
            </MyLink>
          )}
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
