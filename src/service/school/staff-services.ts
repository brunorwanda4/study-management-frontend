import { SchoolStaffDto } from "@/lib/schema/school/school-staff.schema";
import apiRequest from "../api-client";

export const getAllStaffBySchoolId = async (schoolId : string) => {
    return await apiRequest<void , SchoolStaffDto[]>("get", `/school-staff?schoolId=${schoolId}`)
}