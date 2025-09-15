// utils/auth.ts
import { Locale } from '@/i18n';
import { authUser } from '@/lib/utils/auth-user';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import { AuthUserDto } from '../schema/user/user.dto';
import { getSchoolToken, removeUserToken } from './auth-cookies';

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


export const logout = async (lang: Locale) => {
  await removeUserToken();
  redirect(`/${lang}/auth/login`);
};
export interface UserSchool {
  sub: string;
  schoolId: string;
  schoolName?: string;
  schoolUsername?: string;
  schoolEmail?: string;
  schoolDescription?: string;
  schoolLogo?: string;
  role?: string;
  name: string;
  email: string;
  classId?: string;
  exp?: number;
  iat?: number;
}

export async function getSchoolServer() {
  try {
    const currentUser = (await authUser())?.user;
    if (!currentUser?.role) return null;
    const token = await getSchoolToken(currentUser.role);
    if (!token) return null;
    const decoded = jwtDecode<UserSchool>(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) return null;
    return decoded;
  } catch {
    return null;
  }
}
