import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Define the days of the week
const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

// Define the timetable data
const timetableData = [
  {
    time: "8:30 - 9:10",
    Mon: { subject: "Math" },
    Tues: { subject: "Science" },
    Wed: { subject: "English" },
    Thurs: { subject: "Hist" },
    Fri: { subject: "Geo" },
  },
  {
    time: "9:10 - 9:50",
    Mon: { subject: "Math", isDouble: true },
    Tues: { subject: "Science" },
    Wed: { subject: "English", isDouble: true },
    Thurs: { subject: "Hist" },
    Fri: { subject: "Art" },
  },
  {
    time: "9:50 - 10:30",
    Mon: { subject: "Physics" },
    Tues: { subject: "Lite" },
    Wed: { subject: "Comp" },
    Thurs: { subject: "Music" },
    Fri: { subject: "Physical" },
  },
  {
    time: "10:30 - 10:50",
    type: "break",
    name: "Morning Break",
    style: "bg-accent",
  }, // Break row
  {
    time: "10:50 - 11:30",
    Mon: { subject: "Chem" },
    Tues: { subject: "Biology", isDouble: true },
    Wed: { subject: "ForLang" },
    Thurs: { subject: "Econ" },
    Fri: { subject: "Comp", isDouble: true },
  },
  {
    time: "11:30 - 12:10",
    Mon: { subject: "Lite" },
    Tues: { subject: "Biology", isDouble: true },
    Wed: { subject: "Math" },
    Thurs: { subject: "Physics" },
    Fri: { subject: "Comp", isDouble: true },
  },
  {
    time: "12:10 - 13:25",
    type: "break",
    name: "Lunch Break",
    style: "bg-neutral-content",
  }, // Break row
  {
    time: "13:25 - 14:05",
    Mon: { subject: "Geo" },
    Tues: { subject: "Physical", isDouble: true },
    Wed: { subject: "Art" },
    Thurs: { subject: "Science", isDouble: true },
    Fri: { subject: "Math" },
  },
  {
    time: "14:05 - 14:45",
    Mon: { subject: "English" },
    Tues: { subject: "Physical", isDouble: true },
    Wed: { subject: "Hist" },
    Thurs: { subject: "Science", isDouble: true },
    Fri: { subject: "ForLang" },
  },
  {
    time: "14:45 - 15:25",
    Mon: { subject: "Music" },
    Tues: { subject: "Math" },
    Wed: { subject: "Chem" },
    Thurs: { subject: "Lite" },
    Fri: { subject: "Econ" },
  },
  {
    time: "15:25 - 15:40",
    type: "break",
    name: "Evening Break",
    style: "bg-secondary",
  },
  {
    time: "15:40 - 16:20",
    Mon: { subject: "Biology" },
    Tues: { subject: "English" },
    Wed: { subject: "Physics", isDouble: true },
    Thurs: { subject: "ForLang" },
    Fri: { subject: "Hist" },
  },
  {
    time: "16:20 - 17:00",
    Mon: { subject: "Comp" },
    Tues: { subject: "Chem" },
    Wed: { subject: "Physics", isDouble: true },
    Thurs: { subject: "Art" },
    Fri: { subject: "Lite" },
  },
];

function TimeSlot({
  subject,
  isDouble = false,
  colorClass, // Receive color class as a prop
}: {
  subject: string;
  isDouble?: boolean;
  colorClass: string;
}) {
  return (
    <div
      // Apply the passed color class directly
      className={`rounded-md p-2 text-center text-sm border ${colorClass}`}
    >
      {subject}
      {isDouble && <span className="block text-xs mt-1">(Double)</span>}
    </div>
  );
}

export default function ClassTimetable() {
  return (
    <div className="container mx-auto">
      <Card className="w-full">
        <CardHeader className=" ">
          <CardTitle className=" flex justify-between items-center">
            <h3>Class Timetable</h3>{" "}
            <Button size={"sm"} library="daisy" variant={"primary"}>
              Change time table
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              <div className="font-medium">Time</div>
              {daysOfWeek.map((day) => (
                <div key={day} className="font-medium text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Timetable Data Rows */}
            {timetableData.map((slotData) => (
              <div
                key={slotData.time}
                className="grid grid-cols-6 gap-2 mb-2 items-stretch"
              >
                {/* Use items-stretch */}
                {/* Time Column */}
                <div className="text-sm py-2 flex items-center">
                  {slotData.time}
                </div>{" "}
                {/* Added flex items-center */}
                {/* Check if it's a Break Row */}
                {slotData.type === "break" ? (
                  <div
                    className={`col-span-${
                      daysOfWeek.length
                    } basic-title w-full flex items-center justify-center card p-2 text-center text-sm rounded-md  bg-base-200`}
                  >
                    {slotData.name}
                  </div>
                ) : (
                  /* Subject/Empty Slots for each day */
                  daysOfWeek.map((day) => {
                    // Type assertion needed because slotData can have dynamic keys based on 'daysOfWeek'
                    const entry = (slotData as any)[day];
                    const key = `${slotData.time}-${day}`; // Unique key for each slot

                    if (entry && entry.subject) {
                      return (
                        <TimeSlot
                          key={key}
                          subject={entry.subject}
                          isDouble={entry.isDouble}
                          colorClass={"bg-base-300 bg-base-content/20"}
                        />
                      );
                    } else {
                      return (
                        <div
                          key={key}
                          className="rounded-md p-2 border border-transparent"
                        ></div>
                      );
                    }
                  })
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
