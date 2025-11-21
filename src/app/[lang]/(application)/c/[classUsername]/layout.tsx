import ClassNavbar from "@/components/page/class/class-navbar";
import type { Locale } from "@/i18n";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; classUsername: string }>;
}
const ClassLayout = async ({ children, params }: props) => {
  const { lang, classUsername } = await params;
  return (
    <div className=" px-4">
      <ClassNavbar classUsername={classUsername} lang={lang} />
      {children}
    </div>
  );
};

export default ClassLayout;
