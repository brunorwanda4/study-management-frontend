import MessageCard from "@/components/cards/message-card";
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
    // 1. Parent: Fix height to viewport, prevent outer window scrolling
    <main className="flex flex-col h-[80dvh] w-full overflow-hidden bg-background">
      {/* 2. Scrollable Area: flex-1 takes remaining space, overflow-y-auto enables scroll */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-2 p-4">
        <MessageCard sender />
        <MessageCard sender />
        <MessageCard />
        <MessageCard />
        <MessageCard sender />
        <MessageCard />
        <MessageCard sender />
        <MessageCard sender />
        <MessageCard />
      </div>

      {/* 3. Footer: Stays fixed because it is not in the scrollable div */}
      <div className="flex-none">
        <MessageFooter />
      </div>
    </main>
  );
};

export default MessageConversationPage;
