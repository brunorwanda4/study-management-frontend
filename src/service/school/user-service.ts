import { UserDto } from "@/lib/schema/user/user.dto";
import apiRequest from "../api-client";

export const getUserByUserId = async (UserId : string) => {
    return await apiRequest<void , UserDto[]>("get", `/user/${UserId}`)
}