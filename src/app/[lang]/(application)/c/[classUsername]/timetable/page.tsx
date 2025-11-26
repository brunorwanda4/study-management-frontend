const ClassTimetablePage = async (
  props: PageProps<"/[lang]/c/[classUsername]/timetable">,
) => {
  const params = await props.params;
  return <div>class timetable page</div>;
};

export default ClassTimetablePage;
