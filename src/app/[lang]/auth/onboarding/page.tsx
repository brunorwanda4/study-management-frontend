import OnboardingForm from '@/components/page/auth/forms/onboarding-form';
import { Locale } from '@/i18n';
import { getSchoolServer } from '@/lib/utils/auth';
import { getUserToken } from '@/lib/utils/auth-cookies';
import { authUser } from '@/lib/utils/auth-user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Update user information',
};
interface Props {
  params: Promise<{ lang: Locale }>;
}
const OnboardingPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const token = await getUserToken();
  const school = await getSchoolServer();
  const user = await authUser();
  console.log(user);
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
