import ClassCard from "@/components/cards/class-card";
import type { Locale } from "@/i18n";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  lang: Locale;
  auth: AuthContext;
}

const AllClassesCards = ({ lang, auth }: props) => {
  return (
    <div className=" grid grid-cols-3 gap-4">
      <ClassCard isSchoolStaff lang={lang} auth={auth} />
      <ClassCard isSchoolStaff lang={lang} auth={auth} />
      <ClassCard isSchoolStaff lang={lang} auth={auth} />
      <ClassCard isSchoolStaff lang={lang} auth={auth} />
    </div>
  );
};

export default AllClassesCards;
