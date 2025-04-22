import { SchoolJoinRequestAndSchool, } from "@/lib/schema/school/school-join-request.schema"
import apiRequest from "../api-client"

export const GetAllJoinSchoolRequestByCurrentUserEmail = async (email: string) => {
    return await apiRequest<void, SchoolJoinRequestAndSchool[]>("get", `/school-join-requests/by-email/${email}`)
}
