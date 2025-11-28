import TestCalendar from "@/components/test/test-calendar";

const ClassTimetablePage = async (
  props: PageProps<"/[lang]/c/[classUsername]/timetable">,
) => {
  const params = await props.params;
  return (
    <div className=" flex gap-4 flex-col">
      <h1 className=" mt-2 h3">Class Time table</h1>
      <TestCalendar />
    </div>
  );
};

export default ClassTimetablePage;
