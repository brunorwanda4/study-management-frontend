import {
  AuthUserDto,
  CreateUserDto,
  LoginUserDto,
  onboardingDto,
  UserDto,
} from '@/lib/schema/user/user.dto';
import { setAuthCookie, setSchoolCookies } from '@/lib/utils/auth-cookies';
import { authUser } from '@/lib/utils/auth-user';
import apiRequest from '../api-client';

export async function loginService(input: LoginUserDto) {
  const res = await apiRequest<LoginUserDto, AuthUserDto>('post', '/login', input);
  if (res.data) {
    if (res.data.accessToken) {
      await setAuthCookie(res.data.accessToken, res.data.id);
      if (res.data.schoolAccessToken && res.data.role) {
        await setSchoolCookies(res.data.schoolAccessToken, res.data.role);
      }
      return res;
    } else return { error: 'access token backend in not generated' };
  } else {
    return { error: res.message };
  }
}

export async function registerUserService(input: CreateUserDto) {
  const res = await apiRequest<CreateUserDto, AuthUserDto>('post', '/register', input);
  if (res.data) {
    if (res.data.accessToken) {
      await setAuthCookie(res.data.accessToken, res.data.id);
      return res;
    } else return { error: 'access token backend in not generated' };
  } else {
    return { error: res.message };
  }
}

export async function onboardingService(input: onboardingDto) {
  const auth = await authUser();
  if (!auth?.token) {
    return { error: 'User token not found, it look like you not login 😔' };
  }

  const res = await apiRequest<onboardingDto, UserDto | AuthUserDto>(
    'patch',
    `/auth/onboarding`,
    input,
    auth.token,
  );

  console.log('Data 😣:', res);

  if (res.data) {
    if ('accessToken' in res.data && res.data.accessToken) {
      await setAuthCookie(res.data.accessToken, res.data.id);
      return res;
    } else return { error: 'access token backend in not generated' };
  } else {
    return { error: res.message };
  }
}
