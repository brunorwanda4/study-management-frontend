
import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

interface props {
    lang: Locale;
    title: string;
    total: number;
    Ftotal: number;
    Mtotal: number;
    role: string;
  }
  
   
  
 export const StaffPeople = ({ lang, total, Ftotal, Mtotal, title, role }: props) => {
    return (
      <div className=" happy-card p-0">
        <div className=" flex justify-between px-4 py-2 border-b border-b-border">
          <div className="   flex gap-2 space-x-1 items-center">
            <MyImage className=" size-6" src="/icons/group.png" />
            <h5 className=" basic-title text-my">{title}</h5>
          </div>
          <Button size="sm" variant="ghost"  >
            <BsThreeDots />
          </Button>
        </div>
        <div className=" p-4 flex flex-col space-y-4">
          <div className=" flex items-center space-x-4">
            <div className=" font-semibold text-3xl" >{total}</div>
            <Link
              href={`/${lang}/school-staff/people`}
              className=" font-medium link-hover text-myGray text-sm"
            >
              {role}{" "}
            </Link>
          </div>
          {/* school members */}
          <div className=" space-x-4 flex ">
            <Button size="sm" className=" px-1">
              <span className="  text-xl font-medium">{Mtotal}</span>
              <span className=" text-sm font-normal">Males</span>
            </Button>
            <Button size="sm" className=" px-1">
              <span className="  text-xl font-medium">{Ftotal}</span>
              <span className=" text-sm font-normal">Females</span>
            </Button>
            
          </div>
        </div>
      </div>
    );
  };