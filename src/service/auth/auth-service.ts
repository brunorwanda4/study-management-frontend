import { AuthUserDto, CreateUserDto, LoginUserDto, onboardingDto, UserDto } from "@/lib/schema/user.dto";
import apiRequest from "../api-client";
import { getUserToken, setAuthCookie } from "@/lib/utils/auth-cookies";

export async function loginService(input: LoginUserDto) {
  const res = await apiRequest<LoginUserDto, AuthUserDto>('post', '/auth/login', input);
  if (res.data) {
    if (res.data.accessToken) {
      await setAuthCookie(res.data.accessToken, res.data.id)
      return res
    } else return { error: "access token backend in not generated" }
  } else {
    return { error: res.message }
  }
}

export async function registerUserService(input: CreateUserDto) {
  const res = await apiRequest<CreateUserDto, AuthUserDto>('post', '/auth/register', input);
  if (res.data) {
    if (res.data.accessToken) {
      await setAuthCookie(res.data.accessToken, res.data.id)
      return res
    }
    else return { error: "access token backend in not generated" }
  } else {
    return { error: res.message }
  }
}

export async function onboardingService(input: onboardingDto) {
  const token = await getUserToken()
  if (!token) {
    return { error: "User token not found, it look like you not login 😔" }
  }
  const res = await apiRequest<onboardingDto, UserDto | AuthUserDto>("patch", `/user/${token.userId}`, input, token.token, 'onboarding');
  if (res.data) {
    if ('accessToken' in res.data && res.data.accessToken) {
      localStorage.setItem('userId', res.data.id);
      sessionStorage.setItem('accessToken', res.data.accessToken);
    } else {
      return { error: "Access token is undefined" }
    }
    return res
  } else {
    return { error: res.message }
  }
}
