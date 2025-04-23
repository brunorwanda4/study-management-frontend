import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { User } from "lucide-react";
import Link from "next/link";
 import { BsArrowRight } from "react-icons/bs";

interface settingLinksProps {
  lang: Locale;
}

const SettingLinks = ({ lang }: settingLinksProps) => {
  return (
    <div className=" basic-card space-y-4">
      <div>
      <h2 className=" basic-title">Profile settings</h2>
      <p>Other setting for you</p>
      </div>
      <div className=" w-full">
        <Link href={`/${lang}/setting/profile`}>
          <Button
            variant="ghost"
            size="sm"
            className=" justify-between w-full group"
          >
            <div className=" flex gap-2 items-center">
              <User size={16}/>
              <span>Privacy</span>
            </div>
            <BsArrowRight
              size={16}
              className=" group-hover:scale-x-125 duration-150"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SettingLinks;
