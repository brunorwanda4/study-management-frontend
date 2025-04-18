// utils/auth.ts
import { Locale } from '@/i18n';
import {jwtDecode} from 'jwt-decode';
import { getUserToken, removeUserToken } from './auth-cookies';
import { UserRoleDto } from '../schema/user.dto';
import { redirect } from 'next/navigation';

export interface AuthUserDto {
  id: string;
  name: string;
  email: string;
  image?: string;
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

export function getAuthUser(): AuthUserDto | null {
  const token = localStorage.getItem('accessToken');
  return token ? getUserFromToken(token) : null;
}

export async function getAuthUserServer(): Promise<AuthUserDto | null> {
 const token =await getUserToken()
  return token.token ? getUserFromToken(token.token) : null;
}

export const logout = async (lang: Locale) => {
  await removeUserToken()
  redirect(`/${lang}/auth/login`)
}