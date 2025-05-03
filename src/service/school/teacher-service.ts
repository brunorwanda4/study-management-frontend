import apiRequest from "../api-client";
import { TeacherDto } from "@/lib/schema/school/teacher.dto";

export const getAllTeacherBySchoolId = async (schoolId : string) => {
    return await apiRequest<void , TeacherDto[]>("get", `/teachers?schoolId=${schoolId}`)
}