import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import MyImage from "../myComponents/myImage";

const UserFavoriteSubjects = () => {
  return (
    <Card className=" w-full">
      <CardHeader>
        <CardTitle> Favorite Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" grid grid-cols-4 gap-2">
          <div className=" flex items-center flex-col card">
            <MyImage className=" size-14" src="/icons/math.png" />
            <span className=" font-medium">Mathematic</span>
          </div>
          <div className=" flex items-center flex-col card">
            <MyImage className=" size-14" src="/icons/english.png" />
            <span className=" font-medium">English</span>
          </div>
          <div className=" flex items-center flex-col card">
            <MyImage className=" size-14" src="/icons/rwanda.png" />
            <span className=" font-medium">Kinyarwanda</span>
          </div>
          <div className=" flex items-center flex-col card">
            <MyImage className=" size-14" src="/icons/globe.png" />
            <span className=" font-medium">Geography</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFavoriteSubjects;
