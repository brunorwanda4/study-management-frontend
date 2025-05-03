
import { Metadata } from "next";

export const metadata : Metadata= {
  title: "Students management",
  description: "Students page",
  icons: {
    icon: "/favicon.ico",
  },
}


import SchoolStaffTable from "@/components/page/school-staff/table/staff-table/table-staff";
import { Locale } from "@/i18n";

interface props {
  lang: Locale;
}


const SchoolStaffStudentPage = ({lang}: props) => {
  return (
    <div className="p-4 space-y-4 ">
      <div>
      <SchoolStaffTable
         schoolId={"schoolId"}
         Classes={ []}
         lang={lang}
         staffs={ []}
      />
      </div>
    </div>
  );
};
export default SchoolStaffStudentPage;
