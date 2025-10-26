import SettingHeader from "@/components/page/settings/setting-header";
import SettingLang from "@/components/page/settings/setting-lang";
import SettingLinks from "@/components/page/settings/setting-links";
import SettingTheme from "@/components/page/settings/setting-theme";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings | space-together",
  description: "Settings description",
};
interface props {
  params: Promise<{ lang: Locale }>;
}
const SettingPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();
  if (!auth) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div>
      <SettingHeader
        lang={lang}
        user={{
          ...auth.user,
          name: auth.user.name ?? "",
          email: auth.user.email ?? undefined,
          image: auth.user.image ?? undefined,
          username: auth.user.username ?? undefined,
        }}
      />
      <div className="flex w-full space-x-4 px-4">
        <div className="w-1/2">
          <SettingTheme />
        </div>
        <div className="w-1/2 space-y-4">
          <SettingLang lang={lang} />
          <SettingLinks lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
