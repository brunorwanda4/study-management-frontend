import ConversationBody from "@/components/page/messages/conversation-body";
import ConversationNavbar from "@/components/page/messages/conversation-navbar";
import MessageFooter from "@/components/page/messages/message-footer";
import { Locale } from "@/i18n";
import { authUser } from "@/lib/utils/auth-user";;
import { redirect } from "next/navigation";
 interface props {
  params: Promise<{ lang: Locale }>;
}

const MessageConversationPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = await authUser()
  if (!user) {
    return redirect(`/${lang}/auth/login`);
  }
  return (
    <div className=" h-[90vh] max-h-[90vh] overflow-y-auto min-h-[90vh] w-full relative">
      <ConversationNavbar lang={lang}/>
      <ConversationBody />
      <MessageFooter />
    </div>
  );
};

export default MessageConversationPage;
