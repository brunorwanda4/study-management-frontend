import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import { redirectContents } from "@/lib/hooks/redirect";
import type { AuthUserDto } from "@/lib/schema/user/auth-user-schema";
import { cn } from "@/lib/utils";

interface props {
  name?: string;
  user?: AuthUserDto;
  lang: Locale;
  className?: string;
  notShowName?: boolean;
}

const AppLogo = ({ name, user, lang, notShowName = false }: props) => {
  return (
    <MyLink
      href={`${user ? redirectContents({ lang, role: user.role || "STUDENT"}) : `/${lang}`}`}
      className="flex items-center gap-2"
    >
      <MyImage src="/logo.png" priority className="size-10" />
      <div className="flex flex-col">
       {!notShowName && <h2
          className={cn(
            "logo-font flex flex-row text-start text-base font-semibold",
          )}
        >
          space-together
        </h2>}
        <span className="my-sm-text">{name}</span>
      </div>
    </MyLink>
  );
};

export default AppLogo;
