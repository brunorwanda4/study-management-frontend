import SchoolHeader from "@/components/page/school/school-header";
import SchoolHomeNav from "@/components/page/school/school-home-navbar";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const layout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = await getAuthUserServer()
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }

  return (
    <section>
      <div className=" px-4 space-y-4 pb-4">
        <SchoolHeader isMySchool lang={lang} />
        <Separator />
        <SchoolHomeNav lang={lang}/>
      </div>
      {children}
    </section>
  );
};

export default layout;
