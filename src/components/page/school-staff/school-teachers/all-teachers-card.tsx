"use client";
import TeacherCard from "@/components/cards/teacher-card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";

interface props {
  lang: Locale;
  auth: AuthContext;
  teachers: TeacherWithRelations[];
  realtimeEnabled?: boolean;
}

const AllTeachersCards = ({
  lang,
  auth,
  teachers,
  realtimeEnabled = true,
}: props) => {
  const { data: initialTeachers, isConnected } =
    useRealtimeData<TeacherWithRelations>("teacher");
  const [displayTeachers, setDisplayTeachers] =
    useState<TeacherWithRelations[]>(teachers);

  useEffect(() => {
    if (realtimeEnabled && initialTeachers) {
      setDisplayTeachers(initialTeachers as TeacherWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplayTeachers(initialTeachers);
    }
  }, [initialTeachers, realtimeEnabled]);
  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayTeachers.map((teacher) => {
        return (
          <TeacherCard
            key={teacher.id || teacher._id}
            isSchoolStaff
            lang={lang}
            auth={auth}
            teacher={teacher}
          />
        );
      })}
    </div>
  );
};

export default AllTeachersCards;
