import {
  authContextDto,
  CreateUserDto,
  LoginUserDto,
  onboardingDto,
  UserDto,
} from "@/lib/schema/user/user-schema";
import { authContext, setAuthCookies } from "@/lib/utils/auth-context";
import { setSchoolCookies } from "@/lib/utils/auth-cookies";
import apiRequest from "../api-client";

export async function loginService(input: LoginUserDto) {
  const res = await apiRequest<LoginUserDto, authContextDto>(
    "post",
    "/login",
    input,
  );
  if (res.data) {
    if (res.data.accessToken) {
      await setAuthCookies(res.data.accessToken, res.data.id);
      if (res.data.schoolAccessToken && res.data.role) {
        await setSchoolCookies(res.data.schoolAccessToken, res.data.role);
      }
      return res;
    } else return { error: "access token backend in not generated" };
  } else {
    return { error: res.message };
  }
}

export async function registerUserService(input: CreateUserDto) {
  const res = await apiRequest<CreateUserDto, authContextDto>(
    "post",
    "/register",
    input,
  );
  if (res.data) {
    if (res.data.accessToken) {
      await setAuthCookies(res.data.accessToken, res.data.id);
      return res;
    } else return { error: "access token backend in not generated" };
  } else {
    return { error: res.message };
  }
}

export async function onboardingService(input: onboardingDto) {
  const auth = await authContext();
  if (!auth?.token) {
    return { error: "User token not found, it look like you not login 😔" };
  }

  const res = await apiRequest<onboardingDto, UserDto | authContextDto>(
    "patch",
    `/auth/onboarding`,
    input,
    { token: auth.token },
  );

  console.log("Data 😣:", res);

  if (res.data) {
    if ("accessToken" in res.data && res.data.accessToken) {
      await setAuthCookies(res.data.accessToken, res.data.id);
      return res;
    } else return { error: "access token backend in not generated" };
  } else {
    return { error: res.message };
  }
}
