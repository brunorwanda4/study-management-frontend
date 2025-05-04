import MyImage from "@/components/myComponents/myImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n";
import { studentImage } from "@/lib/context/images";
import { studentsAndOther } from "@/lib/schema/school/student.dto";
import React from "react";
import { BsGear, BsPlusCircle } from "react-icons/bs";

interface props {
  lang : Locale
  student : studentsAndOther[]
}

const ClassStudentCard = ({ lang, student} : props) => {
  return (
    <Card>
      <CardHeader className=" flex justify-between">
        <CardTitle>Students</CardTitle>
        <Button variant={"primary"} library="daisy" size={"sm"}>
          <BsPlusCircle /> Add Student
        </Button>
      </CardHeader>
      <CardContent className=" px-2">
        {student.map((item) => {
          return (
            <div
              key={item.id}
              className=" flex w-full justify-between hover:bg-base-300 card flex-row duration-200 p-2"
            >
              <div className=" flex space-x-2">
                <MyImage
                  role="AVATAR"
                  src={item.image || studentImage}
                  className=" size-12"
                  classname=" mask mask-squircle"
                />
                <div>
                  <span className=" small-title">{item.name}</span>
                  <p>{item.gender}</p>
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
