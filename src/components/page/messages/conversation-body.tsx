import MessageCard from "@/components/cards/message-card";

const ConversationBody = () => {
  return (
    <div className=" max-h-[72%] min-h-[72%] overflow-y-auto px-4 py-4 pb-10">
      <MessageCard sender />
      <MessageCard sender />
      <MessageCard sender />
      <MessageCard />
      <MessageCard sender />
      <MessageCard />
      <MessageCard sender />
      <MessageCard sender />
      <MessageCard />
      <MessageCard sender />
      <MessageCard sender />
    </div>
  );
};

export default ConversationBody;
