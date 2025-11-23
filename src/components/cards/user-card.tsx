import { UserModel } from "@/lib/schema/user/user-schema";
import MyAvatar from "../common/image/my-avatar";
import MyLink from "../common/myLink";
import type { Gender } from "@/lib/schema/common-details-schema";

export interface UserSmCardProps {
  name: string;
  image?: string;
  link?: string;
  gender?: Gender;
  role?: string;
}

export const UserSmCard = ({
  name,
  image,
  gender,
  link,
  role,
}: UserSmCardProps) => {
  const Image = <MyAvatar src={image} size="sm" alt={name} />;
  return (
    <div className="flex space-x-2 items-center">
      {link ? <MyLink href={link}>{Image}</MyLink> : Image}
      <div className=" flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <p className=" gap-2 leading-4">{name} </p>
          {gender && (
            <span className=" text-sm text-base-content/50">{gender}</span>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center">
          {role && (
            <span className=" text-sm text-base-content/50">{role}</span>
          )}
        </div>
      </div>
    </div>
  );
};
