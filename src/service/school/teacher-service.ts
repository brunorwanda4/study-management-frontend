import { TeacherDto } from "@/lib/schema/school/teacher-schema";
import apiRequest from "../api-client";

export const getAllTeacherBySchoolId = async (schoolId: string) => {
  return await apiRequest<void, TeacherDto[]>(
    "get",
    `/teachers?schoolId=${schoolId}`,
  );
};
