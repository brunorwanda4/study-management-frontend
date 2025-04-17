import { AuthUserDto, CreateUserDto, LoginUserDto, onboardingDto, UserDto } from "@/lib/schema/user.dto";
import apiRequest from "../api-client";

export async function loginService(input : LoginUserDto) {
  const res = await apiRequest<LoginUserDto, AuthUserDto>('post','/auth/login',input);
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

export async function registerUserService(input: CreateUserDto) {
  const res = await apiRequest<CreateUserDto, AuthUserDto>('post', '/auth/register', input);

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

export async function onboardingService(input: onboardingDto) {
  const userId = localStorage.getItem('userId')
  const token = sessionStorage.getItem('accessToken')
  if (!userId || !token) {
    return { error: "You can no update account they are some data you are missing", message: "You are missing 'Token' & 'User Id', register  again or login again" }
  }
  const res = await apiRequest<onboardingDto, UserDto | AuthUserDto>("patch", `/user/${userId}`, input, token, 'onboarding');
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