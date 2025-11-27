import { weekDays } from "@/lib/const/common-details-const";

const ClassMonthTimetablePage = () => {
  return (
    <div className="p-8 min-h-screen">
      <div className=" p-8 bg-base-100 w-full">
        <div className="grid grid-cols-7 border-border/70 border-b">
          {weekDays.map((day) => (
            <div
              className="py-2 text-center text-muted-foreground/70 text-sm"
              key={day}
            >
              {day}
            </div>
          ))}
        </div>
        {/* main month timetable */}
        <div className="grid flex-1 auto-rows-fr">
          <div className=" size-32 border border-base-content/50 p-2 flex flex-col">
            <span>1</span>
            <div className=" flex flex-col gap-1">
              <div className="flex flex-row justify-between px-1 bg-success/20 w-full">
                <span title="subject name" className=" text-sm line-clamp-1">
                  Subject name{" "}
                </span>
                <span title="Home work" className=" text-sm">
                  HM
                </span>
              </div>
              <div className="flex flex-row  justify-between bg-error/20 px-1 w-full">
                <span title="subject name" className=" text-sm line-clamp-1">
                  Subject name{" "}
                </span>
                <span className=" text-sm">TEST</span>
              </div>
              <div className="flex flex-row  justify-between bg-error/20 px-1 w-full">
                <span title="subject name" className=" text-sm line-clamp-1">
                  Subject name{" "}
                </span>
                <span className=" text-sm">TEST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassMonthTimetablePage;
