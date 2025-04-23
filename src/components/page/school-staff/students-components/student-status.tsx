import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

interface props {
  lang: Locale;
  status: string
  role: string
}

 

const StudentStatus = ({  status, role }: props) => {
  return (
    <div className=" basic-card p-0">
      <div className=" flex justify-between px-4 py-2 border-b border-b-border">
        <div className="   flex gap-2 space-x-1 items-center">
          <MyImage className=" size-6" src="/icons/group.png" />
          <h5 className=" basic-title text-my">{status}</h5>
        </div>
        <Button library="daisy" size="sm" variant="ghost" shape="circle">
          <BsThreeDots />
        </Button>
      </div>
      <div className=" p-4 flex flex-col space-y-4">
        <div className=" flex justify-between ">
            <div className="flex items-center space-x-2">
                <span className="basic-title">Available space:</span>
                <div className=" font-semibold text-3xl" >40</div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="basic-title">Registered new {role}:</span>
                <div className=" font-semibold text-3xl">0</div>
            </div>
        </div>
        <div>
            <Button size="sm" className=" px-1">
                <span className="  text-xl font-medium">1000</span>
                <span className=" text-sm font-normal">Total</span>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentStatus;
