import ConversationNavbar from "@/components/page/messages/conversation-navbar";
import type { Locale } from "@/i18n";

const ConversationLayout = async (
  props: LayoutProps<"/[lang]/messages/[conversationId]">,
) => {
  const params = await props.params;
  return (
    <div className="flex flex-col">
      <ConversationNavbar lang={params.lang as Locale} />
      <div>{props.children}</div>
    </div>
  );
};

export default ConversationLayout;
