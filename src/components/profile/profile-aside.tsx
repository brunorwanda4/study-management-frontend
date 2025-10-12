import { Locale } from "@/i18n";
import { userImage } from "@/lib/context/images";
import { UserModel } from "@/lib/schema/user/user-schema";
import { Phone, User } from "lucide-react";
import { FaSchool } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import MyImage from "../common/myImage";
import MyLink from "../common/myLink";
import { Separator } from "../ui/separator";

interface props {
  lang: Locale;
  user: UserModel;
}

const ProfileAside = ({ lang, user }: props) => {
  return (
    <aside className="w-1/3 space-y-4">
      <div className="flex flex-col space-y-2">
        <MyImage
          className="size-64 w-full"
          role="AVATAR"
          src={user.image || userImage}
        />
        <div className="flex flex-col space-y-2">
          <MyLink
            type="button"
            classname=" w-full"
            loading
            button={{ variant: "info", library: "daisy" }}
            href={`/${lang}/setting/profile`}
          >
            Edit Profile
          </MyLink>
          <h3 className="basic-title">{user.username}</h3>
          <span className="link-hover">@ {user.username}</span>
          <div className="flex space-x-1">
            <User size={18} /> <span className="font-medium">{user.role}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MdEmail size={16} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={16} />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaSchool size={16} />
            {/* <span>{user.school?.name}</span> */}
          </div>
          {/* {user.cls && (
            <div className="flex items-center space-x-2">
              <MdClass size={16} />
              <span>{user.cls.name}</span>
            </div>
          )} */}
        </div>
        <p className="mt-4">{user.bio}</p>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="basic-title">Social accounts</h4>
        <div className="flex items-center space-x-2">
          <MyImage src="/icons/instagram.png" role="ICON" />
          <span>bruno_rwanda</span>
        </div>
        <div className="flex items-center space-x-2">
          <MyImage src="/icons/facebook.png" role="ICON" />
          <span>bruno rwanda</span>
        </div>
        <div className="flex items-center space-x-2">
          <MyImage src="/icons/twitter.png" role="ICON" />
          <span>bruno_rwanda4</span>
        </div>
        <div className="flex items-center space-x-2">
          <MyImage src="/icons/youtube.png" role="ICON" />
          <span>bruno_rwanda_132</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="basic-title">Location</h4>
        <div>
          <div className="flex space-x-2">
            <span className=" ">Country:</span>
            <div className="flex items-center space-x-1">
              <MyImage src="/icons/rwanda.png" role="ICON" />
              <span>{user.address?.country}</span>
            </div>
          </div>
          <div className="space-x-2">
            <span>Province:</span>
            <span>{user.address?.province}</span>
          </div>
          <div className="space-x-2">
            <span>District:</span>
            <span>{user.address?.district}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileAside;
