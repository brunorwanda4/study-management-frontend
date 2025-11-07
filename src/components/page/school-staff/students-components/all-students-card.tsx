"use client";
import StudentCard from "@/components/cards/student-card";
import EmptyStudents from "@/components/page/school-staff/students-components/empty-students";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";

interface props {
  lang: Locale;
  auth: AuthContext;
  students: StudentWithRelations[];
  realtimeEnabled?: boolean;
}

const AllStudentsCards = ({
  lang,
  auth,
  students,
  realtimeEnabled = true,
}: props) => {
  const { data: initialStudents, isConnected } =
    useRealtimeData<StudentWithRelations>("student");
  const [displayStudents, setDisplayStudents] =
    useState<StudentWithRelations[]>(students);

  useEffect(() => {
    if (realtimeEnabled && initialStudents) {
      setDisplayStudents(initialStudents as StudentWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplayStudents(initialStudents);
    }
  }, [initialStudents, realtimeEnabled]);

  if (displayStudents.length === 0 && students.length === 0)
    return <EmptyStudents isSchool auth={auth} />;

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayStudents.map((student) => {
        return (
          <StudentCard
            key={student.id || student._id}
            isSchoolStaff
            lang={lang}
            auth={auth}
            student={student}
          />
        );
      })}
    </div>
  );
};

export default AllStudentsCards;
