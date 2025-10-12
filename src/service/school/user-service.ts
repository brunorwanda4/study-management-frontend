import { userAndOther } from "@/lib/schema/user/user-schema";
import apiRequest from "../api-client";

export const getUserById = async (Id: string) => {
  return await apiRequest<void, userAndOther>("get", `/user/${Id}`);
};
