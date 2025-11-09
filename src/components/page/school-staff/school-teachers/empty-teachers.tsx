"use client";

import MyImage from "@/components/common/myImage";
import TeacherDialog from "@/components/page/teacher/dialog/teacher-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
}

const EmptyTeachers = ({ auth, isSchool }: Props) => {
  return (
    <Empty className="text-center py-8">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <MyImage src="/icons/teacher.png" sizes="24" alt="student icon" />
        </EmptyMedia>
        <EmptyTitle>No Teacher Found</EmptyTitle>
        <EmptyDescription>
          There are currently no teacher in this school. You can add a new
          student to get started.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <TeacherDialog auth={auth} isSchool={isSchool} />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyTeachers;
