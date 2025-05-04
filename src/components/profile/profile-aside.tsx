import React from "react";
import MyImage from "../myComponents/myImage";
import { Phone, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { FaSchool } from "react-icons/fa6";
import { MdClass, MdEmail } from "react-icons/md";
import MyLink from "../myComponents/myLink";
import { Locale } from "@/i18n";
import { userAndOther} from "@/lib/schema/user/user.dto";
import { userImage } from "@/lib/context/images";

interface props {
  lang: Locale;
 user : userAndOther

}

const ProfileAside = ({ lang, user }: props) => {
  return (
    <aside className=" space-y-4 w-1/3">
      <div className=" flex flex-col space-y-2">
        <MyImage className=" size-64 w-full" role="AVATAR" src={user.image || userImage} />
        <div className=" flex flex-col space-y-2">
          <MyLink
            type="button"
            classname=" w-full"
            loading
            button={{ variant: "primary", library: "daisy" }}
            href={`/${lang}/setting/profile`}
          >
            Edit Profile
          </MyLink>
          <h3 className=" basic-title">{user.username}</h3>
          <span className=" link-hover">@ {user.username}</span>
          <div className=" flex space-x-1">
            <User size={18} /> <span className=" font-medium">{user.role}</span>
          </div>
          <div className=" flex items-center space-x-2">
            <MdEmail size={16} />
            <span>{user.email}</span>
          </div>
          <div className=" flex items-center space-x-2">
            <Phone size={16} />
            <span>{user.phone}</span>
          </div>
          <div className=" flex items-center space-x-2">
            <FaSchool size={16} />
            <span>{user.school?.name}</span>
          </div>
          {user.cls && <div className=" flex items-center space-x-2">
            <MdClass size={16} />
            <span>{user.cls.name}</span>
          </div>}
        </div>
        <p className=" mt-4">
          {user.bio}
        </p>
      </div>
      <Separator />
      <div className=" space-y-2">
        <h4 className=" basic-title">Social accounts</h4>
        <div className=" flex space-x-2 items-center">
          <MyImage src="/icons/instagram.png" role="ICON" />
          <span>bruno_rwanda</span>
        </div>
        <div className=" flex space-x-2 items-center">
          <MyImage src="/icons/facebook.png" role="ICON" />
          <span>bruno rwanda</span>
        </div>
        <div className=" flex space-x-2 items-center">
          <MyImage src="/icons/twitter.png" role="ICON" />
          <span>bruno_rwanda4</span>
        </div>
        <div className=" flex space-x-2 items-center">
          <MyImage src="/icons/youtube.png" role="ICON" />
          <span>bruno_rwanda_132</span>
        </div>
      </div>
      <Separator />
      <div className=" space-y-2">
        <h4 className=" basic-title">Location</h4>
        <div>
          <div className=" flex space-x-2">
            <span className=" ">Country:</span>
            <div className=" flex items-center space-x-1">
              <MyImage src="/icons/rwanda.png" role="ICON" />
              <span>{user.address?.country}</span>
            </div>
          </div>
          <div className=" space-x-2">
            <span>Province:</span>
            <span>{user.address?.province}</span>
          </div>
          <div className=" space-x-2">
            <span>District:</span>
            <span>{user.address?.district}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileAside;
