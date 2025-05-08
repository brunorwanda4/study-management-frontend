"use client";
import { RxActivityLog } from "react-icons/rx";
import { Locale } from "@/i18n";
import { usePathname } from "next/navigation";
import MyLink from "@/components/myComponents/myLink";
import { BsShield } from "react-icons/bs";
import { BookA } from "lucide-react";

interface props {
  lang: Locale;
}

const SchoolSettingsNav = ({ lang}: props) => {
  const pathname = usePathname();
  return (
    <nav className=" basic-card-no-p p-2 w-full">
      <div className=" flex space-x-2">
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant: pathname === `/${lang}/s-t/settings` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/s-t/settings`}
        >
          <RxActivityLog />
          Public Information
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant: pathname === `/${lang}/s-t/settings/education` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/s-t/settings/education`}
        >
          <BookA size={16}/>
          Education
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant: pathname === `/${lang}/s-t/settings/security` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/s-t/settings/security`}
        >
          <BsShield size={16}/>
          Security
        </MyLink>
      </div>
    </nav>
  );
};

export default SchoolSettingsNav;
