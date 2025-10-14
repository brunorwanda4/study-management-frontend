"use server";

import { expiresOneWeek } from "@/lib/const/time-expres";
import { SCHOOL_TOKEN_KEY, TOKEN_KEY, UserId } from "@/lib/env";
import { SchoolJwtClaims } from "@/lib/schema/school/school-token-schema";
import {
  AuthUserDto,
  AuthUserSchema,
} from "@/lib/schema/user/auth-user-schema";
import apiRequest from "@/service/api-client";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

// 🧱 Types
interface UserJwtClaims {
  user: AuthUserDto;
  exp: number;
  iat: number;
}

export interface AuthContext {
  user: AuthUserDto;
  school: SchoolJwtClaims | null;
  token: string;
  schoolToken: string | null;
}

// 🕒 Utilities
export async function isTokenExpired(exp: number): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  return exp < now;
}

export async function willExpireSoon(
  exp: number,
  bufferSeconds = 60 * 5,
): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  return exp - now < bufferSeconds;
}

// 🧠 Main Auth
export async function authContext(): Promise<AuthContext | null> {
  const cooky = await cookies();
  const token = cooky.get(TOKEN_KEY)?.value;
  const schoolToken = cooky.get(SCHOOL_TOKEN_KEY)?.value;

  // ❌ No user token
  if (!token) return null;

  try {
    // --- Decode user token
    const decodedUser = jwtDecode<UserJwtClaims>(token);

    if (await isTokenExpired(decodedUser.exp)) {
      console.warn("⚠️ User token expired");
      return null;
    }

    const parsed = AuthUserSchema.safeParse(decodedUser.user);
    if (!parsed.success) {
      console.error("❌ Invalid user schema in token", parsed.error);
      return null;
    }

    // --- Decode optional school token
    let school: SchoolJwtClaims | null = null;
    if (schoolToken) {
      try {
        const decodedSchool = jwtDecode<SchoolJwtClaims>(schoolToken);
        if (!(await isTokenExpired(decodedSchool.exp))) {
          school = decodedSchool;
        } else {
          console.warn("⚠️ School token expired");
        }
      } catch (err) {
        console.error("❌ Failed to decode school JWT:", err);
      }
    }

    // ✅ Return combined result (user is guaranteed non-null)
    return {
      user: parsed.data,
      school,
      token,
      schoolToken: schoolToken ?? null,
    };
  } catch (err) {
    console.error("❌ Failed to decode JWT:", err);
    return null;
  }
}

// 🔄 Refresh user token
export async function refreshAuthToken(
  oldToken: string,
): Promise<string | null> {
  try {
    const request = await apiRequest<string, any>(
      "post",
      "/auth/refresh",
      undefined,
      { token: oldToken },
    );
    return request.data?.accessToken ?? null;
  } catch {
    return null;
  }
}

// 🍪 Save both tokens
export async function setAuthCookies(
  userToken: string,
  userId: string,
  schoolToken?: string,
) {
  const saveCookies = await cookies();

  // User
  saveCookies.set(TOKEN_KEY, userToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresOneWeek,
  });

  saveCookies.set(UserId, userId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresOneWeek,
  });

  // Optional school token
  if (schoolToken) {
    saveCookies.set(SCHOOL_TOKEN_KEY, schoolToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: expiresOneWeek,
    });
  }
}

// 🧹 Logout
export async function clearAuthCookies() {
  const cooky = await cookies();
  cooky.delete(TOKEN_KEY);
  cooky.delete(UserId);
  cooky.delete(SCHOOL_TOKEN_KEY);
}
