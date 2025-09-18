import UserUserDataForm from "@/components/forms/user/update-user-data-form";
import NotFoundPage from "@/components/page/not-found";
import SettingPrivacyBody from "@/components/page/settings/profile/setting-privacy-body";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { authUser } from "@/lib/utils/auth-user";
import { getUserById } from "@/service/user/user-service";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}
const SettingProfilePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = (await authUser())?.user;
  if (!currentUser || !currentUser.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const getCurrentUser = await getUserById(currentUser.id);
  if (!getCurrentUser.data) return <NotFoundPage />;
  return (
    <div className="space-y-2 p-4">
      <h1 className="title-page">Profile setting</h1>
      <Separator />
      <div className="space-y-4">
        <h2 className="basic-title">General setting</h2>
        <UserUserDataForm currentUser={getCurrentUser.data} />
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className="basic-title">Privacy & Security</h2>
        <SettingPrivacyBody />
      </div>
    </div>
  );
};

export default SettingProfilePage;
