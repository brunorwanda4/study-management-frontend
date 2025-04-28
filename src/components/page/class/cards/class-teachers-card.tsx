import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n";
import React from "react";
import { BsGear, BsPlusCircle } from "react-icons/bs";

interface props {
  lang: Locale;
  clsId: string;
}

const ClassTeacherCard = ({ lang, clsId }: props) => {
  return (
    <Card>
      <CardHeader className=" flex justify-between">
        <CardTitle>Teachers</CardTitle>
        <Button variant={"primary"} library="daisy" size={"sm"}>
          <BsPlusCircle /> Add Teacher
        </Button>
      </CardHeader>
      <CardContent className=" px-2">
        {[...Array(5)].map((_, index) => {
          return (
            <div
              key={index}
              className=" flex w-full justify-between hover:bg-base-300 card flex-row duration-200 p-2"
            >
              <div className=" flex space-x-2">
                <MyLink loading href={`/${lang}/p/t/${index}`}>
                  <MyImage
                    role="AVATAR"
                    src="/images/p.jpg"
                    className=" size-12"
                    classname=" mask mask-squircle"
                  />
                </MyLink>
                <div>
                  <MyLink loading href={`/${lang}/p/t/${index}`} className=" small-title">Teacher name</MyLink>
                  <div> <MyLink href={`/${lang}/c/${clsId}/s`}>Kinyarwanda</MyLink>, english, Kiswahili</div>
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
