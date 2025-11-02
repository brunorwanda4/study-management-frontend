import UserUserDataForm from "@/components/forms/user/update-user-data-form";
import NotFoundPage from "@/components/page/not-found";
import SettingPrivacyBody from "@/components/page/settings/profile/setting-privacy-body";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const auth = await authContext();
  if (!auth)
    return {
      title: "user profile | space-together",
    };
  return {
    title: `${auth.user.name || auth.user.username} update profile| space-together`,
    description: `Details for ${auth.user.name}, ${auth.user.bio}`,
  };
}

interface props {
  params: Promise<{ lang: Locale }>;
}

const SettingProfilePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  const getCurrentUser = await apiRequest<void, UserModel>(
    "get",
    `/users/${auth.user.id}`,
    undefined,
    { token: auth.token, realtime: "user" },
  );
  if (!getCurrentUser.data) return <NotFoundPage />;

  return (
    <div className="space-y-4 px-4">
      <h1 className="title-page">Profile setting</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>General setting</CardTitle>
        </CardHeader>
        <CardContent>
          <UserUserDataForm currentUser={getCurrentUser.data} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Security</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingPrivacyBody />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingProfilePage;
