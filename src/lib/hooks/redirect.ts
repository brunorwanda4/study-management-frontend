import { Locale } from "@/i18n";
import { UserRoleDto } from "../schema/user.dto";

type RedirectContentsProps = {
  lang: Locale;
  role: UserRoleDto;
}

export const redirectContents = ({ lang, role }: RedirectContentsProps) => {
  return `/${lang}/${role === "STUDENT"
      ? "s"
      : role === "SCHOOLSTAFF"
        ? "s-t"
        : role === "ADMIN"
          ? "a"
          : "t"
    }`;
};
