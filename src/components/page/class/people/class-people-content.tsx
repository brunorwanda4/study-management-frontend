"use client";

import { UserSmCard } from "@/components/cards/user-card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { Student } from "@/lib/schema/school/student-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import { useEffect, useState } from "react";

interface ClassPeopleContentProps {
  students: Student[];
  teachers: Teacher[];
  realtimeEnabled?: boolean;
}

const ClassPeopleContent = ({
  students,
  teachers,
  realtimeEnabled = true,
}: ClassPeopleContentProps) => {
  // Realtime channels
  const { data: rtStudents } = useRealtimeData<Student>("student");
  const { data: rtTeachers } = useRealtimeData<Teacher>("teacher");

  const [displayStudents, setDisplayStudents] = useState<Student[]>(students);
  const [displayTeachers, setDisplayTeachers] = useState<Teacher[]>(teachers);

  // Sync STUDENTS
  useEffect(() => {
    const updated = realtimeEnabled
      ? rtStudents?.length
        ? rtStudents
        : students
      : students;

    setDisplayStudents(updated);
  }, [rtStudents, realtimeEnabled, students]);

  // Sync TEACHERS
  useEffect(() => {
    const updated = realtimeEnabled
      ? rtTeachers?.length
        ? rtTeachers
        : teachers
      : teachers;

    setDisplayTeachers(updated);
  }, [rtTeachers, realtimeEnabled, teachers]);

  const calcTeachers = () => {
    const female = displayTeachers.filter((t) => t.gender === "FEMALE").length;
    const male = displayTeachers.filter((t) => t.gender === "MALE").length;
    return { total: displayTeachers.length, female, male };
  };

  const calcStudents = () => {
    const female = displayStudents.filter((s) => s.gender === "FEMALE").length;
    const male = displayStudents.filter((s) => s.gender === "MALE").length;
    return { total: displayStudents.length, female, male };
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-8 justify-between">
      {/* Teachers */}
      <div className="flex flex-col gap-2 lg:w-1/2">
        <div className="flex flex-row justify-between w-full mt-2">
          <h3 className="h5">{calcTeachers().total} Teachers</h3>
          {/*<div className="flex gap-2">
            <span>{calcTeachers().male} Male</span>
            <span>{calcTeachers().female} Female</span>
          </div>*/}
        </div>

        <div className="flex flex-col gap-2">
          {displayTeachers.map((teacher) => (
            <UserSmCard
              key={teacher._id || teacher.id}
              image={teacher.image}
              showMessage
              subjects={["Kinyarwanda", "English"]} // optional static sample
              name={teacher.name}
              avatarProps={{ alt: teacher.name, size: "sm" }}
              gender={teacher.gender}
            />
          ))}
        </div>
      </div>

      {/* Students */}
      <div className="flex flex-col gap-2 lg:w-1/2">
        <div className="flex flex-row justify-between w-full mt-2">
          <h3 className="h5">{calcStudents().total} Students</h3>
          {/*<div className="flex gap-2">
            <span>{calcStudents().male} Male</span>
            <span>{calcStudents().female} Female</span>
          </div>*/}
        </div>

        <div className="flex flex-col gap-2">
          {displayStudents.map((student) => (
            <UserSmCard
              key={student._id || student.id}
              image={student.image}
              showMessage
              name={student.name}
              avatarProps={{ alt: student.name, size: "sm" }}
              gender={student.gender}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassPeopleContent;
