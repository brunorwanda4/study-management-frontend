const ClassSettingsStudentsPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings/students">,
) => {
  const params = await props.params;
  return <div>class students page</div>;
};

export default ClassSettingsStudentsPage;
