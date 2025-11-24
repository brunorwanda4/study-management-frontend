"use client";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import { usePathname } from "next/navigation";

interface props {
  lang: Locale;
  classUsername: string;
}

const ClassNavbar = ({ lang, classUsername }: props) => {
  const pathname = usePathname();
  const pages = [
    "overview",
    "subjects",
    "discussion",
    "classwork",
    "people",
    "timetable",
    "settings",
  ] as const;

  return (
    <nav className="w-full gap-8 flex flex-row flex-wrap border-b border-base-content/50">
      {pages.map((page) => {
        const isActive = () => {
          if (page === "overview" && pathname === `/${lang}/c/${classUsername}`)
            return true;
          return pathname.startsWith(`/${lang}/c/${classUsername}/${page}`);
        };
        return (
          <MyLink
            key={page}
            loading
            className={`capitalize py-1 ${isActive() && "border-b-3 border-b-primary"}`}
            href={`/${lang}/c/${classUsername}/${page === "overview" ? "" : page}`}
            button={{ variant: "ghost" }}
          >
            <span className="capitalize">{page}</span>
          </MyLink>
        );
      })}
    </nav>
  );
};

export default ClassNavbar;
