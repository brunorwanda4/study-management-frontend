import ClassHero from "@/components/page/class/class-hero";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ lang: Locale; classUsername: string }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  return {
    title: "Class not found",
    description: `classUsername`,
  };
};

const ClassUsernamePage = async (props: Props) => {
  const params = await props.params;
  const { lang, classUsername } = params;

  const auth = await authContext();

  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }

  return <div>
    <ClassHero />
  </div>;

};

export default ClassUsernamePage;
