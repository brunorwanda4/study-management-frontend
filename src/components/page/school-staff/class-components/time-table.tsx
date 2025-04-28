import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClassTimetable() {
  return (
    <div className="container mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="">Class Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 mb-4">
              <div className="font-medium">Time</div>
              <div className="font-medium text-center">Mon</div>
              <div className="font-medium text-center">Tues</div>
              <div className="font-medium text-center">Wed</div>
              <div className="font-medium text-center">Thurs</div>
              <div className="font-medium text-center">Fri</div>
            </div>

            {/* 8:30 - 9:10 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">8:30 - 9:10</div>
              <TimeSlot subject="Math" />
              <TimeSlot subject="Science" />
              <TimeSlot subject="English" />
              <TimeSlot subject="Hist" />
              <TimeSlot subject="Geo" />
            </div>

            {/* 9:10 - 9:50 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">9:10 - 9:50</div>
              <TimeSlot subject="Math" isDouble={true} />
              <TimeSlot subject="Science" />
              <TimeSlot subject="English" isDouble={true} />
              <TimeSlot subject="Hist" />
              <TimeSlot subject="Art" />
            </div>

            {/* 9:50 - 10:30 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">9:50 - 10:30</div>
              <TimeSlot subject="Physics" />
              <TimeSlot subject="Lite" />
              <TimeSlot subject="Comp" />
              <TimeSlot subject="Music" />
              <TimeSlot subject="Physical" />
            </div>

            {/* Morning Break */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">10:30 - 10:50</div>
              <div className="col-span-5 basic-title flex items-center justify-center bg-accent card p-2 text-center text-sm">
                Morning Break
              </div>
            </div>

            {/* 10:50 - 11:30 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">10:50 - 11:30</div>
              <TimeSlot subject="Chem" />
              <TimeSlot subject="Biology" isDouble={true} />
              <TimeSlot subject="ForLang" />
              <TimeSlot subject="Econ" />
              <TimeSlot subject="Comp" isDouble={true} />
            </div>

            {/* 11:30 - 12:10 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">11:30 - 12:10</div>
              <TimeSlot subject="Lite" />
              <TimeSlot subject="Biology" isDouble={true} />
              <TimeSlot subject="Math" />
              <TimeSlot subject="Physics" />
              <TimeSlot subject="Comp" isDouble={true} />
            </div>

            {/* Lunch Break */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">12:10 - 13:25</div>
              <div className="col-span-5 basic-title flex items-center justify-center bg-neutral-content card p-2 text-center text-sm">
                Lunch Break
              </div>
            </div>

            {/* 13:25 - 14:05 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">13:25 - 14:05</div>
              <TimeSlot subject="Geo" />
              <TimeSlot subject="Physical" isDouble={true} />
              <TimeSlot subject="Art" />
              <TimeSlot subject="Science" isDouble={true} />
              <TimeSlot subject="Math" />
            </div>

            {/* 14:05 - 14:45 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">14:05 - 14:45</div>
              <TimeSlot subject="English" />
              <TimeSlot subject="Physical" isDouble={true} />
              <TimeSlot subject="Hist" />
              <TimeSlot subject="Science" isDouble={true} />
              <TimeSlot subject="ForLang" />
            </div>

            {/* 14:45 - 15:25 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">14:45 - 15:25</div>
              <TimeSlot subject="Music" />
              <TimeSlot subject="Math" />
              <TimeSlot subject="Chem" />
              <TimeSlot subject="Lite" />
              <TimeSlot subject="Econ" />
            </div>

            {/* Evening Break */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">15:25 - 15:40</div>
              <div className="col-span-5 basic-title flex items-center justify-center bg-secondary card p-2 text-center text-sm">
                Evening Break
              </div>
            </div>

            {/* 15:40 - 16:20 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">15:40 - 16:20</div>
              <TimeSlot subject="Biology" />
              <TimeSlot subject="English" />
              <TimeSlot subject="Physics" isDouble={true} />
              <TimeSlot subject="ForLang" />
              <TimeSlot subject="Hist" />
            </div>

            {/* 16:20 - 17:00 */}
            <div className="grid grid-cols-6 gap-2">
              <div className="text-sm py-2">16:20 - 17:00</div>
              <TimeSlot subject="Comp" />
              <TimeSlot subject="Chem" />
              <TimeSlot subject="Physics" isDouble={true} />
              <TimeSlot subject="Art" />
              <TimeSlot subject="Lite" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TimeSlot({
  subject,
  isDouble = false,
}: {
  subject: any;
  isDouble?: boolean;
}) {
  const subjectColors = {
    Math: "bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900",
    Science:
      "bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-900",
    English:
      "bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-900",
    Hist: "bg-yellow-100 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900",
    Geo: "bg-orange-100 dark:bg-orange-950 border-orange-200 dark:border-orange-900",
    Physics: "bg-red-100 dark:bg-red-950 border-red-200 dark:border-red-900",
    Chem:
      "bg-pink-100 dark:bg-pink-950 border-pink-200 dark:border-pink-900",
    Biology:
      "bg-emerald-100 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900",
    Comp: "bg-cyan-100 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-900",
    Lite: "bg-violet-100 dark:bg-violet-950 border-violet-200 dark:border-violet-900",
    ForLang:
      "bg-indigo-100 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-900",
    Physical:
      "bg-lime-100 dark:bg-lime-950 border-lime-200 dark:border-lime-900",
    Music:
      "bg-fuchsia-100 dark:bg-fuchsia-950 border-fuchsia-200 dark:border-fuchsia-900",
    Art: "bg-rose-100 dark:bg-rose-950 border-rose-200 dark:border-rose-900",
    Econ: "bg-teal-100 dark:bg-teal-950 border-teal-200 dark:border-teal-900",
  };

  return (
    <div
      className={`rounded-md p-2 text-center text-sm border ${
        subjectColors[subject as keyof typeof subjectColors] ||
        ""
      }`}
    >
      {String(subject)}
      {isDouble && <span className="block text-xs mt-1">(Double)</span>}
    </div>
  );
}
