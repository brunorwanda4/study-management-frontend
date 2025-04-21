 import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

interface props {
    sender ?: boolean; 
}

const MessageCard = ({sender} : props) => {
  return (
    <div className={cn("chat" , sender ? "chat-end" : "chat-start")}>
      <Avatar className=" chat-image avatar size-12">
        <AvatarImage src="/images/p.jpg" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div className="chat-header">
        Obi-Wan Kenobi
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble">You were the Chosen One!</div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
};

export default MessageCard;
