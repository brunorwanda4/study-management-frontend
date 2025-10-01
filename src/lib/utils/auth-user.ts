"use server";
import { expiresOneWeek } from "@/lib/const/time-expres";
import { TOKEN_KEY, UserId } from "@/lib/env";
import { AuthUserDto, AuthUserSchema } from "@/lib/schema/user/user.dto";
import apiRequest from "@/service/api-client";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface JwtClaims {
  user: AuthUserDto;
  exp: number;
  iat: number;
}

export interface AuthUserResult {
  user: AuthUserDto;
  token: string;
}

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

export async function authUser(): Promise<AuthUserResult | null> {
  const cooky = await cookies();
  const token = cooky.get(TOKEN_KEY)?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtClaims>(token);

    // ⏰ check if expired
    if (await isTokenExpired(decoded.exp)) {
      console.warn("⚠️ Token expired");
      return null;
    }

    const parsed = AuthUserSchema.safeParse(decoded.user);
    if (!parsed.success) {
      console.error("❌ Invalid user schema in token", parsed.error);
      return null;
    }

    return {
      user: parsed.data,
      token,
    };
  } catch (err) {
    console.error("❌ Failed to decode JWT:", err);
    return null;
  }
}

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

    if (!request.data) {
      return null;
    }

    return request.data.accessToken as string;
  } catch (err) {
    return null;
  }
}

export async function setAuthCookie(token: string, userId: string) {
  const saveCookies = await cookies();
  saveCookies.set(TOKEN_KEY, token, {
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
}
