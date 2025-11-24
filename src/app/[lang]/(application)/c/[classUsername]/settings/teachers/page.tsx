const ClassSettingsTeachersPage = async (
  props: PageProps<"/[lang]/c/[classUsername]/settings/students">,
) => {
  const params = await props.params;
  return <div>class teachers page</div>;
};

export default ClassSettingsTeachersPage;
