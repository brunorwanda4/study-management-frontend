import { SchoolJoinRequestAndSchool, SchoolJoinRequestAndToken, SchoolJoinRequestDto, } from "@/lib/schema/school/school-join-request.schema"
import apiRequest from "../api-client"
import { getUserToken, setSchoolCookies } from "@/lib/utils/auth-cookies"

export const GetAllJoinSchoolRequestByCurrentUserEmail = async (email: string) => {
    return await apiRequest<void, SchoolJoinRequestAndSchool[]>("get", `/school-join-requests/by-email/${email}`)
}

export const approvedSchoolJoinRequestByCurrentUser = async (id: string) => {
    const token = await getUserToken()
    if (!token) {
        return { error: "User token not found, it look like you not login 😔" }
    }
    const request = await apiRequest<void, SchoolJoinRequestAndToken>("patch", `/school-join-requests/${id}/accept`, undefined, token.token)
    if (!request.data) return request
    await setSchoolCookies(request.data.token)
    return request
}

export const RejectSchoolJoinRequestByCurrentUser = async (id: string) => {
    return await apiRequest<void, SchoolJoinRequestDto>("patch", `/school-join-requests/${id}/reject`)
}

