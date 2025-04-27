import { ClassDto } from "@/lib/schema/class/class.schema"
import apiRequest from "../api-client"

export const getClassesBySchoolId = async (schoolId: string) => {
    return await apiRequest<void, ClassDto[]>("get", `/class?schoolId=${schoolId}`)
}