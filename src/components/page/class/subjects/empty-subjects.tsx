"use client";

import MyImage from "@/components/common/myImage";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { AuthContext } from "@/lib/utils/auth-context";
import SubjectDialog from "../dialog/subject-dialog";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
}

const EmptySubjects = ({ auth, isSchool }: Props) => {
  return (
    <Empty className="text-center py-8">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <MyImage src="/icons/education.png" sizes="24" alt="student icon" />
        </EmptyMedia>
        <EmptyTitle>No Subjects Found</EmptyTitle>
        <EmptyDescription>
          They are currently no subjects in this class. You can add a new
          subject to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <SubjectDialog />
      </EmptyContent>
    </Empty>
  );
};

export default EmptySubjects;
