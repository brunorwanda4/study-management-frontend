import ClassSettingsSidebar from "@/components/page/class/settings/class-settings-sidebar";
import type { Locale } from "@/i18n";

const ClassLayoutPage = async (
  props: LayoutProps<"/[lang]/c/[classUsername]/settings">,
) => {
  const params = await props.params;

  return (
    <div className=" flex gap-4">
      <ClassSettingsSidebar
        classUsername={params.classUsername}
        lang={params.lang as Locale}
      />
      <div className=" min-h-screen">{props.children}</div>
    </div>
  );
};

export default ClassLayoutPage;
