"use client";
import { UserSmCard } from "@/components/cards/user-card";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isToday,
  startOfWeek,
} from "date-fns";
import { useMemo } from "react";

function ClassTImetable() {
  const currentDate = new Date();
  const days = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);

  function addMinutesToTime(timeStr: string, minutes: number) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, mins] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins + minutes);

    let h = date.getHours();
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    if (h === 0) h = 12;

    const m = date.getMinutes().toString().padStart(2, "0");

    return `${h}:${m} ${ampm}`;
  }

  return (
    <div className=" min-h-screen p-8 ">
      <div className=" bg-base-100 p-8">
        <div className="sticky top-0 z-30 grid grid-cols-8  bg-background/80 backdrop-blur-md">
          <div className="py-2 text-center text-sm text-muted-foreground/70">
            <span className="max-[479px]:sr-only">
              {format(new Date(), "O")}
            </span>
          </div>

          {days.map((day) => (
            <div
              key={day.toString()}
              data-today={isToday(day) || undefined}
              className="py-2 text-center text-sm text-muted-foreground/70 data-today:font-medium data-today:text-foreground"
            >
              <span aria-hidden className="sm:hidden">
                {format(day, "E")[0]} {format(day, "d")}
              </span>
              <span className="max-sm:hidden">{format(day, "EEE dd")}</span>
            </div>
          ))}
        </div>
        {/* main table */}
        <div className=" grid grid-cols-8 gap-0 ">
          {[...Array(13 * 8)].map((_, idx) => {
            if (idx % 8 === 0) {
              const minutesToAdd = (idx / 8) * 40;
              const time = addMinutesToTime("9:00 AM", minutesToAdd);

              return (
                <div
                  key={idx}
                  className="items-start p-2 border border-base-content/50 h-32 w-full flex flex-col justify-end"
                >
                  <span>{time}</span>
                </div>
              );
            }

            return <div key={idx}>Hello</div>;
          })}

          {/* Time */}
          <div className=" items-start p-2 border border-base-content/50 h-32 w-full flex flex-col justify-end">
            <span> 9:00 AM</span>
          </div>
          {/* Subject */}
          <div
            title="3:00 AM - 3:40 AM"
            className=" gap-0.5 items-start px-2 border border-base-content/50 h-32 w-full flex flex-col"
          >
            <p className=" text-base font-medium mb-1">Subject name</p>
            <UserSmCard
              name="TN"
              avatarProps={{ size: "2xs" }}
              className=" text-sm line-clamp-1"
              classname=" gap-1 leading-1"
            />
            <div className=" w-full mt-1 flex flex-col gap-1">
              <div className=" flex card px-2 bg-amber-600/20 p-1 w-full flex-row justify-between text-sm">
                <span title="Subject name" className=" font-medium">
                  SN{" "}
                </span>
                <span title="Activity type"> HM </span>
              </div>
              <div className=" flex card bg-info/20 text-center p-1 w-full flex-row justify-center text-sm">
                View more (2)
              </div>
            </div>
          </div>
          {/* free time */}
          <div
            title="3:00 AM - 3:40 AM"
            className=" bg-base-content/10 p-2 flex-col border border-base-content/50 h-32 w-full flex justify-center items-center"
          >
            <span className=" font-medium">Free time</span>
            <p
              title="  Free time description wny needed"
              className=" text-sm text-center line-clamp-2"
            >
              Free time description wny needed
            </p>
            <div className=" "></div>
          </div>
          {/* Break time */}
          <div
            title="3:00 AM - 3:40 AM"
            className=" bg-base-content/20 p-2 flex-col border border-base-content/50 h-32 w-full flex justify-center items-center"
          >
            <span className=" font-medium">Break time</span>
            <div className=" "></div>
          </div>
          {/* Lunch time */}
          <div
            title="3:00 AM - 3:40 AM"
            className=" bg-primary/20 p-2 flex-col border border-base-content/50 h-32 w-full flex justify-center items-center"
          >
            <span className=" font-medium">Lunch time</span>
            <div className=" "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassTImetable;
