import UserCardSmall from "@/components/cards/user-card-small";
import { Locale } from "@/i18n";
import { SchoolStaffDto } from "@/lib/schema/school/school-staff.schema";

interface props {
  lang: Locale;
  onThePage?: boolean;
  schoolStaff: SchoolStaffDto[];
}

const SchoolStaff = ({ lang, schoolStaff }: props) => {
  return (
    <div className=" basic-card space-y-2">
      <div className="">
        <h3 className=" font-semibold capitalize">school staff </h3>
      </div>
      <div className=" space-y-2 ml-2">
        {schoolStaff.map((item) => {
          return (
            <UserCardSmall
              id={item.id}
              key={item.id}
              role="s-t"
              lang={lang}
              userRole={item.role}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SchoolStaff;
