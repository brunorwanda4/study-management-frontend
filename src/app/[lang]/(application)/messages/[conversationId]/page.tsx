import ConversationBody from "@/components/page/messages/conversation-body";
import ConversationNavbar from "@/components/page/messages/conversation-navbar";
import MessageFooter from "@/components/page/messages/message-footer";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}

const MessageConversationPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = await authContext();
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className="relative h-[90vh] max-h-[90vh] min-h-[90vh] w-full overflow-y-auto">
      <ConversationNavbar lang={lang} />
      <ConversationBody />
      <MessageFooter />
    </div>
  );
};

export default MessageConversationPage;
