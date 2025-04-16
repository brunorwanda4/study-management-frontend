import OnboardingForm from "@/components/page/auth/forms/onboarding-form";
import { Locale } from "@/i18n";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Update user information",
};
interface Props {
  params: Promise<{ lang: Locale }>;
}
const OnboardingPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className=" ">
      <div className="space-y-1 text-center">
        <h1 className=" title-page">Complete Your Profile Setup</h1>
        <p>Help others understand you better. ☺️</p>
      </div>
      <div className=" mt-4">
        <OnboardingForm lang={lang} />
      </div>
    </div>
  );
};

export default OnboardingPage;
