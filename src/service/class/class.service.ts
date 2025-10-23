import { ClassAndOthers, ClassDto } from "@/lib/schema/class/class-schema";
import { ClassUpdateDto } from "@/lib/schema/class/update-class-schema";
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto";
import apiRequest from "../api-client";

export const getClassesBySchoolId = async (schoolId: string) => {
  return await apiRequest<void, ClassDto[]>(
    "get",
    `/class?schoolId=${schoolId}`,
  );
};
export const getClassesBySchoolIdViewData = async (schoolId: string) => {
  return await apiRequest<void, ViewDataClassDto[]>(
    "get",
    `/class/school/${schoolId}/view-data`,
  );
};

export const getClassById = async (classId: string) => {
  return await apiRequest<void, ClassAndOthers>("get", `/class/${classId}`);
};

export const updateClassPublicInfo = async (
  data: ClassUpdateDto,
  classId: string,
) => {
  return await apiRequest<ClassUpdateDto, ClassDto>(
    "patch",
    `/class/${classId}`,
    data,
  );
};
