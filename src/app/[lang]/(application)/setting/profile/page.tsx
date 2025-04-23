import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import { getAuthUserServer } from "@/lib/utils/auth";
interface props {
  params: Promise<{ lang: Locale }>;
}
const SettingProfilePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = await getAuthUserServer()
  if (!currentUser || !currentUser.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const getCurrentUser = await getUserById(currentUser.id);
  if (!getCurrentUser) return <NotFoundPage />;
  return (
    <div className=" happy-page p-4">
      <h1 className=" basic-title">Profile setting</h1>
      <Separator />
      <div>
        <h2 className=" basic-title">General setting</h2>
        <UserUserDataForm currentUser={getCurrentUser} />
      </div>
      <Separator />
      <div>
        <h2 className=" basic-title">Privacy & Security</h2>
        <SettingPrivacyBody />
      </div>
    </div>
  );
};

export default SettingProfilePage;
