import { ClassDto } from "@/lib/schema/class/class.schema"
import apiRequest from "../api-client"
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto"

export const getClassesBySchoolId = async (schoolId: string) => {
    return await apiRequest<void, ClassDto[]>("get", `/class?schoolId=${schoolId}`)
}
export const getClassesBySchoolIdViewData = async (schoolId: string) => {
    return await apiRequest<void, ViewDataClassDto[]>(
        "get",
        `/class/school/${schoolId}/view-data`
    )
}