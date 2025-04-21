import UserCardSmall from "@/components/cards/user-card-small";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
 
interface props {
  lang: Locale;
  onThePage?: boolean;
}

const SchoolTeachers = ({ lang, onThePage }: props) => {
  return (
    <div className=" basic-card space-y-2">
      <div className="">
        <h3 className=" font-semibold capitalize">Teachers </h3>
      </div>
      <div className=" space-y-2 ml-2">
        <UserCardSmall userRole="TEACHER" lang={lang} />
        <UserCardSmall userRole="TEACHER" lang={lang} />
        <UserCardSmall userRole="TEACHER" lang={lang} />
        <UserCardSmall userRole="TEACHER" lang={lang} />
        <UserCardSmall userRole="TEACHER" lang={lang} />
      </div>
      {!onThePage && (
        <Link href={`/${lang}/school/peoples`} className=" w-full items-center flex justify-center">
          <Button variant="ghost" size="sm" className=" w-full">
            See More
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SchoolTeachers;
