import { Dot, Mail, Phone } from "lucide-react";
 import { TiContacts } from "react-icons/ti";
import { TbSocial } from "react-icons/tb";
import Link from "next/link";
import MyImage from "@/components/myComponents/myImage";

const SchoolContacts = () => {
  return (
    <div className=" basic-card space-y-2">
      <div className=" flex space-x-2 items-center ">
        <TiContacts />
        <h3 className=" font-semibold capitalize">School contact</h3>
      </div>
      <div className=" space-y-2 ml-3">
        {/* phones */}
        <div>
          <div className=" flex space-x-2 items-center text-myGray">
            <Phone size={16} /> <h5 className=" font-medium">Phone number</h5>
          </div>
          <div className=" ml-2">
            <div className=" flex -space-x-1">
              <Dot />
              +250 792 537 274
            </div>
            <div className=" flex -space-x-1">
              <Dot />
              +250 788 720 946
            </div>
          </div>
        </div>
        {/* emails */}
        <div>
          <div className=" flex space-x-2 items-center text-myGray">
            <Mail size={16} /> <h5 className=" font-medium">Email</h5>
          </div>
          <div className=" ml-2">
            <div className=" flex -space-x-1">
              <Dot />
              myschool@gmail.com
            </div>
            <div className=" flex -space-x-1">
              <Dot />
              yourwmail@gmail.com
            </div>
            <div className=" flex -space-x-1">
              <Dot />
              otheremail134@gmail.com
            </div>
          </div>
        </div>
        {/* others */}
        <div>
          <div className=" flex space-x-2 items-center text-myGray">
            <TbSocial size={16} />{" "}
            <h5 className=" font-medium">Social accounts</h5>
          </div>
          <div className=" ml-2 space-y-1">
            <div className=" flex -space-x-1">
              <Dot />
              <Link href={`/profile`} className=" flex gap-2 items-center">
                <MyImage className=" size-5" src="/icons/youtube.png" />
                <span>hakorima Happy</span>
              </Link>
            </div>
            <div className=" flex -space-x-1">
              <Dot />
              <Link href={`/profile`} className=" flex gap-2 items-center">
                <MyImage className=" size-5" src="/icons/instagram.png" />
                <span>school_username</span>
              </Link>
            </div>
            <div className=" flex -space-x-1">
              <Dot />
              <Link href={`/profile`} className=" flex gap-2 items-center">
                <MyImage className=" size-5" src="/icons/facebook.png" />
                <span>username on account</span>
              </Link>
            </div>
            <div className=" flex -space-x-1">
              <Dot />
              <Link href={`/profile`} className=" flex gap-2 items-center">
                <MyImage className=" size-5" src="/icons/whatsapp.png" />
                <span>username on account</span>
              </Link>
            </div>
            <div className=" flex -space-x-1">
              <Dot />
              <Link href={`/profile`} className=" flex gap-2 items-center">
                <MyImage className=" size-5" src="/icons/slack.png" />
                <span>username on account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolContacts;
