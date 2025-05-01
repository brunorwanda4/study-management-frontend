import {  studentsAndOther } from "@/lib/schema/school/student.dto";
import apiRequest from "../api-client";

export const getAllStudentBySchoolId = async (schoolId : string) => {
    return await apiRequest<void , studentsAndOther[]>("get", `/students?schoolId=${schoolId}`)
}