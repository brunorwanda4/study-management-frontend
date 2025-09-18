"use client";
import MyLink from "@/components/comon/myLink";
import { Locale } from "@/i18n";
import { usePathname } from "next/navigation";
import { FaPeopleGroup, FaSchool, FaSignsPost } from "react-icons/fa6";
import { MdClass } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";

interface props {
  lang: Locale;
}

const SchoolHomeNav = ({ lang }: props) => {
  const pathname = usePathname();
  return (
    <nav className="basic-card w-full">
      <div className="flex space-x-2">
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant: pathname === `/${lang}/school` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/school`}
        >
          <RxActivityLog />
          All
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant: pathname === `/${lang}/school/about` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/school/about`}
        >
          <FaSchool />
          About school
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant: pathname === `/${lang}/school/posts` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/school/posts`}
        >
          <FaSignsPost />
          Posts
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant:
              pathname === `/${lang}/school/peoples` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/school/peoples`}
        >
          <FaPeopleGroup />
          members
        </MyLink>
        <MyLink
          loading
          type="button"
          button={{
            size: "sm",
            variant:
              pathname === `/${lang}/school/classes` ? "info" : "default",
            library: "daisy",
          }}
          href={`/${lang}/school/classes`}
        >
          <MdClass />
          Classes
        </MyLink>
        {/* <Link href={`/${lang}/school/announcement`}>
          <Button size="sm" className={cn(pathname === `/${lang}/school/announcement` && "text-info")}>
            <PiContactlessPayment />
            Announcement
          </Button>
        </Link> */}
      </div>
    </nav>
  );
};

export default SchoolHomeNav;
