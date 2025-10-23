import UserCardSmall from "@/components/cards/user-card-small";
import { Locale } from "@/i18n";
import type { SchoolStaff } from "@/lib/schema/school/school-staff-schema";

interface props {
  lang: Locale;
  onThePage?: boolean;
  schoolStaff: SchoolStaff[];
}

const SchoolStaff = ({ lang, schoolStaff }: props) => {
  return (
    <div className="basic-card space-y-2">
      <div className="">
        <h3 className="font-semibold capitalize">school staff </h3>
      </div>
      <div className="ml-2 space-y-2">
        {schoolStaff.map((item) => {
          return (
            <UserCardSmall
              id={item.id || item._id}
              key={item.id || item._id}
              role="s-t"
              lang={lang}
              userRole={item.type}
              name={item.name}
              userId={item.user_id || ""}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SchoolStaff;
