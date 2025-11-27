import TestCalendar from "@/components/test/test-calendar";

const ClassTimetablePage = async (
  props: PageProps<"/[lang]/c/[classUsername]/timetable">,
) => {
  const params = await props.params;
  return (
    <div className=" flex  flex-col">
      <h1 className=" h-3 mt-2">Class Time table</h1>
      <TestCalendar />
    </div>
  );
};

export default ClassTimetablePage;
