import { AuthUserDto, CreateUserDto } from "@/lib/schema/user.dto";
import apiRequest from "../api-client";

export async function registerUserService(input : CreateUserDto) {
  const res = await apiRequest<CreateUserDto, AuthUserDto>('post', '/auth/register', input);

  if (res.data) {
    if (res.data.accessToken) {
      sessionStorage.setItem('accessToken', res.data.accessToken);
    } else {
      return {error :"Access token is undefined"}
    }
    return res
  } else {
    return {error : res.message}
  }
}
