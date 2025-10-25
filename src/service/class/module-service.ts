import { moduleANdOthers } from "@/lib/schema/class/module.dto";
import apiRequest from "../api-client";

export const getModuleByClassId = async (id: string) => {
  return apiRequest<void, moduleANdOthers[]>("get", `/modules?classId=${id}`);
};
