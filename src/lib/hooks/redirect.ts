import type { Locale } from "@/i18n";
import type { userRole } from "@/lib/schema/common-details-schema";

type RedirectContentsProps = {
  lang: Locale;
  role: userRole;
};

export const redirectContents = ({ lang, role }: RedirectContentsProps) => {
  return `/${lang}/${
    role === "STUDENT"
      ? "s"
      : role === "SCHOOLSTAFF"
        ? "s-t"
        : role === "ADMIN"
          ? "a"
          : "t"
  }`;
};
