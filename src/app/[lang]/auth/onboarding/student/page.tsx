import AuthOnboardingStudentContent from "@/components/page/auth/auth-onboarding-student-content";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Onboarding | space-together",
  description: "Update user information",
};
interface Props {
  params: Promise<{ lang: string }>;
}
const StudentOnboardingPage = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");
  const userRes = await apiRequest<void, UserModel>(
    "get",
    `/users/${auth.user.id}`,
    undefined,
    { token: auth.token, realtime: "user" },
  );
  if (userRes.statusCode === 404)
    return <NotFoundPage message={userRes.message} />;
  if (!userRes.data)
    return <ErrorPage message={userRes.message} error={userRes.error} />;

  return (
    <RealtimeProvider<UserModel>
      channels={[{ name: "user", initialData: [userRes.data] }]}
    >
      <div>
        <AuthOnboardingStudentContent
          user={userRes.data}
          auth={auth}
          lang={lang as Locale}
        />
      </div>
    </RealtimeProvider>
  );
};

export default StudentOnboardingPage;
