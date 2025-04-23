import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ClassTimetable() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Class Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 mb-4">
              <div className="font-medium">Time</div>
              <div className="font-medium text-center">Monday</div>
              <div className="font-medium text-center">Tuesday</div>
              <div className="font-medium text-center">Wednesday</div>
              <div className="font-medium text-center">Thursday</div>
              <div className="font-medium text-center">Friday</div>
            </div>

            {/* 8:30 - 9:10 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">8:30 - 9:10</div>
              <TimeSlot subject="Mathematics" />
              <TimeSlot subject="Science" />
              <TimeSlot subject="English" />
              <TimeSlot subject="History" />
              <TimeSlot subject="Geography" />
            </div>

            {/* 9:10 - 9:50 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">9:10 - 9:50</div>
              <TimeSlot subject="Mathematics" isDouble={true} />
              <TimeSlot subject="Science" />
              <TimeSlot subject="English" isDouble={true} />
              <TimeSlot subject="History" />
              <TimeSlot subject="Art" />
            </div>

            {/* 9:50 - 10:30 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">9:50 - 10:30</div>
              <TimeSlot subject="Physics" />
              <TimeSlot subject="Literature" />
              <TimeSlot subject="Computer Science" />
              <TimeSlot subject="Music" />
              <TimeSlot subject="Physical Education" />
            </div>

            {/* Morning Break */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">10:30 - 10:50</div>
              <div className="col-span-5 bg-amber-100 dark:bg-amber-950 rounded-md p-2 text-center text-sm">
                <Badge variant="outline" className="bg-amber-200 dark:bg-amber-900">
                  Morning Break
                </Badge>
              </div>
            </div>

            {/* 10:50 - 11:30 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">10:50 - 11:30</div>
              <TimeSlot subject="Chemistry" />
              <TimeSlot subject="Biology" isDouble={true} />
              <TimeSlot subject="Foreign Language" />
              <TimeSlot subject="Economics" />
              <TimeSlot subject="Computer Science" isDouble={true} />
            </div>

            {/* 11:30 - 12:10 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">11:30 - 12:10</div>
              <TimeSlot subject="Literature" />
              <TimeSlot subject="Biology" isDouble={true} />
              <TimeSlot subject="Mathematics" />
              <TimeSlot subject="Physics" />
              <TimeSlot subject="Computer Science" isDouble={true} />
            </div>

            {/* Lunch Break */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">12:10 - 13:25</div>
              <div className="col-span-5 bg-green-100 dark:bg-green-950 rounded-md p-2 text-center text-sm">
                <Badge variant="outline" className="bg-green-200 dark:bg-green-900">
                  Lunch Break
                </Badge>
              </div>
            </div>

            {/* 13:25 - 14:05 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">13:25 - 14:05</div>
              <TimeSlot subject="Geography" />
              <TimeSlot subject="Physical Education" isDouble={true} />
              <TimeSlot subject="Art" />
              <TimeSlot subject="Science" isDouble={true} />
              <TimeSlot subject="Mathematics" />
            </div>

            {/* 14:05 - 14:45 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">14:05 - 14:45</div>
              <TimeSlot subject="English" />
              <TimeSlot subject="Physical Education" isDouble={true} />
              <TimeSlot subject="History" />
              <TimeSlot subject="Science" isDouble={true} />
              <TimeSlot subject="Foreign Language" />
            </div>

            {/* 14:45 - 15:25 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">14:45 - 15:25</div>
              <TimeSlot subject="Music" />
              <TimeSlot subject="Mathematics" />
              <TimeSlot subject="Chemistry" />
              <TimeSlot subject="Literature" />
              <TimeSlot subject="Economics" />
            </div>

            {/* Evening Break */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">15:25 - 15:40</div>
              <div className="col-span-5 bg-amber-100 dark:bg-amber-950 rounded-md p-2 text-center text-sm">
                <Badge variant="outline" className="bg-amber-200 dark:bg-amber-900">
                  Evening Break
                </Badge>
              </div>
            </div>

            {/* 15:40 - 16:20 */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm py-2">15:40 - 16:20</div>
              <TimeSlot subject="Biology" />
              <TimeSlot subject="English" />
              <TimeSlot subject="Physics" isDouble={true} />
              <TimeSlot subject="Foreign Language" />
              <TimeSlot subject="History" />
            </div>

            {/* 16:20 - 17:00 */}
            <div className="grid grid-cols-6 gap-2">
              <div className="text-sm py-2">16:20 - 17:00</div>
              <TimeSlot subject="Computer Science" />
              <TimeSlot subject="Chemistry" />
              <TimeSlot subject="Physics" isDouble={true} />
              <TimeSlot subject="Art" />
              <TimeSlot subject="Literature" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TimeSlot({ subject, isDouble = false }: { subject: any; isDouble?: boolean }) {
  const subjectColors = {
    Mathematics: "bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900",
    Science: "bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-900",
    English: "bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-900",
    History: "bg-yellow-100 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900",
    Geography: "bg-orange-100 dark:bg-orange-950 border-orange-200 dark:border-orange-900",
    Physics: "bg-red-100 dark:bg-red-950 border-red-200 dark:border-red-900",
    Chemistry: "bg-pink-100 dark:bg-pink-950 border-pink-200 dark:border-pink-900",
    Biology: "bg-emerald-100 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900",
    "Computer Science": "bg-cyan-100 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-900",
    Literature: "bg-violet-100 dark:bg-violet-950 border-violet-200 dark:border-violet-900",
    "Foreign Language": "bg-indigo-100 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-900",
    "Physical Education": "bg-lime-100 dark:bg-lime-950 border-lime-200 dark:border-lime-900",
    Music: "bg-fuchsia-100 dark:bg-fuchsia-950 border-fuchsia-200 dark:border-fuchsia-900",
    Art: "bg-rose-100 dark:bg-rose-950 border-rose-200 dark:border-rose-900",
    Economics: "bg-teal-100 dark:bg-teal-950 border-teal-200 dark:border-teal-900",
  }

  return (
    <div
      className={`rounded-md p-2 text-center text-sm border ${subjectColors[subject as keyof typeof subjectColors] || "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"}`}
    >
      {String(subject)}
      {isDouble && <span className="block text-xs mt-1">(Double)</span>}
    </div>
  )
}

