import { UserDto } from "@/lib/schema/user/user-schema";
import apiRequest from "../api-client";

export const getUserById = async (userId: string) => {
  return await apiRequest<void, UserDto>("get", `/user/${userId}`);
};
