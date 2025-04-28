import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BsGear, BsPlusCircle } from "react-icons/bs";

const ClassTeacherCard = () => {
  return (
    <Card className=" w-1/2">
      <CardHeader className=" flex justify-between">
        <CardTitle>Teachers</CardTitle>
        <Button variant={"primary"} library="daisy" size={"sm"}>
          <BsPlusCircle /> Add Teacher
        </Button>
      </CardHeader>
      <CardContent className=" p-0">
        {[...Array(4)].map((_, index) => {
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
                  <p>Kinyarwanda, english, Kiswahili</p>
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

export default ClassTeacherCard;
