import OnboardingForm from "@/components/page/auth/forms/onboarding-form";
import { getDictionary, type Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Onboarding | space-together",
  description: "Update user information",
};
interface Props {
  params: Promise<{ lang: Locale }>;
}
const OnboardingPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");
  const diction = await getDictionary(lang);
  return (
    <div className=" ">
      <h1 className="title-page">Complete Your Profile {auth.user.name}</h1>
      <div className="mt-4">
        <OnboardingForm
          auth={auth}
          lang={lang}
          dictionary={diction.auth.onboarding.form}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;
