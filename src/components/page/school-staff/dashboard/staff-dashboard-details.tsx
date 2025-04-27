import { Locale } from "@/i18n";
import React from "react";
import StaffPeople from "./staff-people";
import { StudentDto } from "@/lib/schema/school/student.dto";
import { TeacherDto } from "@/lib/schema/school/teacher.dto";
import { SchoolStaffDto } from "@/lib/schema/school/school-staff.schema";

interface Props {
  lang: Locale;
  students: StudentDto[];
  teachers: TeacherDto[];
  schoolStaffs: SchoolStaffDto[];
}

const StaffDashboardDetails = ({
  lang,
  students,
  teachers,
  schoolStaffs,
}: Props) => {
  return (
    <div className="flex space-x-4 w-full">
      <StaffPeople
        icon="/icons/student.png"
        lang={lang}
        total={students.length}
        title="Students"
        Ftotal={
          students.filter((student) => student.gender === "FEMALE").length
        }
        Mtotal={students.filter((student) => student.gender === "MALE").length}
        role="Total students"
      />
      <StaffPeople
        icon="/icons/teacher.png"
        lang={lang}
        total={teachers.length}
        title="Teachers"
        Ftotal={
          teachers.filter((teacher) => teacher.gender === "FEMALE").length
        }
        Mtotal={teachers.filter((teacher) => teacher.gender === "MALE").length}
        role="Total teachers"
      />
      <StaffPeople
        icon="/icons/staff.png"
        lang={lang}
        total={schoolStaffs.length}
        title="School Staffs"
        Ftotal={
          schoolStaffs.filter((staff) => staff.gender === "FEMALE").length
        }
        Mtotal={schoolStaffs.filter((staff) => staff.gender === "MALE").length}
        role="Total school staffs"
      />
    </div>
  );
};

export default StaffDashboardDetails;
