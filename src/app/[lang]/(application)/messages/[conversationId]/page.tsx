import ConversationBody from "@/components/page/messages/conversation-body";
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
    <main className="flex flex-col h-[85dvh] w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
        <ConversationBody />
      </div>

      {/* 3. Footer: Stays fixed because it is not in the scrollable div */}
      <div className="flex-none">
        <MessageFooter />
      </div>
    </main>
  );
};

export default MessageConversationPage;
