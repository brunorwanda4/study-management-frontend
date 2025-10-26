import ClassCard from "@/components/cards/class-card";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import Link from "next/link";
import { MdClass } from "react-icons/md";

interface props {
  lang: Locale;
  onThePage?: boolean;
  className?: string;
  auth: AuthContext;
}
const SchoolClasses = ({ lang, onThePage, className, auth }: props) => {
  return (
    <div className=" space-y-2">
      {!onThePage && (
        <div className=" space-x-1 flex items-center">
          <MdClass />
          <h2 className=" font-semibold">Classes</h2>
        </div>
      )}
      <div className={cn("grid grid-cols-1 w-full gap-4", className)}>
        <ClassCard isOther lang={lang} auth={auth} />
        <ClassCard isOther lang={lang} auth={auth} />
        <ClassCard isOther lang={lang} auth={auth} />
        <ClassCard isOther lang={lang} auth={auth} />
        <ClassCard isOther lang={lang} auth={auth} />
      </div>
      {!onThePage && (
        <Link
          href={`/${lang}/school/classes`}
          className=" basic-card justify-center items-center flex-row"
        >
          <span className=" link">See More</span>
        </Link>
      )}
    </div>
  );
};

export default SchoolClasses;
