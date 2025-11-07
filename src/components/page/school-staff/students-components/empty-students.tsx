"use client";

import MyImage from "@/components/common/myImage";
import StudentDialog from "@/components/page/student/dialogs/student-dialog";
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

const EmptyStudents = ({ auth, isSchool }: Props) => {
  return (
    <Empty className="text-center py-8">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <MyImage src="/icons/student.png" sizes="24" alt="student icon" />
        </EmptyMedia>
        <EmptyTitle>No Students Found</EmptyTitle>
        <EmptyDescription>
          There are currently no students in this school. You can add a new
          student to get started.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <StudentDialog auth={auth} isSchool={isSchool} />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyStudents;
