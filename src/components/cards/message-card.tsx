import MyAvatar from "@/components/common/image/my-avatar";
import MyAvatarGroup from "@/components/common/image/my-avatar-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCheck, Smile } from "lucide-react";
import { IoChevronDownOutline } from "react-icons/io5";

interface props {
  sender?: boolean;
  messageCardType?: "group" | "direct";
  messageType?: "icon" | "image";
}

const MessageCard = ({ sender, messageCardType = "group" }: props) => {
  if (messageCardType === "group") {
    return (
      <div className={cn("chat", "chat-start", " w-full max-w-full")}>
        <MyAvatar size="sm" className="chat-image self-start" />
        <div
          className={cn(
            `chat-bubble before:top-0 before:bottom-auto before:mask-[1px_0px] `,
            "max-w-full bg-base-100 flex flex-col gap-2 var(--radius-field) rounded-(--radius-field)",
          )}
        >
          <div className=" flex justify-between w-full items-center">
            <div className=" flex flex-row gap-2 items-center">
              <h6 className=" font-medium ">Sender name</h6>
              <time className="text-xs opacity-50">12:45</time>
            </div>
          </div>
          <p className=" text-base-content/95">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            molestias facilis iste totam et qui sunt voluptatem tempora unde
            voluptate. Omnis dolorem nobis dolore dolorum earum illum, tempore
            cumque ullam!
          </p>

          <div className="  flex justify-between items-center">
            <div>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="items-center"
                library="daisy"
              >
                <IoChevronDownOutline /> <Smile size={16} />
              </Button>

              <Button
                variant={"ghost"}
                size={"sm"}
                className="items-center"
                library="daisy"
              >
                Replay
              </Button>
            </div>
            <div className=" flex items-center gap-2">
              <span className=" text-base-content/50 text-sm">Seen by:</span>
              <div title="Seen by: Bruno Rwanda, King DODO" className=" ">
                {<MyAvatarGroup size="2xs" items={[{}, {}, {}, {}]} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("chat group", sender ? "chat-end" : "chat-start")}>
      <div className="chat-bubble items-center bg-base-100  before:top-0 before:bottom-auto before:mask-[1px_0px] rounded-(--radius-field)">
        <p className="text-base-content/95">You were the Chosen One!</p>

        <div className="  flex justify-between items-center">
          {/* GPT can you help me when use hover on group it shown */}
          <div className="group-hover:opacity-100 opacity-0 duration-200 ">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="items-center"
              library="daisy"
            >
              <IoChevronDownOutline /> <Smile size={16} />
            </Button>

            <Button
              variant={"ghost"}
              size={"sm"}
              className="items-center"
              library="daisy"
            >
              Replay
            </Button>
          </div>
          <div className=" flex items-center  gap-2">
            <time className="text-xs opacity-50">12:45</time>
            {sender && <CheckCheck size={16} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
