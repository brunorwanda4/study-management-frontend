import React from "react";
import MyImage from "../myComponents/myImage";
import {  User } from "lucide-react";
import { Separator } from "../ui/separator";
import { FaSchool } from "react-icons/fa6";

const ProfileAside = () => {
  return (
    <aside className=" space-y-4">
      <div className=" flex flex-col space-x-2">
        <MyImage className=" size-60" role="AVATAR" src={"/images/p.jpg"} />
        <div className=" flex flex-col">
          <h3 className=" basic-title">User name</h3>
          <span className=" link-hover">@ username</span>
          <div className=" flex space-x-1">
            <User size={18} /> <span className=" font-medium">Student</span>
          </div>
          <span> example@mail.com</span>
          <span>0788765239</span>
          <div className=" flex items-center space-x-2">
            <FaSchool size={16} />
            <span>excella high school</span>
          </div>
        </div>
        {/* location */}
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
              <span>Rwanda</span>
            </div>
          </div>
          <div className=" space-x-2">
            <span>Province:</span>
            <span>Kigali</span>
          </div>
          <div className=" space-x-2">
            <span>District:</span>
            <span>Gasabo</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileAside;
