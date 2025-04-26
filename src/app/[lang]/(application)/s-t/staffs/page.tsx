
import { Metadata } from "next";

export const metadata : Metadata= {
  title: "Students management",
  description: "Students page",
  icons: {
    icon: "/favicon.ico",
  },
}

import StaffList from "@/components/table/s-t/table-staff-list";


const SchoolStaffStudentPage = () => {
  return (
    <div className="p-4 space-y-4 ">
      <div>
      <StaffList/>
      </div>
    </div>
  );
};
export default SchoolStaffStudentPage;
