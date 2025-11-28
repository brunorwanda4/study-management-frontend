"use client";
import MyAvatar from "@/components/common/image/my-avatar";
import MyAvatarGroup from "@/components/common/image/my-avatar-group";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";

interface props {
  lang: Locale;
  messageCardType?: "group" | "direct";
}

const MessageUserCard = ({ lang, messageCardType = "direct" }: props) => {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "card flex w-full items-center flex-row space-x-1 p-1.5 px-2 duration-200",
        messageCardType === "group" && "items-center",
      )}
    >
      <MyLink href={`/${lang}/messages/student`}>
        {messageCardType === "direct" ? (
          <MyAvatar size="sm" />
        ) : (
          <div>
            <MyAvatarGroup
              items={[
                { src: "", alt: "Bruno" },
                { src: "", alt: "Bruno" },
                { src: "", alt: "Bruno" },
              ]}
              limit={1}
              size="xs"
            />
          </div>
        )}
      </MyLink>
      <div className="w-full gap-0 flex -space-y-0.5 flex-col">
        <Link
          href={`/${lang}/messages/student`}
          className="flex w-full items-center justify-between"
        >
          <h6 className="line-clamp-1 leading-6"> Bahabe Like</h6>
          <span className="text-base-content/50 text-xs font-medium">
            2min ago
          </span>
        </Link>
        <MyLink href={`/${lang}/messages/student`}>
          <p
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            className="text-base-content/80 line-clamp-1 text-sm leading-4"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </MyLink>
      </div>
    </div>
  );
};

export default MessageUserCard;
