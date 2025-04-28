import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n";
import React from "react";
import { BsGear, BsPlusCircle } from "react-icons/bs";

interface props {
  lang : Locale
}

const ClassStudentCard = ({} : props) => {
  return (
    <Card>
      <CardHeader className=" flex justify-between">
        <CardTitle>Students</CardTitle>
        <Button variant={"primary"} library="daisy" size={"sm"}>
          <BsPlusCircle /> Add Teacher
        </Button>
      </CardHeader>
      <CardContent className=" px-2">
        {[...Array(9)].map((_, index) => {
          return (
            <div
              key={index}
              className=" flex w-full justify-between hover:bg-base-300 card flex-row duration-200 p-2"
            >
              <div className=" flex space-x-2">
                <MyImage
                  role="AVATAR"
                  src="/images/p.jpg"
                  className=" size-12"
                  classname=" mask mask-squircle"
                />
                <div>
                  <span className=" small-title">Teacher name</span>
                  <p>Male</p>
                </div>
              </div>
              <Button shape={"circle"} library="daisy" variant={"ghost"}>
                <BsGear size={24} />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ClassStudentCard;
