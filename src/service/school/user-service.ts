import { userAndOther} from "@/lib/schema/user/user.dto";
import apiRequest from "../api-client";

export const getUserById = async (Id : string) => {
    return await apiRequest<void , userAndOther>("get", `/user/${Id}`)
}