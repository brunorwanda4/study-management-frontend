"use client";
import MyLink from "@/components/common/myLink";
import { Locale } from "@/i18n";
import { usePathname } from "next/navigation";
import { BsGear } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdClass } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";

interface props {
  lang: Locale;
  classId: string;
}

const ClassNavbar = ({ lang, classId }: props) => {
  const pathname = usePathname();
  return (
    <nav className="basic-card w-full">
      <div className="flex space-x-2">
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant: pathname === `/${lang}/c/${classId}` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/c/${classId}`}
        >
          <RxActivityLog />
          Home
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant:
              pathname === `/${lang}/c/${classId}/people` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/c/${classId}/people`}
        >
          <FaPeopleGroup />
          People
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant:
              pathname === `/${lang}/c/${classId}/subjects`
                ? "info"
                : "default",
            library: "daisy",
          }}
          href={`/${lang}/c/${classId}/subjects`}
        >
          <MdClass />
          Subjects
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant:
              pathname === `/${lang}/c/${classId}/settings`
                ? "info"
                : "default",
            library: "daisy",
          }}
          href={`/${lang}/c/${classId}/settings`}
        >
          <BsGear />
          Settings
        </MyLink>
      </div>
    </nav>
  );
};

export default ClassNavbar;
