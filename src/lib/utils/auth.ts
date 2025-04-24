// utils/auth.ts
import { Locale } from '@/i18n';
import { jwtDecode } from 'jwt-decode';
import { getSchoolToken, getUserToken, removeUserToken } from './auth-cookies';
import { UserRoleDto } from '../schema/user.dto';
import { redirect } from 'next/navigation';

export interface AuthUserDto {
  id: string;
  name: string;
  email: string;
  username: string,
  image?: string;
  phone?: string;
  role?: UserRoleDto;
  iat?: number;
  exp?: number;
}

export function getUserFromToken(token: string): AuthUserDto | null {
  try {
    const decoded = jwtDecode<AuthUserDto>(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) return null;
    return decoded;
  } catch {
    return null;
  }
}


export function authLogout(lang: Locale) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.href = `/${lang}/auth/login`;
  }
}

// export function getAuthUser(): AuthUserDto | null {
//   const token = localStorage.getItem('accessToken');
//   return token ? getUserFromToken(token) : null;
// }

export async function getAuthUserServer(): Promise<AuthUserDto | null> {
  const token = await getUserToken()
  return token.token ? getUserFromToken(token.token) : null;
}

export const logout = async (lang: Locale) => {
  await removeUserToken()
  redirect(`/${lang}/auth/login`)
}

export interface UserSchool {
  sub: string,
  schoolId: string,
  role?: string, // The role they just got assigned in this school (Teacher, Student, or specific staff role)
  name: string,
  email: string,
  classId?: string,
  exp?: number,
  iat?: number
};

export async function getSchoolServer() {
  try {
    const currentUser = await getAuthUserServer();
    if (!currentUser?.role) return null
    const token = await getSchoolToken(currentUser.role)
    if (!token) return null
    const decoded = jwtDecode<UserSchool>(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) return null;
    return decoded;
  } catch {
    return null;
  }
}