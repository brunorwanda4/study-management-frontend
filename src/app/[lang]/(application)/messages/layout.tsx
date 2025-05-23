import MessagesAside from "@/components/page/messages/messages-aside";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
 
interface props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

const MessageLayout = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const user = await getAuthUserServer()
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <section className=" w-full">
      <MessagesAside lang={lang} />
      <div className=" pr-80">{children}</div>
    </section>
  );
};

export default MessageLayout;
