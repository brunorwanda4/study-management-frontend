"use client";
import MyLink from "@/components/comon/myLink";
import { Locale } from "@/i18n";
import { BookA } from "lucide-react";
import { usePathname } from "next/navigation";
import { BsShield } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";

interface props {
  lang: Locale;
}

const SchoolSettingsNav = ({ lang }: props) => {
  const pathname = usePathname();
  return (
    <nav className="basic-card-no-p w-full p-2">
      <div className="flex space-x-2">
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
            variant:
              pathname === `/${lang}/s-t/settings/education`
                ? "info"
                : "default",
            library: "daisy",
          }}
          href={`/${lang}/s-t/settings/education`}
        >
          <BookA size={16} />
          Education
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant:
              pathname === `/${lang}/s-t/settings/security`
                ? "info"
                : "default",
            library: "daisy",
          }}
          href={`/${lang}/s-t/settings/security`}
        >
          <BsShield size={16} />
          Security
        </MyLink>
      </div>
    </nav>
  );
};

export default SchoolSettingsNav;
