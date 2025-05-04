
import { studentsAndOther } from "@/lib/schema/school/student.dto";
import apiRequest from "../api-client";

export const getAllStudentByClassId = async (classId : string) => {
    return await apiRequest<void , studentsAndOther[]>("get", `/students?classId=${classId}`)
}