"use client";
import MyLink from "@/components/common/myLink";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Time } from "@internationalized/date";

interface SmallClassTimeTableProps {
  timetable?: any;
}

const SmallClassTimeTable = ({ timetable }: SmallClassTimeTableProps) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return (
    <Card>
      <CardHeader className=" flex justify-between items-center">
        <CardTitle>Class Time Table</CardTitle>
        <Select>
          <SelectTrigger
            className={cn(
              "w-fit",
              buttonVariants({
                library: "daisy",
                variant: "outline",
                size: "sm",
              }),
            )}
          >
            <SelectValue placeholder="Monday" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem
                key={day}
                value={day}
                className=" capitalize justify-start flex items-start"
              >
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className=" space-y-2 flex flex-col">
        <Label className=" text-base-content/50">Morning lessons</Label>
        {[...Array(3)].map((_, i) => {
          return (
            <div key={i}>
              <Item
                variant={"muted"}
                className={cn(" p-2", i === 1 && "border border-info")}
              >
                <ItemHeader className=" flex flex-row justify-between">
                  <ItemTitle>Subject name</ItemTitle>
                  <span className="">9: 00 am</span>
                </ItemHeader>
                <ItemContent>
                  <div className=" flex flex-col gap-1">
                    {[...Array(2)].map((_, i) => {
                      return (
                        <Item key={i} className={cn(" p-2 bg-error/10")}>
                          <ItemContent className="  flex justify-between flex-row">
                            <div className=" flex flex-col justify-around">
                              <p>Subject name</p>
                              <p className=" ">Home work</p>
                            </div>
                            <span>Submitted on 9: 20 AM</span>
                          </ItemContent>
                        </Item>
                      );
                    })}
                    <MyLink
                      href=""
                      button={{
                        library: "daisy",
                        size: "sm",
                        className: " w-full",
                        variant: "ghost",
                      }}
                      className=" w-full justify-center flex"
                    >
                      2 More class work
                    </MyLink>
                  </div>
                </ItemContent>
              </Item>
            </div>
          );
        })}
        {/*break time*/}
        <Item className=" border p-2 bg-base-content/20">
          <ItemHeader className=" flex justify-between items-center flex-row">
            <ItemTitle>Break time</ItemTitle>
            <span className="">10: 20 am</span>
          </ItemHeader>
        </Item>
        {[...Array(3)].map((_, i) => {
          return (
            <div key={i}>
              <Item variant={"muted"} className={cn(" p-2")}>
                <ItemHeader className=" flex flex-row justify-between">
                  <ItemTitle>Subject name</ItemTitle>
                  <span className="">9: 00 am</span>
                </ItemHeader>
              </Item>
            </div>
          );
        })}
        <Label className=" text-base-content/50">Afternoon lessons</Label>
        <Item className=" border p-2 bg-info/20">
          <ItemHeader className=" flex justify-between items-center flex-row">
            <ItemTitle>Lunch time</ItemTitle>
            <span className="">1: 00 pm</span>
          </ItemHeader>
        </Item>
        {[...Array(2)].map((_, i) => {
          return (
            <div key={i}>
              <Item variant={"muted"} className={cn(" p-2")}>
                <ItemHeader className=" flex flex-row justify-between">
                  <ItemTitle>Subject name</ItemTitle>
                  <span className="">9: 00 am</span>
                </ItemHeader>
              </Item>
            </div>
          );
        })}
        <Item className=" border p-2 bg-base-content/20">
          <ItemHeader className=" flex justify-between items-center flex-row">
            <ItemTitle>Break time</ItemTitle>
            <span className="">3: 00 pm</span>
          </ItemHeader>
        </Item>
        {[...Array(2)].map((_, i) => {
          return (
            <div key={i}>
              <Item variant={"muted"} className={cn(" p-2")}>
                <ItemHeader className=" flex flex-row justify-between">
                  <ItemTitle>Subject name</ItemTitle>
                  <span className="">9: 00 am</span>
                </ItemHeader>
                <ItemContent>
                  <div className=" flex flex-col gap-1">
                    {[...Array(2)].map((_, i) => {
                      return (
                        <Item key={i} className={cn(" p-2 bg-error/10 ")}>
                          <ItemContent className="  flex justify-between flex-row">
                            <div className=" flex flex-col justify-around">
                              <p>Subject name</p>
                              <p className=" ">Home work</p>
                            </div>
                            <span>Submitted on 9: 20 AM</span>
                          </ItemContent>
                        </Item>
                      );
                    })}
                    <MyLink
                      href=""
                      button={{
                        library: "daisy",
                        size: "sm",
                        className: " w-full",
                        variant: "ghost",
                      }}
                      className=" w-full justify-center flex"
                    >
                      2 More class work
                    </MyLink>
                  </div>
                </ItemContent>
              </Item>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SmallClassTimeTable;
