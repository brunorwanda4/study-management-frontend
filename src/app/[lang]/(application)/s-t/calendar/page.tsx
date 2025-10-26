import SchoolCalendar from "@/components/page/calendar/school-calendar";

const CalendarPage = () => {
  return (
    <div className=" px-4 py-4 space-y-4">
      <h1 className=" title-page">School Calendar</h1>
      <SchoolCalendar />
    </div>
  );
};

export default CalendarPage;
