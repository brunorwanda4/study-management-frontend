"use client";

import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface ClassSettingsSidebarProps {
  lang: Locale;
  classUsername: string;
}

const ClassSettingsSidebar = ({
  lang,
  classUsername,
}: ClassSettingsSidebarProps) => {
  const pathname = usePathname();

  const pages = [
    { name: "general", icon: "/icons/classroom.png" },
    { name: "students", icon: "/icons/students.png" },
    { name: "teachers", icon: "/icons/training.png" },
    { name: "class-teacher", icon: "/icons/teacher.png" },
    { name: "subjects", icon: "/icons/books.png" },
    { name: "timetable", icon: "/icons/timetable.png" },
  ] as const;

  const baseSettingsPath = `/${lang}/c/${classUsername}/settings`;

  const pageIsActive = (pageName: string): boolean => {
    if (pageName === "general") {
      return pathname === baseSettingsPath;
    }
    return pathname === `${baseSettingsPath}/${pageName}`;
  };

  const getPageHref = (pageName: string): string => {
    if (pageName === "general") {
      return baseSettingsPath;
    }
    return `${baseSettingsPath}/${pageName}`;
  };

  return (
    <div className="flex flex-col h-full gap-2 w-52 bg-base-100 p-2 border-r border-r-base-300">
      {pages.map((page) => {
        const isActive = pageIsActive(page.name);

        return (
          <MyLink
            key={page.name}
            loading
            button={{
              variant: "ghost",
              library: "daisy",
              size: "md",
            }}
            href={getPageHref(page.name)}
            className={cn(
              "w-full flex justify-start flex-row items-start",
              isActive && "border-l-2 border-l-info",
            )}
            classname={cn(
              " justify-start w-full rounded-l-none",
              isActive && "bg-base-300",
            )}
          >
            <MyImage src={page.icon} role="ICON" />
            <span className="capitalize">{page.name.replace(/-/g, " ")}</span>
          </MyLink>
        );
      })}
    </div>
  );
};

export default ClassSettingsSidebar;
